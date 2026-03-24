"""
routes/candidate.py
-------------------
API routes accessible by candidates.
"""

from flask import Blueprint, request, jsonify, session
from models import db, Application, Job,CandidateProfile
candidate_bp = Blueprint(
    'candidate',
    __name__,
    url_prefix='/api/candidate'
)


def candidate_required():
    return 'user_id' in session and session.get('role') == 'candidate'


@candidate_bp.route('/jobs', methods=['GET'])
def list_jobs():
    """
    GET /api/candidate/jobs
    Fetch all open jobs with optional filters.
    """

    if not candidate_required():
        return jsonify({"error": "Unauthorized"}), 401

    department = request.args.get('department')
    location = request.args.get('location')

    query = Job.query.filter_by(status='open')

    if department:
        query = query.filter(Job.department.ilike(f"%{department}%"))

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    jobs = query.all()

    job_list = [
        {
            "id": job.id,
            "title": job.title,
            "department": job.department,
            "location": job.location,
            "vacancies": job.vacancies
        }
        for job in jobs
    ]

    return jsonify(job_list), 200


@candidate_bp.route('/dashboard', methods=['GET'])
def candidate_dashboard():
    """
    GET /api/candidate/dashboard
    Returns candidate basic info.
    """

    if not candidate_required():
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "user": {
            "id": session['user_id'],
            "name": session.get('name'),
            "email": session.get('email'),
            "role": session.get('role')
        }
    }), 200


@candidate_bp.route('/applications', methods=['GET'])
def candidate_applications():
    """
    GET /api/candidate/applications
    Fetch all applications for the logged-in candidate.
    """
    if not candidate_required():
        return jsonify({"error": "Unauthorized"}), 401

    # 1. Find the candidate's profile
    profile = CandidateProfile.query.filter_by(user_id=session['user_id']).first()

    # If they don't have a profile yet, they definitely have no applications
    if not profile:
        return jsonify([]), 200

    # 2. Fetch applications and join with the Job table to get the title/department
    applications = (
        db.session.query(Application, Job)
        .join(Job, Application.job_id == Job.id)
        .filter(Application.candidate_id == profile.id)
        .all()
    )

    # 3. Format the data exactly how your React component expects it
    result = []
    for app, job in applications:
        result.append({
            "application_id": app.id,
            "job_title": job.title,
            "department": job.department,
            "status": app.status,
            "applied_on": app.applied_at.strftime("%B %d, %Y") if app.applied_at else "Just now"
        })

    return jsonify(result), 200

@candidate_bp.route('/apply', methods=['POST'])
def apply_job():
    # ... existing authorization and job_id checks ...
    
    profile = CandidateProfile.query.filter_by(user_id=session['user_id']).first()
    if not profile:
        profile = CandidateProfile(user_id=session['user_id'])
        db.session.add(profile)
        db.session.commit()

    # --- NEW: Check for duplicate application ---
    existing_application = Application.query.filter_by(
        candidate_id=profile.id, 
        job_id=job_id
    ).first()

    if existing_application:
        return jsonify({"error": "You have already applied for this job."}), 400
    # ------------------------------------------

    application = Application(
        candidate_id=profile.id,
        job_id=job_id,
        status='applied'
    )
    db.session.add(application)
    db.session.commit()

    return jsonify({"message": "Application submitted"}), 201