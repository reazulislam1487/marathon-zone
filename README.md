🏃 Marathon Zone
Live Site: https://marathonzonebyreaz.netlify.app

A full-stack web app that connects marathon organizers and participants. Users can create events, register, and manage activities from a personal dashboard.

🚀 Key Features
🔐 JWT-authenticated private routes

📋 CRUD for marathons and registrations

📱 Responsive design (mobile, tablet, desktop)

🔍 Server-side search & sort

🌓 Dark/Light mode toggle

🧩 Core Pages
Home: Banner, 6 marathon cards (from DB), upcoming events

Login/Register: Email/password + Google login

Dashboard: Add marathon, My Marathons, My Apply List

Details Page: Countdown timer, register button, total count

🛠️ Tech Stack
Frontend: React, Tailwind, Firebase Auth, React Router

Backend: Node.js, Express, MongoDB, JWT

Extras: SweetAlert, React Datepicker, Countdown Timer

<details> <summary>📦 <strong>Dependencies</strong> "dependencies": {
  "@tailwindcss/vite": "^4.1.7",
  "axios": "^1.9.0",
  "daisyui": "^5.0.37",
  "dotenv": "^16.5.0",
  "firebase": "^11.8.1",
  "icons": "^1.0.0",
  "lottie-react": "^2.4.1",
  "lucide-react": "^0.513.0",
  "motion": "^12.14.0",
  "react": "^19.1.0",
  "react-countdown-circle-timer": "^3.2.1",
  "react-datepicker": "^8.4.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.6.1",
  "react-slick": "^0.30.3",
  "slick-carousel": "^1.8.1",
  "sweetalert2": "^11.22.0",
  "swiper": "^11.2.8",
  "tailwindcss": "^4.1.7"
}
</summary>

🔐 Env Setup
Use .env to store sensitive info:

makefile
Copy
Edit
VITE_FIREBASE_API_KEY=
VITE_API_URL=
✅ Submission Checklist
18+ Client Commits

8+ Server Commits

Live Site + GitHub Repos

All required + optional features
