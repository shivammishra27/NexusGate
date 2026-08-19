# 🚀 NexusGate

### AI API Gateway for Secure, Intelligent and Scalable AI Requests

NexusGate is a production-ready AI API Gateway that provides a single interface for applications to interact with AI services.

It handles authentication, API key validation, rate limiting, intelligent model routing, request tracking, usage analytics, and Gemini AI integration through one centralized API.

---

## 🌐 Live Demo

### Frontend

https://nexusgate-frontend-2.onrender.com

### Backend API

https://nexusgate-api-cr5w.onrender.com

### GitHub

https://github.com/shivammishra27/NexusGate

---

## ✨ Features

- 🔐 User Authentication
- 🔑 API Key Authentication
- 🤖 Gemini AI Integration
- ⚡ Intelligent AI Model Routing
- 🚦 API Rate Limiting
- 📊 Request Tracking
- 📈 Usage Analytics
- 🗄️ PostgreSQL Database
- 🧩 Prisma ORM
- 🌐 REST API
- 🎨 React Dashboard
- 🧪 AI Playground
- ☁️ Production Deployment
- 🔒 CORS Protection

---

## 🏗️ Architecture

```text
                         USER
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Frontend  │
                  └────────┬────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │  NexusGate API Gateway  │
              └────────────┬────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
       Authentication   API Key     Rate Limiting
                        Validation
              │            │            │
              └────────────┼────────────┘
                           ▼
                  ┌─────────────────┐
                  │   AI Router     │
                  └────────┬────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Gemini AI  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ PostgreSQL  │
                    └──────┬──────┘
                           │
                           ▼
                Response + Usage Metrics
```

---

## 📸 Screenshots

### 🔐 Signup

![NexusGate Signup](docs/screenshots/signup.png)

### 🔑 Login

![NexusGate Login](docs/screenshots/login.png)

### 📊 Dashboard

![NexusGate Dashboard](docs/screenshots/dashboard.png)

### 🤖 AI Playground

![NexusGate AI Playground](docs/screenshots/playground.png)

---

## 📊 Dashboard

The NexusGate dashboard provides API usage and performance information.

### Request Metrics

- Total Requests
- Successful Requests
- Failed Requests
- Success Rate

### AI Usage

- Input Tokens
- Output Tokens
- Total Tokens

### Performance

- Average Response Time
- Selected AI Model
- Request Route
- Request History

---

## 🤖 AI Playground

The Playground allows users to directly test the NexusGate AI API.

Example prompt:

```text
Explain API Gateway in simple words
```

NexusGate returns the AI response along with:

- Model
- Route
- Token Usage
- Response Time

Example:

```text
Model: Gemini 3.5 Flash-Lite
Route: Fast
Tokens: 402
Response Time: 2.18s
```

---

## 📡 API

### Generate AI Response

```http
POST /api/generate
```

### Headers

```http
Content-Type: application/json
Authorization: Bearer YOUR_NEXUSGATE_API_KEY
```

### Request

```json
{
  "prompt": "Explain API Gateway in simple words"
}
```

### Response

```json
{
  "success": true,
  "response": "An API Gateway acts as a single entry point...",
  "usage": {
    "inputTokens": 10,
    "outputTokens": 50,
    "totalTokens": 60
  },
  "model": "gemini-3.5-flash-lite",
  "route": "fast",
  "responseTime": 1200
}
```

---

## 🔐 Authentication

NexusGate uses API keys to authenticate API requests.

```http
Authorization: Bearer YOUR_NEXUSGATE_API_KEY
```

Invalid or missing API keys are rejected by the gateway.

---

## 🚦 Rate Limiting

NexusGate uses rate limiting to control excessive API usage and protect the backend from abusive traffic.

```text
Incoming Request
       ↓
Rate Limiter
       ↓
   Allowed?
    /    \
   No     Yes
   ↓       ↓
Reject   Process
```

---

## 🗄️ Database

NexusGate uses PostgreSQL with Prisma ORM.

The database stores information related to:

- Users
- API Keys
- API Requests
- Request Status
- Token Usage
- Response Time
- Selected Models
- Routes

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express.js
- REST API

### Database

- PostgreSQL
- Prisma ORM

### AI

- Google Gemini API

### Deployment

- Render
- GitHub

---

## 📁 Project Structure

```text
NexusGate/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   ├── config/
│   ├── middleware/
│   ├── services/
│   ├── app.js
│   └── server.js
│
├── prisma/
│   └── schema.prisma
│
├── docs/
│   └── screenshots/
│       ├── signup.png
│       ├── login.png
│       ├── dashboard.png
│       └── playground.png
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 💻 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/shivammishra27/NexusGate.git
```

### 2. Enter Project

```bash
cd NexusGate
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start Backend

```bash
npm start
```

Backend:

```text
http://localhost:3000
```

### 7. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔒 Security

Environment variables and secrets should never be committed to GitHub.

Use environment variables for:

```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_api_key
```

Never expose real credentials in source code.

---

## ☁️ Production Deployment

### Backend

```text
Node.js
   ↓
Express
   ↓
Render Web Service
```

### Frontend

```text
React + Vite
   ↓
Render Static Site
```

### Database

```text
PostgreSQL
```

### AI

```text
Google Gemini API
```

---

## 🎯 Project Goals

NexusGate demonstrates how an AI API Gateway can centralize:

- Authentication
- API Security
- Rate Limiting
- AI Model Routing
- Request Monitoring
- Usage Tracking
- AI Provider Integration

---

## 👨‍💻 Author

### Shivam Mishra

Final-year B.Tech Computer Science Engineering student.

GitHub:

https://github.com/shivammishra27/NexusGate

---

⭐ If you find NexusGate useful, consider starring the repository.