from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from models.booking import Booking
from models.user import User
from models.service import Service
from db import db
from datetime import datetime

bookings_bp = Blueprint("bookings", __name__)

# ✅ Admin can view all bookings; regular users only see their own
@bookings_bp.route('/bookings', methods=['GET'])
@jwt_required()
def get_bookings():
    identity = get_jwt_identity()
    user_id = identity.get("id")
    role = identity.get("role")

    if role == "admin":
        bookings = Booking.query.order_by(Booking.created_at.desc()).all()
    else:
        bookings = Booking.query \
            .join(Booking.users) \
            .filter(User.id == user_id) \
            .order_by(Booking.created_at.desc()) \
            .all()

    return jsonify([b.to_dict() for b in bookings]), 200

# ✅ Create a new booking (open to authenticated and guest users)
@bookings_bp.route("/bookings", methods=["POST"])
def create_booking():
    print("🔥 [POST] /bookings endpoint triggered")

    try:
        data = request.get_json()
        print("📥 Received booking data:", data)

        # 🔍 Validate required fields
        full_name = data.get("full_name")
        email = data.get("email")
        date_str = data.get("date")
        time = data.get("time")
        booking_type = data.get("booking_type")  # ✅ Use 'booking_type' to match frontend
        country = data.get("country")

        missing_fields = []
        if not full_name: missing_fields.append("full_name")
        if not email: missing_fields.append("email")
        if not date_str: missing_fields.append("date")
        if not time: missing_fields.append("time")
        if not booking_type: missing_fields.append("booking_type")
        if not country: missing_fields.append("country")

        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # 🗓️ Convert date string to date object
        try:
            booking_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

        # 📦 Create Booking instance
        new_booking = Booking(
            full_name=full_name,
            email=email,
            phone=data.get("phone"),
            date=booking_date,
            time=time,
            booking_type=booking_type,
            country=country,
            notes=data.get("notes"),
            referral=data.get("referral")
        )

        # 🔐 Optionally attach authenticated user
        try:
            verify_jwt_in_request(optional=True)
            identity = get_jwt_identity()
            if identity:
                user = User.query.get(identity.get("id"))
                if user:
                    new_booking.users.append(user)
                    print("🔐 Booking linked to user ID:", user.id)
        except Exception:
            print("ℹ️ Booking made without authentication")

        # 🔗 Attach selected services (many-to-many)
        service_ids = data.get("service_ids", [])
        if service_ids:
            services = Service.query.filter(Service.id.in_(service_ids)).all()
            new_booking.services.extend(services)
            print("🔗 Linked services:", [s.id for s in services])

        db.session.add(new_booking)
        db.session.commit()

        print("✅ Booking successfully saved")
        return jsonify(new_booking.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print("❌ Error while saving booking:", str(e))
        return jsonify({"error": "Something went wrong. Please try again."}), 400

    # except Exception as e:
    #     db.session.rollback()
    #     print("❌ Error while saving booking:", str(e))
    #     return jsonify({"error": "Something went wrong. Please try again."}), 400