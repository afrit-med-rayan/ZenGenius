# 🧠 ZenGenius – AI-Powered PDF Summarizer & Flashcard Generator

Welcome to **ZenGenius**, your intelligent study companion!  
Built for **Data Hackfest by MLH**, this app helps students transform any textbook, article, or notes (PDF) into flashcards and study summaries in seconds using **Google Gemini Pro**.

---

## 🚀 Features

- 🧠 **AI-Powered Summarization** – Upload a PDF and get a clean, understandable summary.
- 📄 **Flashcard Generator** – Automatically generates question/answer pairs as interactive flashcards.
- 🧑‍💻 **User Authentication** – Secure login via **Auth0**.
- 🧾 **Session History** – View and review past study sessions.
- ✨ **Beautiful UI** – Built with Chakra UI for a responsive and accessible interface.

---

## 🧰 Tech Stack

| Frontend                 | Backend           | AI Model          | Auth  | Database |
| ------------------------ | ----------------- | ----------------- | ----- | -------- |
| React + Vite + Chakra UI | Node.js + Express | Google Gemini Pro | Auth0 | MongoDB  |

---

## 🛠️ Setup Instructions

### 📁 Clone the repo

```bash
git clone https://github.com/your-username/zengenius.git
cd zengenius
```

### �️ Instoall Dependencies

**Easy Installation (Recommended):**

**For Windows:**

```bash
install-requirements.bat
```

**For Mac/Linux:**

```bash
./install-requirements.sh
```

**Or use npm script:**

```bash
npm run install:all
```

### 🔐 Environment Variables Setup

You need to create two `.env` files with the following configurations:

#### **Backend Environment (.env in /backend folder):**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
AUTH0_DOMAIN=your_auth0_domain
AUTH0_AUDIENCE=your_auth0_audience
VITE_API_URL=http://localhost:5000
```

#### **Frontend Environment (.env in /frontend folder):**

```env
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_API_URL=http://localhost:5000
```

#### **🔑 Where to Get Your API Keys:**

**1. Google Gemini API Key:**

- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in with your Google account
- Click "Create API Key"
- Copy the generated key and paste it as `GEMINI_API_KEY`

**2. MongoDB Connection String:**

- Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster (free tier available)
- Go to "Database Access" → Create database user
- Go to "Network Access" → Add IP address (0.0.0.0/0 for development)
- Click "Connect" → "Connect your application"
- Copy the connection string and replace `<password>` with your database user password

**3. Auth0 Configuration:**

- Create account at [Auth0](https://auth0.com/)
- Create a new application (Single Page Application)
- Go to application settings:
  - Copy `Domain` → use as `AUTH0_DOMAIN` and `VITE_AUTH0_DOMAIN`
  - Copy `Client ID` → use as `VITE_AUTH0_CLIENT_ID`
  - Set `Allowed Callback URLs`: `http://localhost:5173`
  - Set `Allowed Logout URLs`: `http://localhost:5173`
  - Set `Allowed Web Origins`: `http://localhost:5173`
- Go to APIs → Create API:
  - Set identifier (e.g., `https://zengenius-api.com`) → use as `AUTH0_AUDIENCE`

### 🔄 Running the App

**Option 1: Run both simultaneously (Recommended):**

```bash
npm run dev
```

**Option 2: Run separately:**

**Backend (Terminal 1):**

```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**

```bash
cd frontend
npm run dev
```

The app will be available at:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 🧪 How It Works

1. **Log in** with your Auth0 account.
2. **Upload a PDF** via the homepage.
3. The app:
   - Parses your PDF using `pdf-parse`
   - Sends the text to Google Gemini Pro
   - Summarizes it and creates flashcards
4. **View results** - summary + interactive Q/A cards.
5. **Save session** to your dashboard for later review!

---

## 📁 Project Structure

```
zengenius/
├── backend/                    # Node.js + Express API
│   ├── middleware/            # Auth middleware
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── server/               # Utilities (Gemini integration)
│   ├── uploads/              # PDF file storage
│   ├── .env                  # Backend environment variables
│   └── server.js             # Main server file
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Route pages
│   │   ├── services/         # API calls
│   │   └── utils/            # Helper functions
│   ├── .env                  # Frontend environment variables
│   └── vite.config.js        # Vite configuration
├── install-requirements.bat   # Windows installation script
├── install-requirements.sh    # Mac/Linux installation script
└── package.json              # Root scripts
```

---

## 🔧 Available Scripts

| Command                    | Description                          |
| -------------------------- | ------------------------------------ |
| `install-requirements.bat` | Install all dependencies (Windows)   |
| `install-requirements.sh`  | Install all dependencies (Mac/Linux) |
| `npm run install:all`      | Install all dependencies (npm)       |
| `npm run dev`              | Run both frontend and backend        |
| `npm run dev:backend`      | Run only backend server              |
| `npm run dev:frontend`     | Run only frontend                    |
| `npm run test:setup`       | Test if setup is working             |

---

## 🌐 API Endpoints

| Method | Endpoint                     | Description                             |
| ------ | ---------------------------- | --------------------------------------- |
| `POST` | `/api/upload`                | Upload PDF and get summary + flashcards |
| `GET`  | `/api/study-session/:userId` | Get user's study sessions               |
| `POST` | `/api/study-session`         | Save new study session                  |
| `GET`  | `/api/private`               | Protected route (requires auth)         |

---

## 🚨 Troubleshooting

**Installation Issues:**

- Make sure you have Node.js installed (v16 or higher)
- Run installation script as administrator if needed
- Check internet connection for package downloads

**Backend won't start:**

- Verify MongoDB URI is correct and database is accessible
- Check if Gemini API key is valid and has quota
- Ensure port 5000 is available (close other apps using it)
- Confirm all environment variables are set in backend/.env

**Frontend won't start:**

- Verify Auth0 credentials are correct
- Check if API URL points to backend (http://localhost:5000)
- Ensure port 5173 is available
- Confirm all environment variables are set in frontend/.env

**Authentication Issues:**

- Check Auth0 callback URLs are set correctly
- Verify Auth0 domain and client ID match your application
- Ensure CORS is configured properly in backend

**PDF upload fails:**

- Check file size (recommended under 10MB)
- Verify Gemini API key has sufficient quota
- Check network connection and firewall settings
- Ensure uploads folder exists in backend directory

---

## 💡 Inspiration

This project was built during **Data Hackfest by MLH**, where we were challenged to use data and AI in creative ways. We wanted to build a tool that helps students revise smarter, not harder. 📖💥

---

## 🧠 Future Features

- 🔎 Search through past summaries
- 💾 Export flashcards to Anki or PDF
- 📊 Analytics dashboard (study time, topics, etc.)
- 🗣️ Text-to-speech for accessibility
- 🎯 Spaced repetition algorithm
- 📱 Mobile app version

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Made with ❤️ for students everywhere!**
