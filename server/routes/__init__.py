# server/routes/__init__.py

# Import blueprints from route modules
from .auth import auth_bp
from .user import user_bp
from .bookings import bookings_bp
from .services import services_bp
from .blogs import blogs_bp
from .messages import messages_bp
from .tests import test_bp



# List of all blueprints to register
all_blueprints = [
    auth_bp,
    user_bp,
    bookings_bp,
    services_bp,
    blogs_bp,
    messages_bp,
    test_bp
]
