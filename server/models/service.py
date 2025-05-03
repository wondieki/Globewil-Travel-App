# models/service.py

from db import db

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    # ✅ Relationship to bookings (with cascade delete)
    bookings = db.relationship(
        'Booking',
        backref='service',
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Service {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
