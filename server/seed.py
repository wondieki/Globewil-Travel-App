from faker import Faker
from random import choice
from datetime import datetime
from app import app
from db import db
from models import User, Service, Booking, Blog, Message

fake = Faker()

def seed_users():
    print("👤 Seeding Users...")
    users = []
    for _ in range(10):
        user = User(
            name=fake.name(),
            email=fake.unique.email(),
            role=choice(["user", "admin"])
        )
        user.set_password("password123")
        users.append(user)
    db.session.add_all(users)
    db.session.commit()
    return users

def seed_services():
    print("🛎️ Seeding Services...")
    services = []
    service_names = [
        "Visa Support", "Study Abroad Advice", "Interview Coaching",
        "Travel Planning", "Accommodation Assistance", "Flight Booking",
        "Travel Insurance", "University Application", "Language Prep", "Other"
    ]
    for name in service_names:
        service = Service(
            name=name,
            description=fake.paragraph(nb_sentences=3)
        )
        services.append(service)
    db.session.add_all(services)
    db.session.commit()
    return services

def seed_bookings(users, services):
    print("📅 Seeding Bookings...")
    bookings = []
    for _ in range(10):
        user = choice(users)
        service = choice(services)
        booking = Booking(
            full_name=user.name,
            email=user.email,
            phone=fake.phone_number(),
            date=fake.future_date(end_date="+30d"),
            time=fake.time(),
            type=service.name,
            country=choice(["USA", "UK", "Canada", "Germany", "Netherlands", "France"]),
            notes=fake.sentence(),
            referral=choice(["Google", "Instagram", "WhatsApp", "Friend/Referral", "Other"]),
            user_id=user.id,
            service_id=service.id
        )
        bookings.append(booking)
    db.session.add_all(bookings)
    db.session.commit()

def seed_blogs():
    print("📝 Seeding Blogs...")
    blogs = []
    for _ in range(10):
        blog = Blog(
            title=fake.sentence(nb_words=6),
            content=fake.paragraph(nb_sentences=10)
        )
        blogs.append(blog)
    db.session.add_all(blogs)
    db.session.commit()

def seed_messages():
    print("✉️ Seeding Messages...")
    messages = []
    for _ in range(10):
        message = Message(
            name=fake.name(),
            email=fake.email(),
            subject=fake.sentence(),
            content=fake.paragraph()
        )
        messages.append(message)
    db.session.add_all(messages)
    db.session.commit()

# Seed runner
if __name__ == "__main__":
    with app.app_context():
        users = seed_users()
        services = seed_services()
        seed_bookings(users, services)
        seed_blogs()
        seed_messages()
        print("✅ Seeding complete!")
