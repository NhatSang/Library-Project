from pymongo import MongoClient 
from dotenv import load_dotenv
import os
from bson import ObjectId
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import pickle
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import StandardScaler
from bson import Binary
from sklearn.metrics.pairwise import cosine_similarity
# Tải các biến môi trường từ file .env
load_dotenv()
tfidf_vectorizer = TfidfVectorizer()
# Kết nối tới MongoDB Atlas
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.test  # Thay 'test' bằng tên cơ sở dữ liệu của bạn

book_collection = db['books']
history_collection = db['histories']
genre_collection = db['genres']
review_collection = db['reviews']

book_data = list(book_collection.find())
books_df = pd.DataFrame(book_data)

genres_df = pd.DataFrame(list(genre_collection.find({},{'_id':1})))

label_encoder_genre = LabelEncoder()
genres_df['Genre_encoded'] = label_encoder_genre.fit_transform(genres_df['_id'])
books_df['Genre_encoded'] = label_encoder_genre.transform(books_df['genre'])
tfidf_vectorizer.fit(books_df['summary'])
summary_tfidf = tfidf_vectorizer.fit_transform(books_df['summary'])
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

def get_books_for_user(userId):
    # Lấy lịch sử sách đã đọc của người dùng
    histories_df = pd.DataFrame(list(history_collection.find({'user': ObjectId(userId)})))
    user_book_df = pd.merge(histories_df, books_df, left_on='book', right_on='_id')

    # Danh sách các thể loại đã đọc
    read_genres = set(user_book_df['genre'].values)

    # Lọc các sách có thể loại chưa đọc
    unread_genre_books_df = books_df[~books_df['genre'].isin(read_genres)]

    # Lấy mỗi thể loại chưa đọc một sách, sử dụng group_keys=False để loại bỏ cột nhóm
    selected_books_unread = unread_genre_books_df.groupby('genre', group_keys=False).apply(lambda group: group.sample(1)).reset_index(drop=True)



    # Tạo cột 'read' cho sách chưa đọc với giá trị 0
    selected_books_unread['read'] = 0

    # Tạo cột 'read' cho sách đã đọc với giá trị 1
    read_books_df = user_book_df[['title', 'genre', 'summary', 'Genre_encoded']].copy()
    read_books_df['_id'] = user_book_df['book'].copy()
    read_books_df.loc[:, 'read'] = 1

    
    # Kết hợp sách đã đọc và sách từ thể loại chưa đọc
    combined_books = pd.concat([read_books_df, selected_books_unread], ignore_index=True)

    return combined_books
    # Giảm chiều dữ liệu TF-IDF
svd = TruncatedSVD(n_components=100)

scaler_collection = db["scaler"]
def save_scaler(userId, scaler):
    # Serialize the scaler using pickle
    scaler_binary = Binary(pickle.dumps(scaler))
    # Save the scaler in the database
    scaler_collection.update_one(
        {'userId': userId},
        {'$set': {'scaler': scaler_binary}},
        upsert=True  # Create a new document if one doesn't exist
    )

def load_scaler(userId):
    # Load the scaler from the database
    scaler_document = scaler_collection.find_one({'userId': userId})
    if scaler_document and 'scaler' in scaler_document:
        # Deserialize the scaler
        return pickle.loads(scaler_document['scaler'])
    return None

svd_collection = db["svd"]  # Create a collection for SVD models

def save_svd(userId, svd):
    # Serialize the SVD model using pickle
    svd_binary = Binary(pickle.dumps(svd))
    # Save the SVD model in the database
    svd_collection.update_one(
        {'userId': userId},
        {'$set': {'svd': svd_binary}},
        upsert=True  # Create a new document if one doesn't exist
    )

def load_svd(userId):
    # Load the SVD model from the database
    svd_document = svd_collection.find_one({'userId': userId})
    if svd_document and 'svd' in svd_document:
        # Deserialize the SVD model
        return pickle.loads(svd_document['svd'])
    return None

