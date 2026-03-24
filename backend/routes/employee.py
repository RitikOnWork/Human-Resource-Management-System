"""
routes/employee.py
-----------------
API routes accessible by employees.
"""

from flask import Blueprint, request, jsonify, session
from models import db, Employee, User, Attendance, LeaveBalance, LeaveRequest
from datetime import date, timedelta

employee_bp = Blueprint(
    'employee',
    __name__,
    url_prefix='/api/employee'
)


def employee_required():
    # Accept case-insensitive 'employee' in session role
    return 'user_id' in session and session.get('role', '').lower() == 'employee'


@employee_bp.route('/dashboard', methods=['GET'])
def employee_dashboard():
    """
    GET /api/employee/dashboard
    Returns basic employee dashboard info.
    """

    if not employee_required():
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(session['user_id'])
    emp = Employee.query.filter_by(user_id=session['user_id']).first()

    result = {
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }

    if emp:
        result["employee"] = {
            "employee_code": emp.employee_code,
            "department": emp.department,
            "position": emp.position,
            "status": emp.status,
            "email": emp.email,
            "phone": emp.phone
        }
    else:
        result["employee"] = None

    return jsonify(result), 200


@employee_bp.route('/attendance', methods=['GET'])
def get_attendance():
    """
    GET /api/employee/attendance
    Returns recent attendance records for the logged-in employee (last 30 days).
    """

    if not employee_required():
        return jsonify({"error": "Unauthorized"}), 401

    emp = Employee.query.filter_by(user_id=session['user_id']).first()
    if not emp:
        return jsonify({"error": "Employee record not found"}), 404

    thirty_days_ago = date.today() - timedelta(days=30)
    records = Attendance.query.filter(
        Attendance.employee_id == emp.id,
        Attendance.date >= thirty_days_ago
    ).order_by(Attendance.date.desc()).all()

    out = []
    for r in records:
        out.append({
            "date": r.date.strftime('%Y-%m-%d'),
            "status": r.status,
            "checkIn": r.check_in_time.strftime('%I:%M %p') if r.check_in_time else None,
            "checkOut": r.check_out_time.strftime('%I:%M %p') if r.check_out_time else None
        })

    return jsonify({"attendance": out}), 200


@employee_bp.route('/leave-requests', methods=['GET'])
def my_leave_requests():
    """
    GET /api/employee/leave-requests
    Returns leave requests of the logged-in employee.
    """

    if not employee_required():
        return jsonify({"error": "Unauthorized"}), 401

    emp = Employee.query.filter_by(user_id=session['user_id']).first()
    if not emp:
        return jsonify({"error": "Employee record not found"}), 404

    reqs = LeaveRequest.query.filter_by(employee_id=emp.id).order_by(LeaveRequest.created_at.desc()).all()
    out = []
    for r in reqs:
        out.append({
            "id": r.id,
            "startDate": r.start_date.strftime('%Y-%m-%d') if r.start_date else None,
            "endDate": r.end_date.strftime('%Y-%m-%d') if r.end_date else None,
            "totalDays": float(r.total_days) if r.total_days is not None else None,
            "status": r.status,
            "reason": r.reason
        })

    return jsonify({"leaveRequests": out}), 200
