import { useState } from "react";
import "../App.css";

function Signup({ onSignupSuccess, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Unable to create account."
        );
        return;
      }

      // Keep API key for the current integration flow
      localStorage.setItem(
        "nexusgate_api_key",
        data.user.apiKey
      );

      // Go back to login after successful signup
      if (onSignupSuccess) {
        onSignupSuccess();
      }

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to NexusGate server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* LOGO */}

        <div className="auth-logo">
          <span className="logo-mark">N</span>
          <span>NexusGate</span>
        </div>

        {/* HEADING */}

        <div className="auth-heading">

          <h1>
            Create your account
          </h1>

          <p>
            Start building with NexusGate's AI gateway.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          className="auth-form"
          onSubmit={handleSignup}
        >

          {/* NAME */}

          <div className="form-group">

            <label>
              Full name
            </label>

            <input
              type="text"
              placeholder="Shivam Mishra"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}

            {!loading && (
              <span>→</span>
            )}
          </button>

        </form>

        {/* LOGIN */}

        <p className="auth-footer">

          Already have an account?

          <button
            type="button"
            onClick={onLogin}
          >
            Log in
          </button>

        </p>

      </div>

    </div>
  );
}

export default Signup;