def update_model(userId):
    df = get_books_for_user(userId)

    # Mã hóa thể loại
    X_genres = df[['Genre_encoded']]
    
    # Vector hóa summary
    summary_tfidf = tfidf_vectorizer.transform(df['summary'])

    # Giảm chiều dữ liệu TF-IDF
    summary_svd = svd.fit_transform(summary_tfidf)  # Huấn luyện SVD và giảm chiều

    # Kết hợp các đặc trưng
    X = pd.concat([X_genres.reset_index(drop=True), pd.DataFrame(summary_svd)], axis=1)
    print(X)
    X.columns = X.columns.astype(str)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    y = df['read']
    # X.columns = X.columns.astype(str)
    model = load_model(userId)
    
    if model is None:
        model = RandomForestClassifier()
    model.fit(X_scaled, y)
    save_scaler(userId,scaler)
    save_model(userId, model)
    save_svd(userId, svd)
    
def recommend_books(userId):
    model = load_model(userId)
    svd = load_svd(userId)
    scaler = load_scaler(userId)
    if (model is None or svd is None or scaler is None):
        raise Exception("Model not found")
    histories_df = pd.DataFrame(list(history_collection.find({'user': ObjectId(userId)})))
    read_books = set(histories_df['book'].values)  # Giả định rằng 'book' chứa ID sách đã đọc

    # Lấy các sách chưa đọc
    unread_books_df = books_df[~books_df['_id'].isin(read_books)].copy()

    # Gán giá trị cho Genre_encoded mà không gây cảnh báo
    unread_books_df.loc[:, 'Genre_encoded'] = label_encoder_genre.transform(unread_books_df['genre'])

    # Vector hóa summary cho các sách chưa đọc
    summary_tfidf = tfidf_vectorizer.transform(unread_books_df['summary'])  # Chuyển đổi tóm tắt cho sách chưa đọc
    
    # Giảm chiều dữ liệu TF-IDF bằng SVD đã huấn luyện trước
    summary_svd = svd.transform(summary_tfidf)  # Sử dụng SVD đã huấn luyện

    # Kết hợp các đặc trưng
    X_new = pd.concat([unread_books_df[['Genre_encoded']].reset_index(drop=True), pd.DataFrame(summary_svd)], axis=1)

    X_new.columns = X_new.columns.astype(str)
    X_new_scaled = scaler.fit_transform(X_new)
    # Dự đoán cho các sách chưa đọc
    new_book_predictions = model.predict(X_new_scaled)
    
    # Tiến hành xử lý dự đoán
    unread_books_df['predicted_read'] = new_book_predictions
    recommended_books = unread_books_df[unread_books_df['predicted_read'] == 1]
    recommended_books = recommended_books.copy()
    # Loại bỏ các cột dư thừa  
    recommended_books[['_id','genre','majors']] = recommended_books[['_id','genre','majors']].astype(str)
    # Tạo dictionary để dễ truy vấn thông tin từ genres và majors
    genre_data = {str(genre['_id']): genre for genre in genre_collection.find()}
    major_data = {str(major['_id']): major for major in db['majors'].find()}
     # Lặp qua từng sách và chèn thông tin genre và major dưới dạng object
    recommended_books['genre_details'] = recommended_books['genre'].apply(lambda genre_id: genre_data.get(genre_id, {}))
    recommended_books['major_details'] = recommended_books['majors'].apply(lambda major_id: major_data.get(major_id, {}))
    # Chuyển đổi _id trong genre_details và major_details thành str
    recommended_books['genre_details'] = recommended_books['genre_details'].apply(
        lambda details: {**details, '_id': str(details.get('_id', ''))}
    )
    recommended_books['major_details'] = recommended_books['major_details'].apply(
        lambda details: {**details, '_id': str(details.get('_id', ''))}
    )
    recommended_books = recommended_books.drop(columns=['Genre_encoded', 'read_prediction','genre','majors'], errors='ignore')  
    recommended_books = recommended_books.to_dict(orient='records')
    return recommended_books


