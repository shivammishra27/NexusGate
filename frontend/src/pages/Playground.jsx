import { useState } from "react";
import "../App.css";

function Playground({ apiKey, onBack }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("");
  const [route, setRoute] = useState("");
  const [tokens, setTokens] = useState(0);
  const [responseTime, setResponseTime] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // SEND REQUEST
  // ==========================================

  async function handleGenerate() {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResponse("");

      const result = await fetch(
        "https://nexusgate-api-cr5w.onrender.com/api/generate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },

          body: JSON.stringify({
            prompt: prompt
          })
        }
      );

      const data = await result.json();

      if (!result.ok) {
        setError(
          data.message || "Request failed."
        );
        return;
      }

      setResponse(data.response || "");
      setModel(data.model || "Unknown");
      setRoute(data.route || "Unknown");

      setTokens(
        data.usage?.totalTokens || 0
      );

      setResponseTime(
        data.responseTime || 0
      );

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to NexusGate server."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // CLEAR
  // ==========================================

  function handleClear() {
    setPrompt("");
    setResponse("");
    setModel("");
    setRoute("");
    setTokens(0);
    setResponseTime(0);
    setError("");
  }

  // ==========================================
  // FORMAT MODEL
  // ==========================================

  function getModelName(modelName) {
    if (!modelName) {
      return "Unknown";
    }

    if (modelName.includes("flash-lite")) {
      return "Gemini 3.5 Flash-Lite";
    }

    if (modelName.includes("3.6-flash")) {
      return "Gemini 3.6 Flash";
    }

    return modelName;
  }

  // ==========================================
  // FORMAT RESPONSE TIME
  // ==========================================

  function formatResponseTime(milliseconds) {
    if (!milliseconds) {
      return "0 ms";
    }

    if (milliseconds >= 1000) {
      return `${(milliseconds / 1000).toFixed(2)}s`;
    }

    return `${milliseconds} ms`;
  }

  return (
    <div className="dashboard-page">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="dashboard-header">

        <div className="auth-logo">

          <span className="logo-mark">
            N
          </span>

          <span>
            NexusGate
          </span>

        </div>

        <button
          className="dashboard-logout"
          onClick={onBack}
        >
          ← Dashboard
        </button>

      </div>

      {/* ==========================================
          PLAYGROUND
      ========================================== */}

      <div className="playground-container">

        <div className="dashboard-heading">

          <h1>
            Playground
          </h1>

          <p>
            Test your NexusGate AI API directly from
            the dashboard.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* ==========================================
            PROMPT CARD
        ========================================== */}

        <div className="playground-card">

          <div className="playground-card-header">

            <div>

              <h2>
                Send AI Request
              </h2>

              <p>
                Enter a prompt and NexusGate will
                automatically select the appropriate model.
              </p>

            </div>

            <span className="playground-status">
              API Connected
            </span>

          </div>

          <label>
            Prompt
          </label>

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Explain API gateway in simple words..."
            rows={7}
          />

          <div className="playground-actions">

            <button
              className="auth-submit"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Send Request"}
            </button>

            {(prompt || response) && (
              <button
                className="playground-clear"
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </button>
            )}

          </div>

        </div>

        {/* ==========================================
            RESPONSE
        ========================================== */}

        {response && (

          <div className="playground-card">

            <div className="playground-card-header">

              <div>

                <h2>
                  Response
                </h2>

                <p>
                  Response generated through NexusGate.
                </p>

              </div>

              <span className="response-success">
                200 OK
              </span>

            </div>

            <div className="playground-response">
              {response}
            </div>

            {/* METRICS */}

            <div className="playground-meta">

              <div>

                <span>
                  Model
                </span>

                <strong>
                  {getModelName(model)}
                </strong>

              </div>

              <div>

                <span>
                  Route
                </span>

                <strong>
                  {route === "powerful"
                    ? "Powerful"
                    : route === "fast"
                    ? "Fast"
                    : "Unknown"}
                </strong>

              </div>

              <div>

                <span>
                  Tokens
                </span>

                <strong>
                  {tokens.toLocaleString()}
                </strong>

              </div>

              <div>

                <span>
                  Response Time
                </span>

                <strong>
                  {formatResponseTime(
                    responseTime
                  )}
                </strong>

              </div>

            </div>

          </div>

        )}

        {/* ==========================================
            API INFO
        ========================================== */}

        <div className="api-dashboard-card">

          <div>

            <h2>
              Endpoint
            </h2>

            <p>
              NexusGate uses a single endpoint for
              AI generation.
            </p>

          </div>

          <div className="api-key-display">

            <code>
              POST /api/generate
            </code>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Playground;