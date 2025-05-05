from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.service import Service
from db import db

services_bp = Blueprint('services', __name__)

# ✅ GET: Public - List all services
@services_bp.route('/services', methods=['GET'])
def get_services():
    try:
        services = Service.query.order_by(Service.id.desc()).all()
        return jsonify([s.to_dict() for s in services]), 200
    except Exception as e:
        print("❌ Error fetching services:", str(e))
        return jsonify({"error": "Failed to fetch services"}), 500

# ✅ POST: Admin - Create a new service
@services_bp.route('/services', methods=['POST'])
@jwt_required()
def create_service():
    try:
        identity = get_jwt_identity()
        if not identity or identity.get("role") != "admin":
            return jsonify({"error": "Admin access required"}), 403

        data = request.get_json()
        name = data.get("name")
        description = data.get("description", "")

        if not name:
            return jsonify({"error": "Service name is required"}), 400

        service = Service(name=name, description=description)
        db.session.add(service)
        db.session.commit()

        return jsonify(service.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print("❌ Error creating service:", str(e))
        return jsonify({"error": "Service creation failed"}), 500

# ✅ PUT: Admin - Update service by ID
@services_bp.route('/services/<int:id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    try:
        identity = get_jwt_identity()
        if not identity or identity.get("role") != "admin":
            return jsonify({"error": "Admin access required"}), 403

        service = Service.query.get_or_404(id)
        data = request.get_json()

        service.name = data.get("name", service.name)
        service.description = data.get("description", service.description)

        db.session.commit()
        return jsonify(service.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        print("❌ Error updating service:", str(e))
        return jsonify({"error": "Failed to update service"}), 500

# ✅ DELETE: Admin - Delete service by ID
@services_bp.route('/services/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    try:
        identity = get_jwt_identity()
        if not identity or identity.get("role") != "admin":
            return jsonify({"error": "Admin access required"}), 403

        service = Service.query.get_or_404(id)
        db.session.delete(service)
        db.session.commit()

        return jsonify({"message": "Service deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        print("❌ Error deleting service:", str(e))
        return jsonify({"error": "Failed to delete service"}), 500
