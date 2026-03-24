"""
routes/admin.py
---------------
API routes for recruitment admins.
"""

from flask import Blueprint, request, jsonify, session
from models import db, Job, Application, User, CandidateProfile

admin_bp = Blueprint(
    'admin',
    __name__,
    url_prefix='/api/admin'
)


# ---------------------------
# Helper: Admin Auth Check
# ---------------------------       
def admin_required():
    if 'user_id' not in session or session.get('role') != 'admin':
        return False
    return True


# ---------------------------
# Admin Dashboard Data
# ---------------------------
@admin_bp.route('/dashboard', methods=['GET'])
def admin_dashboard():
    """
    GET /api/admin/dashboard
    Returns all jobs for admin dashboard.
    """

    if not admin_required():
        return jsonify({"error": "Unauthorized"}), 401

    jobs = Job.query.all()

    job_list = [
        {
            "id": job.id,
            "title": job.title,
            "department": job.department,
            "location": job.location,
            "status": job.status,
            "vacancies": job.vacancies
        }
        for job in jobs
    ]

    return jsonify(job_list), 200


# ---------------------------
# View Applications for Job
# ---------------------------

# ---------------------------
# Create Job
# ---------------------------
@admin_bp.route('/create-job', methods=['POST'])
def create_job():
    """
    POST /api/admin/create-job
    """

    if not admin_required():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    job = Job(
        title=data['title'],
        department=data['department'],
        location=data.get('location'),
        vacancies=data.get('vacancies', 1),
        eligibility_rules=data.get('eligibility_rules'),
        status='open',
        created_by=session['user_id']
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job created successfully"}), 201


# ---------------------------
# Shortlist Candidate
# ---------------------------
@admin_bp.route('/application/<int:application_id>/shortlist', methods=['POST'])
def shortlist_candidate(application_id):
    """
    POST /api/admin/application/<application_id>/shortlist
    """

    if not admin_required():
        return jsonify({"error": "Unauthorized"}), 401

    application = Application.query.get(application_id)

    if not application:
        return jsonify({"error": "Application not found"}), 404

    application.status = 'shortlisted'
    db.session.commit()

    return jsonify({"message": "Candidate shortlisted"}), 200


# ---------------------------
# View Applications for Job
# ---------------------------
@admin_bp.route('/job/<int:job_id>/applications', methods=['GET'])
def view_applications(job_id):
    """
    GET /api/admin/job/<job_id>/applications
    """

    if not admin_required():
        return jsonify({"error": "Unauthorized"}), 401

    # FIXED: Correctly join Application -> CandidateProfile -> User
    applications = (
        db.session.query(Application, User)
        .join(CandidateProfile, Application.candidate_id == CandidateProfile.id)
        .join(User, CandidateProfile.user_id == User.id)
        .filter(Application.job_id == job_id)
        .all()
    )

    result = []
    for application, user in applications:
        result.append({
            "application_id": application.id,
            "candidate_id": user.id,
            "candidate_name": user.name,
            "email": user.email,
            "status": application.status
        })

    return jsonify(result), 200