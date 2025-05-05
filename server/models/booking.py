from db import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from models.booking_service import booking_service  # 🔁 Import association table

# ✅ Many-to-many between Users and Bookings
user_bookings = db.Table(
    'user_bookings',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('booking_id', db.Integer, db.ForeignKey('bookings.id'), primary_key=True)
)

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(50))
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(50))
    booking_type = db.Column(db.String(100))
    country = db.Column(db.String(100))
    notes = db.Column(db.Text)
    referral = db.Column(db.String(100))
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))  # optional
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # optional

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # ✅ Many-to-many to User
    users = db.relationship("User", secondary="user_bookings", back_populates="bookings")

    # ✅ Many-to-many to Service
    services = db.relationship(
        "Service",
        secondary=booking_service,
        back_populates="bookings"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "date": self.date.isoformat() if self.date else None,
            "time": self.time,
            "booking_type": self.booking_type,
            "country": self.country,
            "notes": self.notes,
            "referral": self.referral,
            "service_id": self.service_id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "services": [s.to_dict() for s in self.services]  # ✅ include related services
        }
