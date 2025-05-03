# routes/services.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.service import Service
from db import db

services_bp = Blueprint('services', __name__)

@services_bp.route('/services', methods=['GET'])
def get_services():
    services = Service.query.order_by(Service.id.desc()).all()
    return jsonify([s.serialize() for s in services]), 200

@services_bp.route('/services', methods=['POST'])
@jwt_required()
def create_service():
    identity = get_jwt_identity()
    print("🔐 CREATE identity:", identity)
    if not identity or identity.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    data = request.get_json()
    service = Service(name=data.get("name"), description=data.get("description", ""))
    db.session.add(service)
    db.session.commit()
    return jsonify(service.serialize()), 201

@services_bp.route('/services/<int:id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    identity = get_jwt_identity()
    print("🔐 UPDATE identity:", identity)
    if not identity or identity.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    service = Service.query.get_or_404(id)
    data = request.get_json()
    service.name = data.get("name")
    service.description = data.get("description", "")
    db.session.commit()
    return jsonify(service.serialize()), 200

@services_bp.route('/services/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    identity = get_jwt_identity()
    print("🔐 DELETE identity:", identity)
    if not identity or identity.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    service = Service.query.get_or_404(id)
    db.session.delete(service)
    db.session.commit()
    return jsonify({"message": "Service deleted"}), 200
