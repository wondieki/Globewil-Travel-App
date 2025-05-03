from flask import Blueprint, request, jsonify
from models.message import Message
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

messages_bp = Blueprint("messages", __name__)

# ✅ Anyone can post a message
@messages_bp.route("/messages", methods=["POST"])
def create_message():
    data = request.get_json()
    try:
        message = Message(
            name=data["name"],
            email=data["email"],
            phone_number=data.get("phone_number"),
            subject=data.get("subject", "No Subject"),
            content=data["content"]
        )
        db.session.add(message)
        db.session.commit()
        return jsonify(message.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# ✅ Admin-only: view all messages
@messages_bp.route("/messages", methods=["GET"])
@jwt_required()
def get_messages():
    identity = get_jwt_identity()
    if identity.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    messages = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([msg.to_dict() for msg in messages]), 200
