"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || ""; // Fallback to an empty string if email is null

  const [name, setName] = useState(""); // Placeholder for user name
  const [role, setRole] = useState(""); // Placeholder for user role
  const [password, setPassword] = useState(""); // Controlled input
  const [confirmPassword, setConfirmPassword] = useState(""); // Controlled input
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch user details based on the email
    const fetchUserDetails = async () => {
      if (!email) {
        setErrorMessage("Email is required to reset the password.");
        return;
      }

      try {
        const response = await fetch(`/api/user-details?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setName(data.data.name || ""); // Ensure name is always a string
          setRole(data.data.role || ""); // Ensure role is always a string
        } else {
          const error = await response.json();
          setErrorMessage(error.message || "Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error during request:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/login"); // Redirect to login page on success
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Reset Password</h1>
          <form onSubmit={handleSubmit} className="box">
            {errorMessage && (
              <div className="notification is-danger">
                <button
                  className="delete"
                  onClick={() => setErrorMessage("")}
                ></button>
                {errorMessage}
              </div>
            )}
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name || ""} // Ensure value is always a string
                  readOnly
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  value={email || ""} // Ensure value is always a string
                  readOnly
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Role</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={role || ""} // Ensure value is always a string
                  readOnly
                />
              </div>
            </div>
            <div className="field">
              <label className="label">New Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your new password"
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Confirm New Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword} // Controlled input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
