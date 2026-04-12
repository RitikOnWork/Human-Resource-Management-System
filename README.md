# HRMS - Next-Generation Workforce Management System

A premium, full-stack Human Resource Management SaaS platform designed to manage the modern enterprise workforce securely and efficiently. Built with a stunning, performance-driven dark aesthetic.

---

## Key Features

- **Multi-Role Portals** - Dedicated dashboards for Admin, HR Manager, Employee, and Candidate
- **Attendance Tracking** - Geo-fenced, location-verified attendance with audit trail
- **Leave Management** - Apply, approve, and reject leave requests with real-time status
- **Recruitment Pipeline** - Job posting, candidate applications, and shortlisting workflow
- **Employee Onboarding** - Convert candidates to employees with department assignment
- **HR Analytics** - Real-time workforce stats, department breakdowns, and attendance metrics
- **Session-Based Auth** - Secure cookie-based authentication with role guards
- **Premium Dark UI** - Custom CSS with glassmorphic cards, neon accents, and smooth animations

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Auth | express-session, connect-mongo, bcryptjs |
| Icons | Lucide React |
| Styling | 100% Custom CSS (no UI library) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
Human-Resource-Management-System/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── middleware/auth.js        # Session auth + role guards
│   ├── models/
│   │   ├── User.js               # User with bcrypt password hashing
│   │   ├── Employee.js           # Employee profiles
│   │   ├── Job.js                # Job postings
│   │   ├── Application.js        # Job applications
│   │   ├── Department.js         # Departments
│   │   ├── Attendance.js         # Attendance records
│   │   └── LeaveRequest.js       # Leave requests
│   ├── routes/
│   │   ├── auth.js               # signup, login, logout, me
│   │   ├── hr.js                 # employees, departments, attendance, leaves, stats
│   │   ├── admin.js              # dashboard, create-job, applications, shortlist
│   │   ├── candidate.js          # jobs, apply, applications, dashboard
│   │   └── employee.js           # dashboard, apply-leave, leave-history
│   ├── server.js                 # Express entry point
│   ├── seed.js                   # Sample data seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/           # Shared layouts, navbars, protected routes
│   │   ├── pages/
│   │   │   ├── auth/             # Login, Signup
│   │   │   ├── admin/            # Admin Dashboard, Jobs, Applications, Employees
│   │   │   ├── hr/               # HR Dashboard with tabbed views
│   │   │   ├── employee/         # Employee Dashboard, Leave Management
│   │   │   ├── candidate/        # Job browsing, Applications tracking
│   │   │   └── Landing.jsx       # Public landing page
│   │   ├── services/             # API client utilities
│   │   └── styles/               # Global CSS
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
└── README.md
```

---

## API Endpoints (21 routes)

### Auth (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register new candidate account |
| POST | `/login` | Login with email/password |
| POST | `/logout` | Destroy session |
| GET | `/me` | Get current authenticated user |

### HR (`/api/hr`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/user` | Get HR user profile |
| GET | `/employees` | List all employees |
| GET | `/departments` | List all departments |
| GET | `/attendance` | Get attendance records |
| GET | `/leave-requests` | List all leave requests |
| GET | `/stats` | Dashboard statistics |
| POST | `/leave-requests/:id/approve` | Approve a leave request |
| POST | `/leave-requests/:id/reject` | Reject a leave request |
| POST | `/create-employee` | Onboard candidate as employee |

### Admin (`/api/admin`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard` | List all job postings |
| POST | `/create-job` | Create a new job posting |
| GET | `/job/:jobId/applications` | View applications for a job |
| POST | `/application/:id/shortlist` | Shortlist a candidate |

### Candidate (`/api/candidate`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard` | Candidate dashboard |
| GET | `/jobs` | Browse open jobs (with search/filter) |
| POST | `/apply` | Apply for a job |
| GET | `/applications` | Track my applications |

### Employee (`/api/employee`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard` | Employee dashboard with stats |
| POST | `/apply-leave` | Submit a leave request |
| GET | `/leave-history` | View personal leave history |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/RitikOnWork/Human-Resource-Management-System.git
cd Human-Resource-Management-System
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env        # Configure your MongoDB URI
npm install
node seed.js                # Populate sample data (first time only)
npm run dev                 # Starts on http://localhost:5000
```

### 3. Setup Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev                 # Starts on http://localhost:5173
```

### 4. Open in Browser
Navigate to **http://localhost:5173**

---

## Sample Login Credentials

After running `node seed.js`, use these accounts:

| Role | Email | Password |
|---|---|---|
| Admin | admin@hrms.com | admin123 |
| HR Manager | hr@hrms.com | hr123 |
| Employee | john@hrms.com | emp123 |
| Employee | sarah@hrms.com | emp123 |
| Candidate | mike@gmail.com | candidate123 |

---

## Extension Roadmap

A detailed phased roadmap for scaling this platform is available as a PDF:

**[HRMS-Extension-Plan.pdf](./HRMS-Extension-Plan.pdf)**

### Planned Phases
1. **Core Completion** - Payroll, Performance Reviews, Notifications, Document Management
2. **HR Intelligence** - Analytics & Reporting, AI Resume Screening, Onboarding Workflows
3. **SaaS Scale** - Multi-Tenancy, Subscription Billing, SSO/OAuth, Mobile PWA
4. **Employee Experience** - Self-Service Portal, Training LMS, Shift Management, Org Chart

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/hrms
SESSION_SECRET=your-secret-key
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

*Built with React, Node.js, Express, and MongoDB for the modern HR ecosystem.*
*Created with ❤️ by Ritik Raj.*

🔗 **Connect with me:** [LinkedIn](https://www.linkedin.com/in/ritikonwork)