"""
routes/auth.py
--------------
Authentication APIs using Flask sessions.
"""

from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, User, CandidateProfile
auth_bp = Blueprint(
    'auth',
    __name__,
    url_prefix='/api/auth'
)


# ---------------------------
# Login
# ---------------------------
@auth_bp.route('/login', methods=['POST'])
def login():
    """
    POST /api/auth/login
    Authenticates user and creates session.
    """

    data = request.json

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create session
    session.clear()
    session['user_id'] = user.id
    session['role'] = user.role
    session['name'] = user.name
    session['email'] = user.email

    return jsonify({
        "message": "Login successful",
        "role": user.role
    }), 200


# ---------------------------
# Signup (Candidate only)
# ---------------------------


# ---------------------------
# Logout
# ---------------------------
@auth_bp.route('/logout', methods=['POST'])
def logout():
    """
    POST /api/auth/logout
    Clears session.
    """

    session.clear()
    return jsonify({"message": "Logged out"}), 200


# ---------------------------
# Get Current User (Very Important)
# ---------------------------
@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    """
    GET /api/auth/me
    Returns logged-in user info.
    """

    if 'user_id' not in session:
        return jsonify({"authenticated": False}), 401

    return jsonify({
        "authenticated": True,
        "user": {
            "id": session['user_id'],
            "role": session['role'],
            "name": session['name'],
            "email": session['email']
        }
    }), 200

@auth_bp.route('/signup', methods=['POST'])
def signup():
    """
    POST /api/auth/signup
    Creates a new candidate user and their profile.
    """
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # 1. Check if email is already taken
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    # 2. Hash the password for cybersecurity
    hashed_password = generate_password_hash(password)

    # 3. Create the User (Defaulting to 'candidate' role)
    new_user = User(
        name=name,
        email=email,
        password_hash=hashed_password,
        role='candidate'
    )
    db.session.add(new_user)
    db.session.commit() # Commit here so PostgreSQL assigns an ID to new_user

    # 4. INSTANTLY create their CandidateProfile to prevent HR bugs later!
    new_profile = CandidateProfile(user_id=new_user.id)
    db.session.add(new_profile)
    db.session.commit()

    return jsonify({"message": "Account created successfully!"}), 201