import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/signup.scss";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const url = "https://electronic-gertrudis-chanel-debb-bad97784.koyeb.app";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please agree to the terms and privacy policy");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/auth/register`, {
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

      toast.success("Account created successfully!");
    } catch (error) {
      setError(
        error.message || "An error occurred while creating your account"
      );
      toast.error(
        error.message || "An error occurred while creating your account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`signup-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
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
                    <i className="fas fa-user-plus"></i>
                  </div>
                </div>
                <h1 className="welcome-title">
                  Join Ship<span className="highlight">Up</span> Today
                </h1>
                <p className="welcome-subtitle">
                  Start your journey with our comprehensive logistics solutions
                </p>

                {/* Features List */}
                <div className="features-container">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-check"></i>
                    </div>
                    <span>Free account setup</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-check"></i>
                    </div>
                    <span>24/7 customer support</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-check"></i>
                    </div>
                    <span>Global shipping network</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-check"></i>
                    </div>
                    <span>Real-time tracking</span>
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
                  <h1 className="form-title">Sign in</h1>
                  <span className="side-text">
                    Create your account in a seconds
                  </span>
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
                      <i className="fas fa-user"></i>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name:"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="animated-input"
                      required
                    />
                    <div className="input-highlight"></div>
                  </div>

                  <div className="input-group">
                    <div className="input-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name:"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="animated-input"
                      required
                    />
                    <div className="input-highlight"></div>
                  </div>

                  <div className="input-group">
                    <div className="input-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address:"
                      value={formData.email}
                      onChange={handleInputChange}
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
                      name="password"
                      placeholder="Create Password:"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="animated-input"
                      required
                    />
                    <div className="input-highlight"></div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                      I agree to the{" "}
                      <Link to="/terms">terms and privacy policy</Link>
                    </span>
                  </label>
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      <span>Create an account</span>
                      <i className="fas fa-arrow-right"></i>
                    </>
                  )}
                </button>

                <p className="side-text">
                  Already a member?
                  <span>
                    <Link to="/login" className="login-link">
                      Login
                      <div className="link-underline"></div>
                    </Link>
                  </span>
                </p>

                <div className="divider">
                  <span>Or continue with</span>
                </div>

                <div className="social-login">
                  <button type="button" className="social-btn google-btn">
                    <i className="fab fa-google"></i>
                    <span>Google</span>
                  </button>
                  <button type="button" className="social-btn facebook-btn">
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </button>
                  <button type="button" className="social-btn instagram-btn">
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </button>
                  <button type="button" className="social-btn twitter-btn">
                    <i className="fab fa-twitter"></i>
                    <span>Twitter</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effect */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Signup;
