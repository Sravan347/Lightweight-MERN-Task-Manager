# Lightweight MERN Task Manager

Simple MERN stack task manager with JWT auth.

## Features
- User registration & login (passwords hashed with bcrypt)
- JWT authentication (protects task endpoints)
- CRUD operations for tasks
- Each task belongs to a user
- Simple React frontend storing JWT in localStorage

## Repo structure
- `server/` - Express API (MongoDB + Mongoose)
- `frontend/` - React app

## Setup

### Backend
1. `cd backend`
2. `cp .env.example .env` and edit `.env` (set `MONGO_URI`, `JWT_SECRET`)
3. `npm install`
4.  `npm start`

API will run on `http://localhost:5000` by default.

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` in `frontend` 
