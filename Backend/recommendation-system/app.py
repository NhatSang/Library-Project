from flask import Flask, request, jsonify
from flask_cors import CORS 
from ai.recommendation_model import update_model,recommend_books,get_recommendations
from bson import ObjectId

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return 'Welcome to the Flask API!'
@app.route('/update_model', methods=['POST'])
def update_or_create_model():
    data = request.json
    user_id = data.get('user_id')

    update_model(user_id)
    return jsonify({"message": "User model updated or created successfully!"}), 200

@app.route('/recommend_books/<user_id>', methods=['GET'])
def recommend_books_route(user_id):
    try:
        recommendations = recommend_books(user_id)
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 404
@app.route('/recommend_books_by_majors/<user_id>', methods=['GET'])
def recommend_books_by_majors_route(user_id):
    try:
        recommendations = get_recommendations(user_id)
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 404
if __name__ == '__main__':
    app.run(debug=True)
