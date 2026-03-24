import sqlite3
import os
from datetime import datetime, date, timedelta

DB = os.path.join(os.path.dirname(__file__), '..', 'instance', 'database.db')
DB = os.path.abspath(DB)

conn = sqlite3.connect(DB)
cur = conn.cursor()

# Helper functions

def get_or_create_department(name, color='#888', location=None, description=None):
    cur.execute("SELECT id FROM departments WHERE name = ?", (name,))
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute(
        "INSERT INTO departments (name, description, location, color, created_at) VALUES (?, ?, ?, ?, ?)",
        (name, description, location, color, datetime.utcnow())
    )
    return cur.lastrowid


def get_or_create_shift(name, start_time, end_time, grace=15):
    cur.execute("SELECT id FROM shifts WHERE name = ?", (name,))
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute(
        "INSERT INTO shifts (name, start_time, end_time, grace_period_minutes, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        (name, start_time, end_time, grace, 1, datetime.utcnow())
    )
    return cur.lastrowid


def get_or_create_user(role, name, email):
    cur.execute("SELECT id FROM users WHERE email = ?", (email,))
    row = cur.fetchone()
    if row:
        return row[0]
    password_hash = 'demo_hash'  # placeholder
    cur.execute(
        "INSERT INTO users (role, name, email, phone, password_hash, created_at, verified, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (role, name, email, None, password_hash, datetime.utcnow(), 'verified', 1)
    )
    return cur.lastrowid


def create_employee_if_missing(user_id, emp_code, first, last, email, department_id, position, joining_date, salary=50000):
    # employee_id column stores code like EMP001
    cur.execute("SELECT id FROM employees WHERE employee_id = ?", (emp_code,))
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute(
        "INSERT INTO employees (user_id, employee_id, first_name, last_name, email, phone, date_of_birth, gender, address, department_id, position, employment_type, shift_id, manager_id, status, joining_date, basic_salary, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (user_id, emp_code, first, last, email, None, None, None, None, department_id, position, 'permanent', None, None, 'active', joining_date, salary, datetime.utcnow(), datetime.utcnow())
    )
    return cur.lastrowid


def get_or_create_leave_type(name, code, max_days=18, is_paid=1):
    cur.execute("SELECT id FROM leave_types WHERE code = ?", (code,))
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute(
        "INSERT INTO leave_types (name, code, max_days_per_year, carry_forward, requires_medical_certificate, is_paid, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (name, code, max_days, 0, 0, is_paid, None, 1)
    )
    return cur.lastrowid


def add_leave_balance(employee_id, leave_type_id, year, total_allocated):
    cur.execute("SELECT id FROM leave_balances WHERE employee_id = ? AND leave_type_id = ? AND year = ?", (employee_id, leave_type_id, year))
    if cur.fetchone():
        return
    cur.execute(
        "INSERT INTO leave_balances (employee_id, leave_type_id, year, total_allocated, used, pending, balance, updated_at) VALUES (?, ?, ?, ?, 0, 0, ?, ?)",
        (employee_id, leave_type_id, year, total_allocated, total_allocated, datetime.utcnow())
    )


def add_leave_request(employee_id, leave_type_id, start_date, end_date, total_days, reason, status='pending'):
    cur.execute(
        "INSERT INTO leave_requests (employee_id, leave_type_id, start_date, end_date, total_days, reason, contact_during_leave, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (employee_id, leave_type_id, start_date, end_date, total_days, reason, None, status, datetime.utcnow(), datetime.utcnow())
    )
    return cur.lastrowid


def add_attendance(employee_id, dt, status='present', check_in=None, check_out=None, is_late=0, late_mins=0, is_early=0, early_mins=0):
    cur.execute("SELECT id FROM attendance WHERE employee_id = ? AND date = ?", (employee_id, dt))
    if cur.fetchone():
        return
    cur.execute(
        "INSERT INTO attendance (employee_id, date, shift_id, check_in_time, check_out_time, total_hours, status, is_late, late_by_minutes, is_early_leave, early_by_minutes, location, verified_by, verified_at, remarks, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (employee_id, dt, None, check_in, check_out, None, status, is_late, late_mins, is_early, early_mins, None, None, None, None, datetime.utcnow(), datetime.utcnow())
    )


# Begin seeding
print('Seeding demo data...')
conn.execute('PRAGMA foreign_keys = ON')

# 1) Departments - add more departments
dept_names = [
    ('Public Works', '#2563eb'),
    ('Finance', '#059669'),
    ('Administration', '#d97706'),
    ('Health Services', '#dc2626'),
    ('Parks & Recreation', '#7c3aed'),
    ('Education', '#0891b2'),
    ('Public Safety', '#ea580c'),
    ('Community Development', '#4f46e5'),
    ('Environmental Services', '#16a34a'),
    ('Transportation', '#0ea5e9'),
    ('IT Services', '#7c3aed'),
    ('Customer Relations', '#f97316')
]
for name, color in dept_names:
    get_or_create_department(name, color=color)

