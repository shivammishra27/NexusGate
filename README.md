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
                  │  AI Router      │
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