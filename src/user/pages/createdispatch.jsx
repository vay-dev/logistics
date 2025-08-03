import { useState, useEffect } from "react";
import {
  Package,
  User,
  MapPin,
  Phone,
  Calendar,
  Scale,
  FileText,
  StickyNote,
} from "lucide-react";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const AddDispatch = () => {
  const [unAuth, setUnAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipient_id: "",
    content: "",
    weight: "",
    note: "",
    delievery_date: "",
    new_recipient: {
      full_name: "",
      address: "",
      phone_number_1: "",
      phone_number_2: "",
    },
  });

  const url =
    "https://electronic-gertrudis-chanel-debb-bad97784.koyeb.app/dispatches";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      setUnAuth(true);
    } else {
      setUnAuth(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("new_recipient.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        new_recipient: {
          ...prev.new_recipient,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const submitData = {
      recipient_id: formData.recipient_id,
      content: formData.content,
      weight: parseFloat(formData.weight) || 0,
      note: formData.note,
      delievery_date: formData.delievery_date,
      new_recipient: {
        full_name: formData.new_recipient.full_name,
        address: formData.new_recipient.address,
        phone_number_1: formData.new_recipient.phone_number_1,
        phone_number_2: formData.new_recipient.phone_number_2,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create dispatch");
      }
      const data = await response.json();

      toast.success("Dispatch created successfully!");

      // Reset form
      setFormData({
        recipient_id: "",
        content: "",
        weight: "",
        note: "",
        delievery_date: "",
        new_recipient: {
          full_name: "",
          address: "",
          phone_number_1: "",
          phone_number_2: "",
        },
      });
    } catch (error) {
      toast.error(error.message || "An error occurred while creating dispatch");
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  if (unAuth) {
    return (
      <div className="dispatches-container">
        <div className="dispatches-header">
          <div className="header-content">
            <h1 className="header-title">Add Dispatch</h1>
            <div className="header-subtitle">Dashboard</div>
          </div>
        </div>

        <div className="auth-wrapper">
          <div className="auth-container">
            <div className="auth-header">
              <div className="auth-icon">
                <Package size={24} />
              </div>
              <h2 className="auth-title">Access Required</h2>
              <p className="auth-description">
                Please sign in to create a new dispatch
              </p>
            </div>
            <div className="login-form">
              <div className="form-submit">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/login")}
                  className="submit-button"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dispatches-container">
      <div className="dispatches-header">
        <div className="header-content">
          <h1 className="header-title">Add Dispatch</h1>
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
            <h2>Create New Dispatch</h2>
            <span className="dispatch-count">Fill in the details below</span>
          </div>
          <button onClick={() => window.history.back()} className="refresh-btn">
            Back
          </button>
        </div>

        <div className="add-dispatch-form">
          <div onSubmit={handleSubmit}>
            {/* Dispatch Details Section */}
            <div className="form-section">
              <div className="section-header">
                <Package size={20} />
                <h3>Dispatch Details</h3>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="recipient_id" className="field-label">
                    Recipient ID
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <User size={20} />
                    </div>
                    <input
                      id="recipient_id"
                      name="recipient_id"
                      type="text"
                      required
                      className="form-input"
                      placeholder="Enter recipient ID"
                      value={formData.recipient_id}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="weight" className="field-label">
                    Weight (kg)
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Scale size={20} />
                    </div>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      className="form-input"
                      placeholder="Enter weight in kg"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="delievery_date" className="field-label">
                    Delivery Date
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Calendar size={20} />
                    </div>
                    <input
                      id="delievery_date"
                      name="delievery_date"
                      type="date"
                      min={today}
                      required
                      className="form-input"
                      value={formData.delievery_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="content" className="field-label">
                  Content Description
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <FileText size={20} />
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    required
                    className="form-textarea"
                    placeholder="Describe the contents of this dispatch"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="note" className="field-label">
                  Additional Notes (Optional)
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <StickyNote size={20} />
                  </div>
                  <textarea
                    id="note"
                    name="note"
                    className="form-textarea"
                    placeholder="Any additional notes or special instructions"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* New Recipient Section */}
            <div className="form-section">
              <div className="section-header">
                <User size={20} />
                <h3>New Recipient Information</h3>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label
                    htmlFor="new_recipient.full_name"
                    className="field-label"
                  >
                    Full Name
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <User size={20} />
                    </div>
                    <input
                      id="new_recipient.full_name"
                      name="new_recipient.full_name"
                      type="text"
                      required
                      className="form-input"
                      placeholder="Enter recipient's full name"
                      value={formData.new_recipient.full_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="new_recipient.address" className="field-label">
                  Address
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <MapPin size={20} />
                  </div>
                  <textarea
                    id="new_recipient.address"
                    name="new_recipient.address"
                    required
                    className="form-textarea"
                    placeholder="Enter full delivery address"
                    value={formData.new_recipient.address}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label
                    htmlFor="new_recipient.phone_number_1"
                    className="field-label"
                  >
                    Primary Phone Number
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Phone size={20} />
                    </div>
                    <input
                      id="new_recipient.phone_number_1"
                      name="new_recipient.phone_number_1"
                      type="tel"
                      required
                      className="form-input"
                      placeholder="Enter primary phone number"
                      value={formData.new_recipient.phone_number_1}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label
                    htmlFor="new_recipient.phone_number_2"
                    className="field-label"
                  >
                    Secondary Phone Number (Optional)
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Phone size={20} />
                    </div>
                    <input
                      id="new_recipient.phone_number_2"
                      name="new_recipient.phone_number_2"
                      type="tel"
                      className="form-input"
                      placeholder="Enter secondary phone number"
                      value={formData.new_recipient.phone_number_2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`submit-button ${isLoading ? "loading" : ""}`}
              >
                {isLoading ? (
                  <div className="loading-content">
                    <FaSpinner className="spin" />
                    Creating Dispatch...
                  </div>
                ) : (
                  "Create Dispatch"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDispatch;
