from pymongo import MongoClient 
from dotenv import load_dotenv
import os
from bson import ObjectId
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import pickle
# Tải các biến môi trường từ file .env
load_dotenv()

# Kết nối tới MongoDB Atlas
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.test  # Thay 'test' bằng tên cơ sở dữ liệu của bạn

book_collection = db['books']
history_collection = db['histories']
genre_collection = db['genres']

book_data = list(book_collection.find())
books_df = pd.DataFrame(book_data)

genres_df = pd.DataFrame(list(genre_collection.find({},{'_id':1})))

label_encoder_genre = LabelEncoder()
genres_df['Genre_encoded'] = label_encoder_genre.fit_transform(genres_df['_id'])
books_df['Genre_encoded'] = label_encoder_genre.transform(books_df['genre'])
model_collection = db['models']
# Lưu mô hình vào MongoDB
def save_model(user_id, model):
    model_bytes = pickle.dumps(model)
    model_collection.update_one(
        {"user_id":ObjectId(user_id)},
        {"$set": {"model": model_bytes}},
        upsert=True
    )

# Tải mô hình từ MongoDB
def load_model(user_id):
    model_data = model_collection.find_one({"user_id": ObjectId(user_id)})
    if model_data:
        return pickle.loads(model_data['model'])
    return None


def update_model(userId):
    histories_df = pd.DataFrame(list(history_collection.find({'user': ObjectId(userId)})))
    user_book_df = pd.merge(histories_df,books_df,left_on='book',right_on='_id')
    read_genres = set(user_book_df['genre'].values)
    genres_df['read'] = genres_df['_id'].apply(lambda genre: 1 if genre in read_genres else 0) 
    X = genres_df[['Genre_encoded']]
    y = genres_df['read']
    model = load_model(userId)
    if(model is None):
        model = RandomForestClassifier()
    model.fit(X, y)
    save_model(userId,model)

def recommend_books(userId):
    # Tải mô hình đã huấn luyện cho userId
    model = load_model(userId)  # Giả định bạn đã định nghĩa hàm load_model

    # Mã hóa thể loại của các sách trong books_df
    books_df['Genre_encoded'] = label_encoder_genre.transform(books_df['genre'])

    # Dự đoán các sách mà người dùng có khả năng đọc
    new_book_predictions = model.predict(books_df[['Genre_encoded']])  # Cung cấp DataFrame 2D
    books_df['read_prediction'] = new_book_predictions

    # Lọc ra những sách mà người dùng có khả năng đọc
    recommended_books = books_df[books_df['read_prediction'] == 1]
    recommended_books = recommended_books.copy()
    # Loại bỏ các cột dư thừa
    recommended_books = recommended_books.drop(columns=['Genre_encoded', 'read_prediction'], errors='ignore')    
    recommended_books[['_id','genre','majors']] = recommended_books[['_id','genre','majors']].astype(str)
    recommended_books = recommended_books.to_dict(orient='records')
    return recommended_books
# update_model('66efb7aa5f04eb9f8238ac90')
# books = recommend_book('66efb7aa5f04eb9f8238ac90')
# print(books)