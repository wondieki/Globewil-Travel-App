from db import db
from models.booking_service import booking_service  # 🔁 Import the association table

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    # ✅ Many-to-many relationship with bookings
    bookings = db.relationship(
        'Booking',
        secondary=booking_service,
        back_populates='services',
        lazy='subquery'
    )

    def __repr__(self):
        return f"<Service {self.name}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }
