"""
routes/hr.py
------------
API routes for HR admins.
"""

from flask import Blueprint, request, jsonify, session
from datetime import date, datetime, timedelta
from models import db, Employee, CandidateProfile, Transfer, User, Department, Attendance, LeaveBalance, LeaveRequest, LeaveType

hr_bp = Blueprint(
    'hr',
    __name__,
    url_prefix='/api/hr'
)

# --- SECURITY FIX: Allow BOTH 'hr' and 'admin' roles ---
def hr_required():
    if 'user_id' not in session:
        return False
    role = session.get('role', '').lower()
    return role in ['hr', 'admin']


@hr_bp.route('/dashboard', methods=['GET'])
def hr_dashboard():
    """
    GET /api/hr/dashboard
    Returns basic HR dashboard info.
    """
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "user": {
            "id": session['user_id'],
            "name": session.get('name'),
            "email": session.get('email'),
            "role": session.get('role')
        }
    }), 200


@hr_bp.route('/user', methods=['GET'])
def get_hr_user():
    """
    GET /api/hr/user
    Returns a user with role = 'hr' (first match).
    """
    user = User.query.filter_by(role='hr').first()
    if not user:
        return jsonify({"error": "No HR user found"}), 404
    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200


@hr_bp.route('/create-employee', methods=['POST'])
def create_employee():
    """
    POST /api/hr/create-employee
    Converts selected candidate into employee.
    """
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    candidate = CandidateProfile.query.get(data.get('candidate_id'))
    if not candidate:
        return jsonify({"error": "Candidate not found in database. Ensure this ID exists!"}), 404

    # --- DATABASE FIX 1: Split candidate name into First & Last ---
    user = User.query.get(candidate.user_id)
    name_parts = user.name.split(" ", 1)
    first_name = name_parts[0]
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    # --- DATABASE FIX 2: Find or create the Department to get a valid department_id ---
    dept_name = data.get('department', 'Unassigned')
    department = Department.query.filter_by(name=dept_name).first()
    if not department:
        department = Department(name=dept_name)
        db.session.add(department)
        db.session.commit() # Save it so we get an ID number

    # Safely parse the joining date
    try:
        doj = datetime.strptime(data.get('date_of_joining'), '%Y-%m-%d').date()
    except (ValueError, TypeError):
        doj = date.today()

    # --- DATABASE FIX 3: Map to the strict models.py schema ---
    employee = Employee(
        user_id=candidate.user_id,
        employee_code=data.get('employee_code'),
        first_name=first_name,
        last_name=last_name,
        email=user.email,                 # <--- ADD THIS LINE
        phone=getattr(user, 'phone', ''), # <--- ADD THIS LINE (just in case)
        department_id=department.id,      # Required strictly by PostgreSQL
        department=department.name,       # Required string
        position=data.get('designation'), # Maps designation to position
        joining_date=doj,
        status='active'
    )

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee created successfully",
        "employee_id": employee.id
    }), 201


@hr_bp.route('/transfer', methods=['POST'])
def transfer_employee():
    """
    POST /api/hr/transfer
    Handles employee transfer.
    """
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    employee = Employee.query.get(data.get('employee_id'))
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    transfer = Transfer(
        employee_id=employee.id,
        from_department=employee.department,
        from_location=data.get('from_location'),
        to_department=data['to_department'],
        to_location=data.get('to_location'),
        effective_date=datetime.strptime(data['effective_date'], '%Y-%m-%d').date(),
        order_number=data.get('order_number'),
        reason=data.get('reason')
    )

    db.session.add(transfer)
    employee.department = data['to_department']
    db.session.commit()

    return jsonify({
        "message": "Employee transferred successfully",
        "employee_id": employee.id
    }), 200


@hr_bp.route('/employees', methods=['GET'])
def list_employees():
    """GET /api/hr/employees"""
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    employees = Employee.query.all()
    out = []
    for e in employees:
        name = f"{e.first_name} {e.last_name}" if e.first_name or e.last_name else None
        dept = e.department or (e.department_obj.name if e.department_obj else None)
        joined = e.joining_date.strftime('%b %d, %Y') if e.joining_date else None
        out.append({
            "id": e.employee_code,
            "name": name,
            "department": dept,
            "status": e.status,
            "position": e.position,
            "email": e.email,
            "phone": e.phone,
            "joinedDate": joined
        })

    return jsonify({"employees": out}), 200


