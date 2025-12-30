from flask import Blueprint, request, jsonify
import secrets
from datetime import datetime, timedelta

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# In-memory session store (TEMPORARY)
# Replace with Redis / DB later
ACTIVE_SESSIONS = {}

# Allowed roles
ALLOWED_ROLES = {"HR", "MANAGER", "EMPLOYEE"}


@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Login endpoint (role-based, passwordless for now)

    Expected JSON:
    {
      "email": "user@company.com",
      "role": "HR"
    }
    """

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request"}), 400

    email = data.get("email")
    role = data.get("role")

    if not email or not role:
        return jsonify({"error": "Email and role are required"}), 400

    if role not in ALLOWED_ROLES:
        return jsonify({"error": "Invalid role"}), 403

    # Generate secure session token
    session_token = secrets.token_hex(24)

    # Session expiry (1 hour)
    expires_at = datetime.utcnow() + timedelta(hours=1)

    ACTIVE_SESSIONS[session_token] = {
        "email": email,
        "role": role,
        "expires_at": expires_at
    }

    return jsonify({
        "token": session_token,
        "user": {
            "email": email,
            "role": role
        },
        "expires_in": 3600
    }), 200
