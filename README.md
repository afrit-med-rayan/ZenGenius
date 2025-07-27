# ZenGenius
# 📚 StudySync – PDF Summarizer & Flashcard Generator

Welcome to **StudySync**, your AI-powered study assistant!  
Built for **Data Hackfest by MLH**, this app helps students turn any textbook, article, or notes (PDF) into flashcards and study summaries in seconds using **Google Gemini Pro**.

---

## 🚀 Features

- 🧠 **AI-Powered Summarization** – Upload a PDF and get a clean, understandable summary.
- 📄 **Flashcard Generator** – Automatically generates question/answer pairs as interactive flashcards.
- 🧑‍💻 **User Authentication** – Secure login via **Auth0**.
- 🧾 **Session History** – View and review past study sessions.
- ✨ **Beautiful UI** – Built with Chakra UI for a responsive and accessible interface.

---

## 🧰 Tech Stack

| Frontend             | Backend                | AI Model             | Auth      | Database |
|----------------------|------------------------|----------------------|-----------|----------|
| React + Chakra UI    | Node.js + Express      | Google Gemini Pro    | Auth0     | MongoDB  |

---

## 🛠️ Setup Instructions

### 📁 Clone the repo

```bash
git clone https://github.com/your-username/studysync.git
cd studysync

🔐 Environment Variables

Create a .env file inside the /backend folder with the following:

PORT=5000
MONGODB_URI=your_mongo_connection_string
GOOGLE_API_KEY=your_gemini_api_key
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_DOMAIN=your_auth0_domain

🖥️ Install Dependencies
Frontend

npm install @chakra-ui/icons
npm install @chakra-ui/react@2.7.1 @emotion/react@11.10.6 @emotion/styled@11.10.6 framer-motion@10.12.16
npm install react@18.2.0 react-dom@18.2.0
npm install axios
npm install @auth0/auth0-react

Backend

cd backend
npm init -y
npm install express dotenv cors mongoose
npm install @google/generative-ai
npm install express-jwt jwks-rsa
npm install multer pdf-parse
npm install -D nodemon

🔄 Running the App
Backend

# Development mode
npx nodemon server.js

# Or normal mode
node server.js

Frontend

In the root folder (where your React app is):

npm start

🧪 How It Works

    Log in with your Auth0 account.

    Upload a PDF via the homepage.

    The app:

        Parses your PDF using pdf-parse

        Sends the text to Google Gemini Pro

        Summarizes it and creates flashcards

    Displays your summary + interactive Q/A cards.

    Saves the session to your dashboard!

🌐 Live Demo

Coming soon (if deployed to Vercel/Render)!
💡 Inspiration

This project was built during Data Hackfest (by MLH), where we were challenged to use data and AI in creative ways. We wanted to build a tool that helps students revise smarter, not harder. 📖💥
🧠 Future Features (Post-Hackathon Ideas)

    🔎 Search through past summaries

    💾 Export flashcards to Anki or PDF

    📊 Analytics dashboard (study time, topics, etc.)

    🗣️ Text-to-speech for accessibility