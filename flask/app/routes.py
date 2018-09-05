from flask import request, jsonify
from app import app
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

from app.models import Users


@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user = Users.get_or_none(Users.username == username, Users.password == password)

    if user is None:
        return jsonify({'success': False, 'message': 'Bad username or password'}), 401

    access_token = create_access_token(identity=username)
    return jsonify({'success': True, 'token': access_token}), 200


@app.route('/verify-token', methods=['POST'])
@jwt_required
def verify_token():
    return jsonify({'success': True}), 200


@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