# 2) Shifts
get_or_create_shift('Morning', '08:30', '16:30')
get_or_create_shift('Afternoon', '12:00', '20:00')
get_or_create_shift('Night', '22:00', '06:00')

# 3) Leave types
annual_id = get_or_create_leave_type('Annual Leave', 'AL', max_days=18)
sick_id = get_or_create_leave_type('Sick Leave', 'SL', max_days=12)
casual_id = get_or_create_leave_type('Casual Leave', 'CL', max_days=10)

# 4) Create HR user if missing
hr_user_id = get_or_create_user('hr', 'HR Manager', 'hr.manager@municipal.gov')
admin_id = get_or_create_user('admin', 'Site Admin', 'admin@municipal.gov')

# 5) Create a larger set of employees & users
import random
first_names = ['Alice','Bob','Carlos','Diana','Ethan','Fiona','George','Hannah','Ivan','Julia','Kevin','Laura','Michael','Nora','Oliver','Priya','Quentin','Rita','Sam','Tina','Uma','Vik','Wendy','Xander','Yara','Zane']
last_names = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez']
positions = ['Engineer','Accountant','Clerk','Nurse','Supervisor','Technician','Analyst','Manager','Officer']

def random_email(first, last, idnum):
    return f"{first[0].lower()}.{last.lower()}{idnum}@municipal.gov"

cur.execute("SELECT id, employee_id FROM employees LIMIT 1")
existing = cur.fetchone()
start_index = 1
if existing:
    start_index = int(existing[1].lstrip('EMP').strip()) + 1 if existing[1].startswith('EMP') else existing[0] + 1

# Create ~40 employees across departments
dept_ids = []
cur.execute("SELECT id FROM departments")
dept_ids = [r[0] for r in cur.fetchall()]

for i in range(40):
    fn = random.choice(first_names)
    ln = random.choice(last_names)
    code = f"EMP{start_index + i:03d}"
    email = random_email(fn, ln, start_index + i)
    user_id = get_or_create_user('employee', f"{fn} {ln}", email)
    dept_id = random.choice(dept_ids)
    pos = random.choice(positions)
    join = date(2018,1,1) + timedelta(days=random.randint(0, 2000))
    salary = random.randint(30000, 90000)

    emp_id = create_employee_if_missing(user_id, code, fn, ln, email, dept_id, pos, join, salary)

    # add leave balances
    add_leave_balance(emp_id, annual_id, date.today().year, 18)
    add_leave_balance(emp_id, sick_id, date.today().year, 12)

    # add some leave requests at random
    if random.random() < 0.15:
        start = date.today() - timedelta(days=random.randint(1, 30))
        end = start + timedelta(days=random.randint(1, 7))
        add_leave_request(emp_id, random.choice([annual_id, sick_id, casual_id]), start, end, (end - start).days + 1, 'Personal')

    # add attendance records for today
    r = random.random()
    if r < 0.8:
        status = 'present'
        check_in_time = datetime.combine(date.today(), datetime.strptime('08:30', '%H:%M').time()) + timedelta(minutes=random.randint(0,40))
        late = 1 if check_in_time.time() > datetime.strptime('09:15', '%H:%M').time() else 0
    elif r < 0.9:
        status = 'on-leave'
        check_in_time = None
        late = 0
    else:
        status = 'absent'
        check_in_time = None
        late = 0
    add_attendance(emp_id, date.today(), status=status, check_in=check_in_time, is_late=late, late_mins=15 if late else 0)

# 6) Ensure at least one employee is HR in users table (already created hr_user_id), create employee row for HR
cur.execute("SELECT id FROM employees WHERE email = ?", ('hr.manager@municipal.gov',))
if not cur.fetchone():
    create_employee_if_missing(hr_user_id, 'EMPHR001', 'HR', 'Manager', 'hr.manager@municipal.gov', dept_id if dept_id else dept_ids[0], 'HR Manager', date.today() - timedelta(days=365*2), 70000)

conn.commit()
print('Seeding completed.')

# Quick verification: print counts
cur.execute("SELECT COUNT(*) FROM employees")
print('employees:', cur.fetchone()[0])
cur.execute("SELECT COUNT(*) FROM users WHERE role = 'employee'")
print('users (employee):', cur.fetchone()[0])
cur.execute("SELECT COUNT(*) FROM attendance WHERE date = ?", (date.today(),))
print('attendance today:', cur.fetchone()[0])
cur.execute("SELECT COUNT(*) FROM departments")
print('departments:', cur.fetchone()[0])

conn.close()
