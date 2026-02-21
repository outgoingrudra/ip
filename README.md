# 🧠 Talent IQ

> A platform to sharpen your coding skills — solve challenges solo or jump into a live session with another developer featuring real-time video calls and chat.

🌐 **Live Demo** → [talent-iq-slfp.onrender.com](https://talent-iq-slfp.onrender.com)

---

## ✨ Features

- 🧩 **Code Challenges** — Solve coding problems directly in the browser
- 🤝 **Live Sessions** — Create or join a session with one other developer
- 📹 **Video Calling** — Real-time video powered by GetStream.io
- 💬 **In-Session Chat** — Chat with your session partner in real time
- 🔐 **Authentication** — Secure sign-in/sign-up via Clerk
- ⚡ **Background Jobs** — Async workflows handled by Inngest
- 🎨 **Sleek UI** — Built with Tailwind CSS, DaisyUI & Framer Motion animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, DaisyUI, Framer Motion |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | Clerk |
| Video & Chat | GetStream.io |
| Background Jobs | Inngest |
| Full Stack | MERN |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)
- Clerk account → [clerk.com](https://clerk.com)
- GetStream.io account → [getstream.io](https://getstream.io)
- Inngest account → [inngest.com](https://inngest.com)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/talent-iq.git
   cd talent-iq
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in both `/backend` and `/frontend`:

   **`/backend/.env`**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   STREAM_API_KEY=your_getstream_api_key
   STREAM_API_SECRET=your_getstream_api_secret
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

   **`/frontend/.env`**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_STREAM_API_KEY=your_getstream_api_key
   ```

4. **Run the app**
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend (new terminal)
   cd frontend
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

---

## 🔑 Key Integrations

**Clerk** handles all authentication flows — sign up, sign in, and session management. User identity is synced with the backend via webhooks.

**GetStream.io** powers the real-time video calls and chat inside sessions, providing a scalable and low-latency experience.

**Inngest** manages background event-driven workflows (e.g., session cleanup, notifications) without blocking the main request cycle.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Built with ❤️ using the MERN stack</p>