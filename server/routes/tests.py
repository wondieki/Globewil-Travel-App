from flask import Blueprint, jsonify, request

test_bp = Blueprint("test", __name__)

from flask import Blueprint, jsonify, request

test_bp = Blueprint("test", __name__)

@test_bp.route("/ping", methods=["GET"])
def ping():
    response = jsonify({"message": "pong"})
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "")
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["X-Debug-Server"] = "Flask Manual CORS"
    return response

