import { useState, useEffect } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import "./styles/dispatchlist.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const Dispatches = () => {
  const [unAuth, setUnAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dispatchError, setDispatchError] = useState(null);
  const [dispatches, setDispatches] = useState([]);
  const [gettingDispatches, setGettingDispatches] = useState(false);
  const url = "https://electronic-gertrudis-chanel-debb-bad97784.koyeb.app";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    // Note: In a real app, you'd use secure storage instead of localStorage
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      setUnAuth(true);
    } else {
      setUnAuth(false);
      getDispatches();
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);

    const formData = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }
      const data = await response.json();
      localStorage.setItem("token", data.access_token);

      toast.success("Login successfully!");
      checkAuth;
    } catch (error) {
      setError(error.message || "An error occurred Logging in");
      toast.error(error.message || "An error occurred while Logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const getDispatches = async () => {
    if (unAuth) {
      return;
    }

    setGettingDispatches(true);
    try {
      const response = await fetch(`${url}/dispatches`);

      if (!response.ok)
        throw new Error("Couldn't fetch dispatches. Try again later.");

      const data = await response.json();
      setDispatches(data);
      toast.success("Fetched Dispatches");
    } catch (error) {
      toast.error(
        error.message || "Couldn't Fetch Dispatches Please try again later"
      );
      setDispatchError(
        error.message || "Couldn't Fetch Dispatches Please try again later"
      );
    } finally {
      setGettingDispatches(false);
    }
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // IF GETTING DISPATCHES
  if (gettingDispatches) {
    return (
      <div className="dispatch-loader">
        <FaSpinner className="faspinner spin mx-auto" />
        <p>getting dispatches</p>
      </div>
    );
  }

  // IF NOT LOGGED IN CONTENT
  if (unAuth) {
    return (
      <div className="dispatches-container">
        {/* Header */}
        <div className="dispatches-header">
          <div className="header-content">
            <h1 className="header-title">Dispatches</h1>
            <div className="header-subtitle">Dashboard</div>
          </div>
        </div>

        <div className="auth-wrapper">
          <div className="auth-container">
            {/* Icon and Header */}
            <div className="auth-header">
              <div className="auth-icon">
                <Lock size={24} />
              </div>
              <h2 className="auth-title">Access Required</h2>
              <p className="auth-description">
                Sign in to view dispatch updates and notifications
              </p>
            </div>

            {/* Login Form */}
            <div className="login-form">
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="email" className="field-label">
                    Email address
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Mail size={20} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="form-input"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="password" className="field-label">
                    Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="form-input password-input"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="checkbox"
                  />
                  <label htmlFor="remember-me" className="checkbox-label">
                    Remember me
                  </label>
                </div>

                <div className="forgot-password">
                  <a href="#" className="link">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="form-submit">
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className={`submit-button ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? (
                    <div className="loading-content">
                      <div className="spinner"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <div className="signup-link">
                <span className="signup-text">
                  Don't have an account?{" "}
                  <Link to={"/signup"} className="link">
                    Sign up here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // END OF NOT LOGGED IN CONTENT

  // AUTHENTICATED VIEW
  return (
    <div className="dispatches-container">
      <div className="dispatches-header">
        <div className="header-content">
          <h1 className="header-title">Dispatches</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("token");
              localStorage.removeItem("token");
              setUnAuth(true);
            }}
            className="signout-button"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="dispatches-content">
        <div className="content-header">
          <div className="content-title">
            <h2>Your Dispatches</h2>
            <span className="dispatch-count">
              {dispatches.length} dispatch{dispatches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <button className="refresh-btn" onClick={getDispatches}>
            Refresh
          </button>
        </div>

        {dispatchError ? (
          <div className="error-state">
            <div className="error-content">
              <h3>Unable to load dispatches</h3>
              <p>{dispatchError}</p>
              <button onClick={getDispatches} className="retry-btn">
                Try Again
              </button>
            </div>
          </div>
        ) : dispatches.length === 0 ? (
          <div className="empty-state">
            <div className="empty-content">
              <h3>No dispatches found</h3>
              <p>You don't have any dispatches yet.</p>
            </div>
          </div>
        ) : (
          <div className="dispatches-list">
            {dispatches.map((dispatch) => (
              <div key={dispatch.id} className="dispatch-card">
                <div className="dispatch-header">
                  <div className="dispatch-code">
                    <span className="code-label">Code:</span>
                    <span className="code-value">{dispatch.code}</span>
                  </div>
                  <div
                    className={`status-badge status-${dispatch.status.toLowerCase()}`}
                  >
                    {dispatch.status}
                  </div>
                </div>

                <div className="dispatch-content">
                  <div className="content-text">
                    <strong>Content:</strong> {dispatch.content}
                  </div>
                  {dispatch.note && dispatch.note !== "string" && (
                    <div className="note-text">
                      <strong>Note:</strong> {dispatch.note}
                    </div>
                  )}
                </div>

                <div className="dispatch-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">Delivery Date:</span>
                      <span className="detail-value">
                        {new Date(dispatch.delievery_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Weight:</span>
                      <span className="detail-value">{dispatch.weight} kg</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">
                        {new Date(dispatch.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Updated:</span>
                      <span className="detail-value">
                        {new Date(dispatch.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="dispatch-ids">
                  <div className="id-item">
                    <span className="id-label">Sender ID:</span>
                    <span className="id-value">
                      {dispatch.sender_id.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="id-item">
                    <span className="id-label">Recipient ID:</span>
                    <span className="id-value">
                      {dispatch.recipient_id.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dispatches;
