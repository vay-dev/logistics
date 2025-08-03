import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const url = "https://electronic-gertrudis-chanel-debb-bad97784.koyeb.app";
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // You can connect this to your theme context
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email,
      password,
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
      navigate("/user/");
      toast.success("Login successfully!");
    } catch (error) {
      setError(error.message || "An error occurred Logging in");
      toast.error(error.message || "An error occurred while Logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`login-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      <div className="container-fluid">
        <div className="row w-100">
          {/* Left Side - Welcome */}
          <div
            id="first-content"
            className={`col-lg-6 ${isVisible ? "slide-in-left" : ""}`}
          >
            <div className="content-con">
              <div className="top-right-nav">
                <Link to="/" className="back-home-link">
                  <i className="fas fa-home"></i> Home
                </Link>
              </div>
              <div className="text-con">
                <div className="logo-animation">
                  <div className="logo-icon">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                </div>
                <h1 className="welcome-title">
                  Welcome Back To Ship<span className="highlight">Up</span>
                </h1>
                <p className="welcome-subtitle">
                  Your logistics partner for seamless shipping solutions
                </p>

                {/* Animated Stats */}
                <div className="stats-container">
                  <div className="stat-item">
                    <div className="stat-number" data-count="1000">
                      0
                    </div>
                    <div className="stat-label">Happy Clients</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number" data-count="50">
                      0
                    </div>
                    <div className="stat-label">Countries</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number" data-count="24">
                      0
                    </div>
                    <div className="stat-label">Support Hours</div>
                  </div>
                </div>

                {/* Theme Toggle */}
                <div className="theme-toggle">
                  <button
                    className="theme-btn"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                  >
                    <i
                      className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            id="second-container"
            className={`col-lg-6 ${isVisible ? "slide-in-right" : ""}`}
          >
            <div className="content-con">
              <form className="form glass-effect" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h1 className="form-title">Login</h1>
                  <p className="side-text">Login to your account in seconds</p>
                </div>

                {error && (
                  <div className="error-message shake-animation">
                    <i className="fas fa-exclamation-triangle"></i>
                    {error}
                  </div>
                )}

                <div className="input-wrapper">
                  <div className="input-group">
                    <div className="input-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="animated-input"
                      required
                    />
                    <div className="input-highlight"></div>
                  </div>

                  <div className="input-group">
                    <div className="input-icon">
                      <i className="fas fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="animated-input"
                      required
                    />
                    <div className="input-highlight"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn btn-filled animated-btn ${
                    loading ? "loading" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <i className="fas fa-arrow-right"></i>
                    </>
                  )}
                </button>

                <div className="divider">
                  <span>or continue with</span>
                </div>

                <div className="social-login">
                  <button type="button" className="social-btn google-btn">
                    <i className="fab fa-google"></i>
                  </button>
                  <button type="button" className="social-btn facebook-btn">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button type="button" className="social-btn twitter-btn">
                    <i className="fab fa-twitter"></i>
                  </button>
                </div>

                <p className="side-text">
                  Don't have an account?
                  <span>
                    <Link to="/signup" className="signup-link">
                      Sign up
                      <span className="link-underline"></span>
                    </Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effect */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Login;