# update_model('66efb82b5f04eb9f8238ac9d')
# result = recommend_books('66efb82b5f04eb9f8238ac9d')
# print(result)

def get_recommendations(user_id, num_recommendations=10):
    users_df = pd.DataFrame(list(db['users'].find()))
    reviews_df = pd.DataFrame(list(review_collection.find()))
    # Tạo ma trận người dùng - sách
    user_book_matrix = reviews_df.pivot(index='user', columns='book', values='rating').fillna(0)
    print(user_book_matrix)
    # Lấy chuyên ngành của người dùng
    field_of_study = users_df.loc[users_df['_id'] == ObjectId(user_id), 'majors'].values[0]
    
    # Kiểm tra nếu người dùng không có chuyên ngành
    if pd.isna(field_of_study) or field_of_study == '':
        raise ValueError("User does not have a field of study.")

    # Lấy người dùng có cùng chuyên ngành
    similar_user_ids = users_df[
        (users_df['majors'] == field_of_study) &
        (users_df['_id'].isin(reviews_df['user']))
    ]['_id'].tolist()

    # Kiểm tra nếu không có người dùng tương tự
    if len(similar_user_ids) == 0:
        raise ValueError("No similar users found.")
    print(similar_user_ids)
    # Lấy ma trận đánh giá sách của người dùng tương tự
    similar_user_book_matrix = user_book_matrix.loc[similar_user_ids]

    # Lọc chỉ những sách có rating > 3 của người dùng tương tự
    similar_user_book_matrix_filtered = similar_user_book_matrix.where(similar_user_book_matrix > 3).dropna(how='all', axis=1)
    
    # Tính điểm tổng hợp cho mỗi sách dựa trên người dùng tương tự
    book_recommendation_scores = similar_user_book_matrix_filtered.sum(axis=0)

    # Lấy sách đã đọc bởi người dùng hiện tại
    books_read_by_user = reviews_df[reviews_df['user'] == ObjectId(user_id)]['book'].tolist()

    # Loại bỏ sách mà người dùng hiện tại đã đọc
    recommended_books = book_recommendation_scores[~book_recommendation_scores.index.isin(books_read_by_user)]

    # Sắp xếp và lấy số lượng sách gợi ý theo yêu cầu
    recommended_books = recommended_books.nlargest(num_recommendations)
    recommended_books = books_df[books_df['_id'].isin(recommended_books.index)]
    recommended_books = recommended_books.copy()
    # Loại bỏ các cột dư thừa  
    recommended_books[['_id','genre','majors']] = recommended_books[['_id','genre','majors']].astype(str)
    # Tạo dictionary để dễ truy vấn thông tin từ genres và majors
    genre_data = {str(genre['_id']): genre for genre in genre_collection.find()}
    major_data = {str(major['_id']): major for major in db['majors'].find()}
     # Lặp qua từng sách và chèn thông tin genre và major dưới dạng object
    recommended_books['genre_details'] = recommended_books['genre'].apply(lambda genre_id: genre_data.get(genre_id, {}))
    recommended_books['major_details'] = recommended_books['majors'].apply(lambda major_id: major_data.get(major_id, {}))
    # Chuyển đổi _id trong genre_details và major_details thành str
    recommended_books['genre_details'] = recommended_books['genre_details'].apply(
        lambda details: {**details, '_id': str(details.get('_id', ''))}
    )
    recommended_books['major_details'] = recommended_books['major_details'].apply(
        lambda details: {**details, '_id': str(details.get('_id', ''))}
    )
    recommended_books = recommended_books.drop(columns=['Genre_encoded', 'read_prediction','genre','majors'], errors='ignore')  
    recommended_books = recommended_books.to_dict(orient='records')
    # Trả về thông tin của sách được gợi ý
    return recommended_books
