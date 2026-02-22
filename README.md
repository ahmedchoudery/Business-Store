# AhmedDev – Premium Business Website Portfolio

A professional, full-stack business portfolio website designed to sell web development services to local businesses like coaching centers, gyms, real estate agents, and shops.

## 🚀 Key Features
- **Clean React Structure**: Modern, modular, and reusable component architecture.
- **Premium Design**: Dark-theme aesthetics with glassmorphism, smooth animations (Framer Motion), and custom typography.
- **Responsive Perfection**: Mobile-first design using Flexbox and CSS Grid.
- **Full-Stack Integration**: Node.js/Express backend with MongoDB Atlas for lead capture.
- **WhatsApp Integration**: Floating action button and targeted CTA links for instant reach.
- **Contact Form**: Validated lead capture form with success/error notifications.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Framer Motion, Axios, React Hook Form, React Icons, React Hot Toast.
- **Backend**: Node.js, Express, Mongoose, Express Validator, Helmet, CORS.
- **Database**: MongoDB Atlas.
- **Deployment**: Vercel.

---

## 📁 Folder Structure
```
Business-Store/
├── client/          ← Vite React Frontend
│   └── ...
├── server/          ← Node.js Backend
│   └── ...
├── vercel.json      ← Monorepo routing config
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster

### 2. Backend Setup
1. Navigate to `server/`: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the template:
   ```env
   MONGO_URI=your_mongodb_cluster_uri
   PORT=5000
   NODE_ENV=development
   WHATSAPP_NUMBER=923001234567
   ADMIN_SECRET=your_admin_secret_key
   ```
4. Start the server: `npm run dev`

### 3. Frontend Setup
1. Navigate to `client/`: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_WHATSAPP_NUMBER=923001234567
   ```
4. Start the dev server: `npm run dev`

---

## 🚢 Deployment (Vercel)

The project is already pre-configured for Vercel monorepo deployment via `vercel.json`.

1. Connect your GitHub repository to Vercel.
2. In Vercel Project Settings:
   - **Root Directory**: Leave as `.` (repository root)
   - **Build Settings**: Vercel will auto-detect from `vercel.json`.
3. Add Environment Variables:
   - `MONGO_URI`
   - `ADMIN_SECRET`
   - `VITE_API_URL` (Set to your Vercel production URL)
   - `VITE_WHATSAPP_NUMBER`
4. Deploy!

---

## 👨‍💻 Author
Ahmed Choudery — *Student of Software Engineering & Professional Web Developer*
