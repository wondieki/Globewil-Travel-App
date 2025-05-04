from db import db
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

class Message(db.Model, SerializerMixin):
    __tablename__ = "messages"

    serialize_only = (
        "id",
        "name",
        "email",
        "phone_number",
        "subject",
        "content",
        "created_at"
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20))
    subject = db.Column(db.String(150))
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
