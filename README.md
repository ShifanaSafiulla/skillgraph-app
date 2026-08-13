# 🚀 SkillGraph - Full Stack Career Skill-Gap & Learning Analytics Platform

**SkillGraph** is an interactive, full-stack MERN application designed to help tech students and developers manage skills, analyze career gaps against industry benchmark target roles, follow smart learning roadmaps, solve daily coding assessments, and visualize progress.

---

## 🌟 Key Features & Modules

### Module 1: Skill Management & Visualizer
- Interactive skill graph visualizer and level filter (Beginner, Intermediate, Advanced).
- Dynamic CRUD operations with local MongoDB and robust in-memory fallback.

### Module 2: Career Gap Analysis & Benchmark Engine
- Target career selection (Python Developer, Data Scientist, Full-Stack Developer, Data Analyst, Machine Learning Engineer).
- Automated readiness score calculation & skill gap detection.

### Module 3: Smart Learning Roadmap & Resource Hub
- Curated free and paid certified courses (freeCodeCamp, Microsoft, IBM, Coursera, Udemy).
- Categorized learning video guides and channel links.

### Module 4: Interactive Coding Assessment Bank
- In-browser Python coding playground with automated test case evaluation.
- Instant submission score tracking and problem difficulty badges.

### Module 5: Progress Intelligence & Analytics Dashboard
- Overall career readiness %, mastery charts, and KPI detail modals.

### 🛡️ Admin Portal (`/admin`)
- Complete administrative management dashboard for Users, Career Roles, Skill Catalog, Courses, Videos, and Coding Assessment Questions with live **Recharts** visualizations.

### ☀️/🌙 Interactive Light Switch Theme Switcher
- Sleek toggle switch slider bar available across the Header, User Profile Modal, Settings Modal, and Admin Navbar.

---

## 📂 Project Structure

```
skillgraph-app/
├── client/                     # Vite + React Frontend
│   ├── dist/                   # Production build bundle
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Admin Portal components (Dashboard, Users, Courses, Videos, etc.)
│   │   │   ├── Header.jsx
│   │   │   ├── ThemeToggleSwitch.jsx
│   │   │   ├── SkillGraphVisualizer.jsx
│   │   │   ├── CareerGapAnalyzer.jsx
│   │   │   ├── SmartRoadmapHub.jsx
│   │   │   ├── DailyCodingAssessment.jsx
│   │   │   ├── ProgressIntelligenceDashboard.jsx
│   │   │   ├── UserProfileModal.jsx
│   │   │   └── SettingsModal.jsx
│   │   ├── App.jsx             # Main Application & Router
│   │   └── index.css           # Custom Glassmorphism CSS Design System
│   └── package.json
├── server/                     # Node.js + Express Backend
│   ├── models/                 # 8 Mongoose Schemas (User, Skill, CareerRole, Course, Video, etc.)
│   ├── routes/                 # Express API Endpoints
│   ├── seed.js                 # Idempotent Database Seeding Script
│   └── server.js               # Express Server & Static Build Host
├── DEPLOYMENT.md               # Cloud Deployment Instructions (Render / Vercel / MongoDB Atlas)
├── VIVA_PREPARATION_GUIDE.md   # Viva Q&A & Evaluation Defense Guide
└── package.json
```

---

## ⚡ How to Run Locally

1. **Seed MongoDB Database**:
   ```powershell
   node server/seed.js
   ```

2. **Start Node.js Server**:
   ```powershell
   node server/server.js
   ```

3. Open in Browser:
   👉 **[http://localhost:5001](http://localhost:5001)** (or `http://localhost:5000`)

---

## 📚 Documentation & Evaluation Links
- ☁️ [Cloud Deployment Guide](file:///d:/skillgraph-app/DEPLOYMENT.md)
- 🎓 [Viva Preparation & Project Defense Guide](file:///d:/skillgraph-app/VIVA_PREPARATION_GUIDE.md)
