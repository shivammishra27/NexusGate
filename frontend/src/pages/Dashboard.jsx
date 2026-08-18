import { useEffect, useState } from "react";
import "../App.css";

function Dashboard({ apiKey, onLogout, onPlayground }) {
  const [stats, setStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    successRate: 0,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    averageResponseTime: 0,
    estimatedCost: 0
  });

  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Bearer ${apiKey}`
        };

        const [
          statsResponse,
          latestResponse,
          historyResponse
        ] = await Promise.all([
          fetch(
            "http://localhost:3000/api/dashboard/stats",
            {
              method: "GET",
              headers
            }
          ),

          fetch(
            "http://localhost:3000/api/dashboard/latest",
            {
              method: "GET",
              headers
            }
          ),

          fetch(
            "http://localhost:3000/api/dashboard/history",
            {
              method: "GET",
              headers
            }
          )
        ]);

        const statsData = await statsResponse.json();
        const latestData = await latestResponse.json();
        const historyData = await historyResponse.json();

        if (!statsResponse.ok) {
          setError(
            statsData.message ||
              "Unable to fetch dashboard stats."
          );
          return;
        }

        if (!latestResponse.ok) {
          setError(
            latestData.message ||
              "Unable to fetch latest request."
          );
          return;
        }

        if (!historyResponse.ok) {
          setError(
            historyData.message ||
              "Unable to fetch request history."
          );
          return;
        }

        setStats(statsData.stats);
        setLatest(latestData.request);
        setHistory(historyData.requests || []);

      } catch (error) {
        console.error(error);

        setError(
          "Unable to connect to NexusGate server."
        );
      } finally {
        setLoading(false);
      }
    }

    if (apiKey) {
      fetchDashboard();
    }
  }, [apiKey]);

  // ==========================================
  // FORMAT RESPONSE TIME
  // ==========================================

  const formatResponseTime = (milliseconds) => {
    if (!milliseconds) {
      return "0 ms";
    }

    if (milliseconds >= 1000) {
      return `${(milliseconds / 1000).toFixed(2)}s`;
    }

    return `${milliseconds} ms`;
  };

  // ==========================================
  // FORMAT MODEL NAME
  // ==========================================

  const getModelName = (model) => {
    if (!model) {
      return "No requests yet";
    }

    if (model.includes("flash-lite")) {
      return "Gemini 3.5 Flash-Lite";
    }

    if (model.includes("3.6-flash")) {
      return "Gemini 3.6 Flash";
    }

    return model;
  };

  // ==========================================
  // FORMAT ROUTE
  // ==========================================

  const getRouteName = (route) => {
    if (!route || route.toLowerCase() === "unknown") {
      return "Unknown";
    }

    if (route.toLowerCase() === "powerful") {
      return "Powerful";
    }

    if (route.toLowerCase() === "fast") {
      return "Fast";
    }

    return route;
  };

  // ==========================================
  // FORMAT STATUS
  // ==========================================

  const getStatusClass = (statusCode) => {
    if (
      statusCode >= 200 &&
      statusCode < 300
    ) {
      return "status-success";
    }

    return "status-failed";
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString();
  };

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

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center"
          }}
        >

          {/* PLAYGROUND */}

          <button
            className="dashboard-logout"
            onClick={onPlayground}
          >
            Playground
          </button>

          {/* LOGOUT */}

          <button
            className="dashboard-logout"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="dashboard-content">

        <div className="dashboard-heading">

          <h1>
            Dashboard
          </h1>

          <p>
            Manage your NexusGate API and monitor usage.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* ==========================================
            BASIC STATS
        ========================================== */}

        <div className="stats-grid">

          <div className="stat-card">

            <span>
              Total Requests
            </span>

            <strong>
              {loading
                ? "..."
                : stats.totalRequests}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Successful
            </span>

            <strong>
              {loading
                ? "..."
                : stats.successfulRequests}
            </strong>

          </div>

          <div className="stat-card">

            <span>
              Failed
            </span>

            <strong>
              {loading
                ? "..."
                : stats.failedRequests}
            </strong>

          </div>

        </div>

        {/* ==========================================
            USAGE ANALYTICS
        ========================================== */}

        <div className="analytics-section">

          <div className="analytics-header">

            <h2>
              Usage Analytics
            </h2>

            <p>
              Monitor your AI API usage and performance.
            </p>

          </div>

          <div className="analytics-grid">

            <div className="analytics-card">

              <span>
                Success Rate
              </span>

              <strong>
                {loading
                  ? "..."
                  : `${stats.successRate}%`}
              </strong>

            </div>

            <div className="analytics-card">

              <span>
                Total Tokens
              </span>

              <strong>
                {loading
                  ? "..."
                  : stats.totalTokens.toLocaleString()}
              </strong>

            </div>

            <div className="analytics-card">

              <span>
                Input Tokens
              </span>

              <strong>
                {loading
                  ? "..."
                  : stats.inputTokens.toLocaleString()}
              </strong>

            </div>

            <div className="analytics-card">

              <span>
                Output Tokens
              </span>

              <strong>
                {loading
                  ? "..."
                  : stats.outputTokens.toLocaleString()}
              </strong>

            </div>

            <div className="analytics-card">

              <span>
                Avg Response Time
              </span>

              <strong>
                {loading
                  ? "..."
                  : formatResponseTime(
                      stats.averageResponseTime
                    )}
              </strong>

            </div>

            <div className="analytics-card">

              <span>
                Estimated Cost
              </span>

              <strong>
                {loading
                  ? "..."
                  : `$${Number(
                      stats.estimatedCost
                    ).toFixed(4)}`}
              </strong>

            </div>

          </div>

        </div>

        {/* ==========================================
            LATEST AI REQUEST
        ========================================== */}

        <div className="api-dashboard-card">

          <div>

            <h2>
              Latest AI Request
            </h2>

            <p>
              See which model and route NexusGate
              selected for your latest request.
            </p>

          </div>

          {latest ? (

            <div className="model-display">

              <div>

                <span>
                  AI Model
                </span>

                <code>
                  {getModelName(latest.model)}
                </code>

              </div>

              <div>

                <span>
                  Route
                </span>

                <code>
                  {getRouteName(latest.route)}
                </code>

              </div>

              <div>

                <span>
                  Response Time
                </span>

                <code>
                  {formatResponseTime(
                    latest.responseTime
                  )}
                </code>

              </div>

              <div>

                <span>
                  Total Tokens
                </span>

                <code>
                  {Number(
                    latest.totalTokens || 0
                  ).toLocaleString()}
                </code>

              </div>

            </div>

          ) : (

            <div className="model-display">

              <span>
                No AI requests yet
              </span>

            </div>

          )}

        </div>

        {/* ==========================================
            REQUEST HISTORY
        ========================================== */}

        <div className="api-dashboard-card">

          <div>

            <h2>
              Request History
            </h2>

            <p>
              View your latest NexusGate API requests.
            </p>

          </div>

          {loading ? (

            <div className="history-empty">
              Loading request history...
            </div>

          ) : history.length > 0 ? (

            <div className="history-table-wrapper">

              <table className="history-table">

                <thead>

                  <tr>

                    <th>
                      Model
                    </th>

                    <th>
                      Route
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Response
                    </th>

                    <th>
                      Tokens
                    </th>

                    <th>
                      Time
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {history.map((request) => (

                    <tr key={request.id}>

                      <td>
                        {getModelName(
                          request.model
                        )}
                      </td>

                      <td>

                        <span className="route-badge">
                          {getRouteName(
                            request.route
                          )}
                        </span>

                      </td>

                      <td>

                        <span
                          className={getStatusClass(
                            request.statusCode
                          )}
                        >
                          {request.statusCode}
                        </span>

                      </td>

                      <td>
                        {formatResponseTime(
                          request.responseTime
                        )}
                      </td>

                      <td>
                        {Number(
                          request.totalTokens || 0
                        ).toLocaleString()}
                      </td>

                      <td>
                        {formatDate(
                          request.createdAt
                        )}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="history-empty">
              No API requests yet.
            </div>

          )}

        </div>

        {/* ==========================================
            API KEY
        ========================================== */}

        <div className="api-dashboard-card">

          <div>

            <h2>
              API Key
            </h2>

            <p>
              Use this key to authenticate your
              NexusGate API requests.
            </p>

          </div>

          <div className="api-key-display">

            <code>
              {apiKey}
            </code>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  apiKey
                );
              }}
            >
              Copy
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;