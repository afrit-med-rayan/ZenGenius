# 🚀 ZenGenius Quick Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- Git

## Step-by-Step Setup

### 1. Clone and Install

```bash
git clone https://github.com/your-username/zengenius.git
cd zengenius

# For Windows
install-requirements.bat

# For Mac/Linux
./install-requirements.sh
```

### 2. Get Your API Keys

#### Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

#### MongoDB Connection String

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster (free tier)
3. Create database user (Database Access)
4. Add IP address 0.0.0.0/0 (Network Access)
5. Click "Connect" → "Connect your application"
6. Copy connection string

#### Auth0 Setup

1. Create account at [Auth0](https://auth0.com/)
2. Create new Single Page Application
3. Note down Domain and Client ID
4. Set Callback URLs: `http://localhost:5173`
5. Set Logout URLs: `http://localhost:5173`
6. Set Web Origins: `http://localhost:5173`
7. Create API with identifier (e.g., `https://zengenius-api.com`)

### 3. Create Environment Files

**backend/.env:**

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/zengenius
GEMINI_API_KEY=your_gemini_api_key_here
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=https://zengenius-api.com
VITE_API_URL=http://localhost:5000
```

**frontend/.env:**

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id_here
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application

```bash
npm run dev
```

Visit:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Common Issues

**Port already in use:**

- Change PORT in backend/.env to different number
- Update VITE_API_URL accordingly

**MongoDB connection failed:**

- Check connection string format
- Verify database user credentials
- Ensure IP whitelist includes your IP

**Auth0 login not working:**

- Verify callback URLs match exactly
- Check domain and client ID are correct
- Ensure application type is "Single Page Application"

## Need Help?

Check the main README.md for detailed troubleshooting guide.
