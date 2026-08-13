# ☁️ SkillGraph Cloud Deployment Guide

This guide details how to deploy the **SkillGraph MERN Stack Application** to free/low-cost cloud platforms (**Render**, **Vercel**, or **Railway**) with **MongoDB Atlas**.

---

## 1. MongoDB Atlas Setup (Cloud Database)

1. Create a free MongoDB Atlas cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User (e.g. `skillgraph_user`) and password.
3. Network Access: Add IP Address `0.0.0.0/0` (Allow access from anywhere).
4. Copy your Connection String URI:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/skillgraph?retryWrites=true&w=majority
   ```
5. Seed the Cloud Database:
   Set `MONGODB_URI` in your local `.env` and run:
   ```powershell
   node server/seed.js
   ```

---

## 2. Option A: Deploying to Render (Recommended for Full-Stack Node + React)

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "SkillGraph Full Stack App Complete"
   git branch -M main
   git remote add origin https://github.com/your-username/skillgraph-app.git
   git push -u origin main
   ```
2. Log in to [Render.com](https://render.com) and create a **Web Service**.
3. Connect your GitHub repository.
4. Set Configuration:
   - **Environment**: `Node`
   - **Build Command**: `npm install && cmd /c "cd client && npm install && npm run build"` (or `npm install && cd client && npm install && npm run build`)
   - **Start Command**: `node server/server.js`
5. Add Environment Variables:
   - `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/skillgraph?retryWrites=true&w=majority`
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
6. Click **Deploy Web Service**. Render will build the Vite React app and serve it via Express Node.js!

---

## 3. Option B: Deploying to Vercel (Frontend) + Render (Backend)

### Backend on Render:
1. Web Service pointing to `server/server.js`.
2. Start Command: `node server/server.js`.
3. Set `MONGODB_URI`.

### Frontend on Vercel:
1. Log in to [Vercel.com](https://vercel.com).
2. Import repository and set Root Directory to `client`.
3. Framework Preset: `Vite`.
4. Click **Deploy**.

---

## 4. Verification Checklist Before Presentation
- [x] Node server connects to MongoDB Atlas URI cleanly.
- [x] Frontend builds with 0 errors via `npm run build`.
- [x] All 5 modules + Admin Panel render correctly on cloud domain.
- [x] Light Switch Theme Toggle operates smoothly in dark & light modes.
