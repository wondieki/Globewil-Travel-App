from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from models.booking import Booking
from models.user import User
from models.service import Service
from db import db
from datetime import datetime

bookings_bp = Blueprint("bookings", __name__)

# Admin or user gets bookings
@bookings_bp.route('/bookings', methods=['GET'])
@jwt_required()
def get_bookings():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    role = identity.get("role")

    if role == "admin":
        bookings = Booking.query.order_by(Booking.created_at.desc()).all()
    else:
        bookings = Booking.query\
            .join(Booking.users)\
            .filter(User.id == user_id)\
            .order_by(Booking.created_at.desc()).all()

    return jsonify([b.to_dict() for b in bookings]), 200

# Anyone can post a booking (JWT optional)
@bookings_bp.route("/bookings", methods=["POST"])
def create_booking():
    print("🔥 [POST] /bookings endpoint hit")

    try:
        data = request.get_json()
        print("📥 Received data:", data)

        booking_date = datetime.strptime(data["date"], "%Y-%m-%d").date()
        new_booking = Booking(
            full_name=data["fullName"],
            email=data["email"],
            phone=data.get("phone"),
            date=booking_date,
            time=data["time"],
            type=data["type"],
            country=data["country"],
            notes=data.get("notes"),
            referral=data.get("referral")
        )

        # 🔐 Attach user (if authenticated)
        try:
            verify_jwt_in_request(optional=True)
            identity = get_jwt_identity()
            if identity:
                user = User.query.get(identity.get("id"))
                if user:
                    new_booking.users.append(user)
                    print("🔐 Attached user:", user.id)
        except Exception:
            print("ℹ️ No JWT — anonymous booking.")

        # 🧩 Attach services
        service_ids = data.get("service_ids", [])
        if service_ids:
            services = Service.query.filter(Service.id.in_(service_ids)).all()
            new_booking.services.extend(services)
            print("🔗 Linked services:", [s.id for s in services])

        db.session.add(new_booking)
        db.session.commit()

        print("✅ Booking saved successfully")
        return jsonify(new_booking.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print("❌ Booking error:", str(e))
        return jsonify({"error": "Something went wrong. Please try again."}), 400