@hr_bp.route('/departments', methods=['GET'])
def list_departments():
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    depts = Department.query.all()
    out = []
    for d in depts:
        emp_count = len(d.employees) if hasattr(d, 'employees') else 0
        out.append({
            "name": d.name,
            "employees": emp_count,
            "color": d.color or '#888'
        })

    return jsonify({"departments": out}), 200


@hr_bp.route('/attendance', methods=['GET'])
def get_attendance():
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    today = date.today()
    records = Attendance.query.filter_by(date=today).all()
    out = []
    one_year_ago = today - timedelta(days=365)
    for r in records:
        emp = r.employee
        if not emp:
            continue
        
        lb_sum = db.session.query(db.func.coalesce(db.func.sum(LeaveBalance.used + LeaveBalance.pending), 0)).filter(
            LeaveBalance.employee_id == emp.id,
            LeaveBalance.year == today.year
        ).scalar() or 0
        
        late_count = Attendance.query.filter(
            Attendance.employee_id == emp.id,
            Attendance.date >= one_year_ago,
            Attendance.is_late == True
        ).count()
        early_count = Attendance.query.filter(
            Attendance.employee_id == emp.id,
            Attendance.date >= one_year_ago,
            Attendance.is_early_leave == True
        ).count()

        check_in = r.check_in_time.strftime('%I:%M %p') if r.check_in_time else '-'
        shift_name = r.shift.name if getattr(r, 'shift', None) else '-'

        out.append({
            "id": emp.employee_code,
            "name": f"{emp.first_name} {emp.last_name}",
            "department": emp.department or (emp.department_obj.name if emp.department_obj else None),
            "shift": shift_name,
            "status": r.status,
            "checkIn": check_in,
            "totalLeaves": float(lb_sum) if lb_sum is not None else 0,
            "lateArrivals": late_count,
            "earlyLeaves": early_count
        })

    return jsonify({"attendance": out}), 200


@hr_bp.route('/leave-requests', methods=['GET'])
def list_leave_requests():
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    reqs = LeaveRequest.query.order_by(LeaveRequest.created_at.desc()).all()
    out = []
    for r in reqs:
        emp = Employee.query.get(r.employee_id)
        lt = LeaveType.query.get(r.leave_type_id)
    # Inside your list_leave_requests function in hr.py:
        out.append({
            "id": r.id,
            "employeeName": f"{emp.first_name} {emp.last_name}" if emp else None,
            "leaveType": lt.name if lt else None,
            "startDate": r.start_date.strftime('%b %d, %Y') if r.start_date else None,
            "endDate": r.end_date.strftime('%b %d, %Y') if r.end_date else None,
            "days": float(r.total_days) if r.total_days is not None else None, # <--- CHANGED FROM "totalDays" TO "days"
            "reason": r.reason,
            "status": r.status,
            "contactDuringLeave": r.contact_during_leave
        })
    return jsonify({"leaveRequests": out}), 200


@hr_bp.route('/stats', methods=['GET'])
def hr_stats():
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    total_employees = Employee.query.count()
    today = date.today()
    present_today = Attendance.query.filter_by(date=today, status='present').count()

    on_leave = LeaveRequest.query.filter(
        LeaveRequest.status == 'approved',
        LeaveRequest.start_date <= today,
        LeaveRequest.end_date >= today
    ).count()

    dept_count = Department.query.count()

    return jsonify({
        "totalEmployees": total_employees,
        "presentToday": present_today,
        "onLeave": on_leave,
        "departments": dept_count
    }), 200             

# ---------------------------
# Approve Leave Request
# ---------------------------
@hr_bp.route('/leave-requests/<int:request_id>/approve', methods=['POST'])
def approve_leave(request_id):
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401
        
    leave_req = LeaveRequest.query.get(request_id)
    if not leave_req:
        return jsonify({"error": "Leave request not found"}), 404
        
    leave_req.status = 'approved'
    leave_req.approved_by = session.get('user_id')
    leave_req.approved_at = db.func.current_timestamp()
    
    db.session.commit()
    return jsonify({"message": "Leave request approved successfully"}), 200

# ---------------------------
# Reject Leave Request
# ---------------------------
@hr_bp.route('/leave-requests/<int:request_id>/reject', methods=['POST'])
def reject_leave(request_id):
    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401
        
    leave_req = LeaveRequest.query.get(request_id)
    if not leave_req:
        return jsonify({"error": "Leave request not found"}), 404
        
    leave_req.status = 'rejected'
    leave_req.approved_by = session.get('user_id')
    leave_req.approved_at = db.func.current_timestamp()
    
    db.session.commit()
    return jsonify({"message": "Leave request rejected successfully"}), 200