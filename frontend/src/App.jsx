import Playground from "./pages/Playground";
import { useState } from "react";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function Home({ onLogin, onSignup }) {
  return (
    <div className="app">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <nav className="navbar">

        <div className="logo">

          <span className="logo-mark">
            N
          </span>

          <span>
            NexusGate
          </span>

        </div>

        <div className="nav-links">

          <a href="#features">
            Features
          </a>

          <a href="#developers">
            Developers
          </a>

          <a href="#how-it-works">
            How it works
          </a>

        </div>

        <div className="nav-actions">

          <button
            className="login-btn"
            onClick={onLogin}
          >
            Log in
          </button>

          <button
            className="nav-cta"
            onClick={onSignup}
          >
            Get Started
          </button>

        </div>

      </nav>

      <main>

        {/* ==========================================
            HERO
        ========================================== */}

        <section className="hero">

          <div className="hero-content">

            <div className="badge">

              <span className="status-dot"></span>

              AI infrastructure for developers

            </div>

            <h1>

              One API.

              <br />

              <span>
                Every AI request.
              </span>

            </h1>

            <p className="hero-description">
              NexusGate gives developers one secure gateway
              for AI APIs with authentication, rate limiting,
              request tracking, usage analytics and smart
              model routing.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={onSignup}
              >
                Get Started
                <span>→</span>
              </button>

              <a
                className="secondary-btn"
                href="#features"
              >
                Explore Features
              </a>

            </div>

            <div className="hero-note">

              <span>✓</span>
              Secure API access

              <span>✓</span>
              Usage analytics

              <span>✓</span>
              Smart model routing

            </div>

          </div>

          {/* CODE CARD */}

          <div className="code-wrapper">

            <div className="glow"></div>

            <div className="code-card">

              <div className="code-header">

                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="code-title">
                  POST /api/generate
                </div>

                <div className="secure">
                  🔒 secure
                </div>

              </div>

              <div className="code-body">

                <div className="line">
                  <span className="number">01</span>
                  <span className="purple">const</span>{" "}
                  <span className="white">response</span>{" "}
                  <span className="purple">=</span>
                </div>

                <div className="line indent">
                  <span className="white">await</span>{" "}
                  <span className="blue">fetch</span>
                  <span className="white">(</span>
                </div>

                <div className="line more-indent">
                  <span className="green">
                    '/api/generate'
                  </span>
                  <span className="white">, {"{"}</span>
                </div>

                <div className="line more-indent">
                  <span className="white">method:</span>{" "}
                  <span className="green">'POST'</span>
                  <span className="white">,</span>
                </div>

                <div className="line more-indent">
                  <span className="white">headers:</span>{" "}
                  <span className="white">{"{"}</span>
                </div>

                <div className="line extra-indent">
                  <span className="green">
                    'Authorization'
                  </span>
                  <span className="white">:</span>
                </div>

                <div className="line extra-indent">
                  <span className="green">
                    'Bearer ng_live_••••'
                  </span>
                </div>

                <div className="line more-indent">
                  <span className="white">{"}"}</span>
                </div>

                <div className="line more-indent">
                  <span className="white">{"}"}</span>
                </div>

                <div className="line indent">
                  <span className="white">{"});"}</span>
                </div>

                <div className="response">

                  <div className="response-title">
                    <span>✓</span>
                    Response 200
                  </div>

                  <pre>{`{
  "success": true,
  "model": "gemini-3.5-flash-lite",
  "route": "fast",
  "totalTokens": 21
}`}</pre>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
            FEATURES
        ========================================== */}

        <section
          className="features"
          id="features"
        >

          <div className="section-heading">

            <span>
              WHY NEXUSGATE
            </span>

            <h2>
              Everything between your app and AI.
            </h2>

            <p>
              Keep your application simple while NexusGate
              handles the infrastructure around your AI requests.
            </p>

          </div>

          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">
                🔐
              </div>

              <h3>
                Secure Authentication
              </h3>

              <p>
                Protect AI endpoints with API keys and
                controlled developer access.
              </p>

            </div>

            <div className="feature-card">

              <div className="feature-icon">
                ⚡
              </div>

              <h3>
                Rate Limiting
              </h3>

              <p>
                Control request traffic and prevent API
                abuse with configurable request limits.
              </p>

            </div>

            <div className="feature-card">

              <div className="feature-icon">
                📊
              </div>

              <h3>
                Usage Analytics
              </h3>

              <p>
                Track requests, tokens, response time,
                success rates and usage history.
              </p>

            </div>

            <div className="feature-card">

              <div className="feature-icon">
                🧠
              </div>

              <h3>
                Smart Model Routing
              </h3>

              <p>
                Route simple and complex requests to
                different AI models automatically.
              </p>

            </div>

          </div>

        </section>

        {/* ==========================================
            HOW IT WORKS
        ========================================== */}

        <section
          className="features"
          id="how-it-works"
        >

          <div className="section-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              One simple request. Full control.
            </h2>

            <p>
              NexusGate sits between your application
              and AI providers.
            </p>

          </div>

          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">
                01
              </div>

              <h3>
                Authenticate
              </h3>

              <p>
                Your application sends a request with
                a NexusGate API key.
              </p>

            </div>

            <div className="feature-card">

              <div className="feature-icon">
                02
              </div>

              <h3>
                Route
              </h3>

              <p>
                NexusGate applies rate limits and selects
                an appropriate AI model.
              </p>

            </div>

            <div className="feature-card">

              <div className="feature-icon">
                03
              </div>

              <h3>
                Generate
              </h3>

              <p>
                The selected AI model processes the
                request and returns the response.
              </p>

            </div>

            <div className="feature-card">

              <div className="feature-icon">
                04
              </div>

              <h3>
                Analyze
              </h3>

              <p>
                NexusGate records tokens, response time,
                status and request history.
              </p>

            </div>

          </div>

        </section>

        {/* ==========================================
            CTA
        ========================================== */}

        <section
          className="bottom-cta"
          id="developers"
        >

          <div>

            <span className="section-heading-small">
              START BUILDING
            </span>

            <h2>
              Put one secure gateway between your app and AI.
            </h2>

          </div>

          <button
            className="primary-btn"
            onClick={onSignup}
          >
            Create your account
            <span>→</span>
          </button>

        </section>

      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer>

        <div className="logo">

          <span className="logo-mark">
            N
          </span>

          <span>
            NexusGate
          </span>

        </div>

        <p>
          AI infrastructure for modern developers.
        </p>

        <span className="copyright">
          © 2026 NexusGate
        </span>

      </footer>

    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  // ==========================================
  // LOGIN SUCCESS
  // ==========================================

  function handleLogin(userData) {
    setUser(userData);

    localStorage.setItem(
      "nexusgate_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "nexusgate_api_key",
      userData.apiKey
    );

    setPage("dashboard");
  }

  // ==========================================
  // SIGNUP SUCCESS
  // ==========================================

  function handleSignupSuccess() {
    setPage("login");
  }

  // ==========================================
  // LOGOUT
  // ==========================================

  function handleLogout() {
    localStorage.removeItem("nexusgate_user");
    localStorage.removeItem("nexusgate_api_key");

    setUser(null);
    setPage("home");
  }

  // ==========================================
  // OPEN PLAYGROUND
  // ==========================================

  function handlePlayground() {
    setPage("playground");
  }

  // ==========================================
  // HOME
  // ==========================================

  if (page === "home") {
    return (
      <Home
        onLogin={() => setPage("login")}
        onSignup={() => setPage("signup")}
      />
    );
  }

  // ==========================================
  // LOGIN
  // ==========================================

  if (page === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onSignup={() => setPage("signup")}
      />
    );
  }

  // ==========================================
  // SIGNUP
  // ==========================================

  if (page === "signup") {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onLogin={() => setPage("login")}
      />
    );
  }

  // ==========================================
  // PLAYGROUND
  // ==========================================

  if (page === "playground" && user) {
    return (
      <Playground
        apiKey={user.apiKey}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  if (page === "dashboard" && user) {
    return (
      <Dashboard
        apiKey={user.apiKey}
        onLogout={handleLogout}
        onPlayground={handlePlayground}
      />
    );
  }

  // ==========================================
  // FALLBACK
  // ==========================================

  return (
    <Home
      onLogin={() => setPage("login")}
      onSignup={() => setPage("signup")}
    />
  );
}

export default App;