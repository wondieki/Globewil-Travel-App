from flask import Blueprint, request, jsonify
from models.blog import Blog
from db import db
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required, get_jwt_identity

blogs_bp = Blueprint('blogs', __name__)

# Helper to format SQLAlchemy errors
def format_error(e):
    return str(e.__dict__.get('orig')) if hasattr(e, '__dict__') else str(e)

# ✅ GET all blogs (public)
@blogs_bp.route('/blogs', methods=['GET'])
def get_blogs():
    try:
        blogs = Blog.query.order_by(Blog.id.desc()).all()
        return jsonify([b.serialize() for b in blogs]), 200
    except Exception as e:
        print("Error fetching blogs:", str(e))
        return jsonify({'error': 'Failed to fetch blogs'}), 500

# ✅ GET one blog (public)
@blogs_bp.route('/blogs/<int:id>', methods=['GET'])
def get_blog(id):
    try:
        blog = Blog.query.get_or_404(id)
        return jsonify(blog.serialize()), 200
    except Exception as e:
        print("Error fetching blog:", str(e))
        return jsonify({'error': 'Failed to fetch blog'}), 500

# ✅ CREATE blog (admin only)
@blogs_bp.route('/blogs', methods=['POST'])
@jwt_required()
def create_blog():
    identity = get_jwt_identity()
    if identity.get('role') != 'admin':
        return jsonify({'error': 'Admin access required'}), 403

    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return jsonify({'error': 'Both title and content are required'}), 400

        blog = Blog(title=title, content=content)
        db.session.add(blog)
        db.session.commit()

        return jsonify(blog.serialize()), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': format_error(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Unexpected error occurred'}), 500

# ✅ UPDATE blog (admin only)
@blogs_bp.route('/blogs/<int:id>', methods=['PUT'])
@jwt_required()
def update_blog(id):
    identity = get_jwt_identity()
    if identity.get('role') != 'admin':
        return jsonify({'error': 'Admin access required'}), 403

    try:
        blog = Blog.query.get_or_404(id)
        data = request.get_json()
        blog.title = data.get('title', blog.title)
        blog.content = data.get('content', blog.content)

        db.session.commit()
        return jsonify(blog.serialize()), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': format_error(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Unexpected error occurred'}), 500

# ✅ DELETE blog (admin only)
@blogs_bp.route('/blogs/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_blog(id):
    identity = get_jwt_identity()
    if identity.get('role') != 'admin':
        return jsonify({'error': 'Admin access required'}), 403

    try:
        blog = Blog.query.get_or_404(id)
        db.session.delete(blog)
        db.session.commit()
        return jsonify({'message': 'Blog deleted successfully'}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': format_error(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Unexpected error occurred'}), 500
