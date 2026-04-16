# HRSync - Project Documentation

## 1. Project Overview
**HRSync** is a next-generation, premium, full-stack Human Resource Management SaaS platform. It is designed to manage modern enterprise workforces securely and efficiently and provides multi-role portals with a performance-driven dark aesthetic.

## 2. Tools & Technology Stack

The project employs a modern, robust, and scalable tech stack distributed across frontend, backend, and external microservice components.

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM (v6)
- **Styling:** Custom CSS (Premium Dark UI, glassmorphic cards, neon accents, micro-animations)
- **Icons:** Lucide React
- **Code Quality:** ESLint, Prettier

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose ODM
- **Authentication & Sessions:** `express-session`, `connect-mongo`, `bcryptjs`
- **Security:** `helmet` (HTTP headers), `express-rate-limit` (DDoS protection)
- **Utilities:** `cors`, `dotenv`

### Microservices
- **Reporting & Batch Processing:** Java (Used for high-performance enterprise compliance reporting and audit simulation, bridged with the Node.js backend)

### Deployment
- **Frontend Hosting:** Vercel (Configured via `vercel.json`)
- **Backend Hosting:** Render

---

## 3. Key Features

### 3.1 Multi-Role Architecture
- Dedicated dashboards with role-based access for Admins, HR Managers, Employees, and Candidates.
- Secure, cookie-based session management and route guards.

### 3.2 Attendance & Workforce Tracking
- Geo-fenced, location-verified attendance with an immutable audit trail.
- Real-time attendance metrics.

### 3.3 Leave Management System
- Employees can apply for leaves and view leave history.
- Real-time approval/rejection workflows exclusively for HR and Admin roles.

### 3.4 Recruitment Pipeline
- Admins can create and manage job postings.
- Candidates can browse jobs, apply, and track application statuses.
- HR/Admins can shortlist candidates.

### 3.5 Automated Onboarding
- Seamless conversion of successful candidates into employees, including department assignments and profile creation.

### 3.6 HR Analytics & Enterprise Reporting
- Real-time workforce statistics, department breakdowns, and attendance metrics directly on the dashboard.
- High-performance, Java-powered enterprise-level compliance reporting. Generating simulated audit reports over large datasets, calculating compliance scores, and tracking tax disbursements.

### 3.7 Premium User Interface
- Visually stunning "Dark Mode" aesthetics.
- Fully responsive across desktop and mobile devices.
- Focus on user experience (UX) with modern typography, smooth gradients, and interactive micro-animations.

