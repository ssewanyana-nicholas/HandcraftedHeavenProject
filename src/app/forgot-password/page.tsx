"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Redirect to reset password page with the email as a query parameter
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setMessage("Failed to send password reset instructions.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("An unexpected error occurred. Please try again.");
<<<<<<< HEAD
=======
      console.error("Error in forgot password API:", error);
    } finally {
      setIsSubmitting(false);
>>>>>>> f598412ddc46164554d3dc5b20f22126a1b2c7a8
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Forgot Password</h1>
          <form onSubmit={handleSubmit} className="box">
            {message && <p className="notification is-info">{message}</p>}
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <button
                className={`button is-primary is-fullwidth ${
                  isSubmitting ? "is-loading" : ""
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                Send Reset Instructions
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
