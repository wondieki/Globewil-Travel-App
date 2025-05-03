from db import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

# ✅ Define the association table FIRST (before importing User)
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
    type = db.Column(db.String(100))
    country = db.Column(db.String(100))
    notes = db.Column(db.Text)
    referral = db.Column(db.String(100))
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))  # optional
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # optional

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # ✅ Many-to-many relationship to User using the same association table
    users = db.relationship("User", secondary="user_bookings", back_populates="bookings")

    def to_dict(self):
        return {
            "id": self.id,
            "fullName": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "date": self.date.isoformat() if self.date else None,
            "time": self.time,
            "type": self.type,
            "country": self.country,
            "notes": self.notes,
            "referral": self.referral,
            "service_id": self.service_id,
            "user_id": self.user_id,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "updatedAt": self.updated_at.isoformat() if self.updated_at else None,
        }
