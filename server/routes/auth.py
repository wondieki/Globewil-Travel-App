from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies
from models.user import User
from db import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')  # Default to 'user'

    if not all([name, email, password]):
        return jsonify({'error': 'Name, email, and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 409

    user = User(name=name, email=email, role=role)
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity={"id": user.id, "role": user.role})
        response = jsonify(user.to_dict())
        set_access_cookies(response, access_token)  # Set JWT in cookies

        return response, 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity={"id": user.id, "role": user.role})
    response = jsonify({"message": "Login successful", "user": user.to_dict()})
    set_access_cookies(response, access_token)  # Set JWT in cookies
    return response, 200
