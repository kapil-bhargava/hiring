## Veridia Hiring Platform (MERN Stack)

A modern and professional hiring platform built for Veridia to streamline candidate applications and improve the recruitment workflow. This system replaces manual tools like Google Forms with an automated, structured, and user-friendly platform.

The project was developed as part of an internship task and successfully completed with all required features.

📌 Overview

The Veridia Hiring Platform allows candidates to apply for job roles and track their application status, while HR/admin users can manage applications, shortlist candidates, and send automated email updates.

The platform focuses on:

A clean and modern UI

Structured application workflow

Automated email notifications

Real-time application tracking

Efficient admin dashboard

🎯 Key Objectives

Provide a professional hiring experience

Simplify job application management

Enable candidates to track their application progress

Allow HR to manage and filter applications efficiently

Automate status update emails

Improve transparency in the hiring process

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router DOM

Axios

SweetAlert2

React Toastify

Backend

Node.js

Express.js

MongoDB

Mongoose

Nodemailer

Multer (file uploads)

⚡ Features Implemented
👨‍💻 Candidate Side

User registration and login

Profile management

Resume and profile image upload

Browse job openings

Apply for jobs

Track application status (Pending, Shortlisted, Rejected)

Email notifications for updates

🧑‍💼 Admin (HR) Side

Admin authentication

Create and manage job postings

View applicants

Filter and search candidates

Shortlist or reject candidates

Automated email status updates

Dashboard with structured applicant data

📩 Automated Email System

The platform sends professional email notifications:

On job application submission

On status updates (Shortlisted / Rejected)

Structured and branded email templates

🗂️ Project Structure
veridia/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
⚙️ Environment Setup
🔹 Backend .env
MONGO_URI=mongodb+srv://rishabhmaurya7523_db_user:8vHDDSi3zsVJuKO1@cluster0.fdgig6y.mongodb.net/veridiadb
MAIL_USER=ssatyam0411@gmail.com
MAIL_PASS=gzso tqov hmps kjth
API=http://localhost:5173
PORT=5000
🔹 Frontend .env
VITE_APP_API=http://localhost:5000
📦 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/satyam1919maurya/veridia
2️⃣ Backend Setup
cd backend
npm install
node index.js
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

The app will run on:

Frontend → http://localhost:5173
Backend → http://localhost:5000
📊 Database Design
Collections:

Users

Candidates

Jobs

Applicants

Applicant snapshot system ensures data consistency even if candidates update profiles later.

🔐 Authentication

Basic authentication and role-based routing are implemented. JWT is installed but not used in the current version.

✉️ Email Workflow

Automated emails are sent when:

A candidate applies

HR updates application status

This improves communication and candidate experience.

## 🔑 Admin Login Access

The platform includes a predefined admin panel for demonstration and testing purposes. The admin authentication is currently implemented on the frontend with hardcoded credentials.
To access the admin dashboard:
/admin/login
http://localhost:5173/admin/login

Email: Admin  
Password: 123

These credentials are hardcoded in the frontend for development and internship evaluation purposes.
This allows quick access to the admin dashboard without backend authentication.
In a production environment, admin authentication should be secured and implemented on the backend with proper role-based access and encrypted credentials.



🧪 API Overview
Authentication
POST /api/auth/register
POST /api/auth/login
Candidate
GET /api/candidate/profile
PATCH /api/candidate/profile
Jobs
GET /api/jobs
POST /api/jobs
Applications
POST /api/applicants
GET /api/applicants
PUT /api/applicants/:id/status
📌 Completed Internship Task

This project successfully fulfills the internship requirements by delivering a full-stack hiring platform with modern UI, backend automation, and real-world workflow design.

🚀 Future Enhancements

Email verification

Advanced HR filters

Analytics dashboard

Multi-role access

Interview scheduling

Resume AI screening

Notification center

📄 License

This project is developed for educational and internship purposes.

💡 Conclusion

The Veridia Hiring Platform demonstrates strong full-stack development skills using the MERN stack and provides a scalable foundation for future hiring automation systems.

⭐ If you like this project, feel free to explore and improve it further.