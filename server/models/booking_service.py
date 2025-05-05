from db import db

# Association table between Bookings and Services
booking_service = db.Table(
    'booking_service',
    db.Column('booking_id', db.Integer, db.ForeignKey('bookings.id'), primary_key=True),
    db.Column('service_id', db.Integer, db.ForeignKey('services.id'), primary_key=True)
)
