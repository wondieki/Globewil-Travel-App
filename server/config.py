# server/config.py

import os
from dotenv import load_dotenv

# Load environment variables from a .env file (if present)
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, 'instance')

class Config:
    # SQLite database located inside /instance folder
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(INSTANCE_DIR, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Secret Key for authentication (fallback to env variable if available)
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-default-secret-key")
