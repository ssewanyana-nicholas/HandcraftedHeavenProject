"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Log the payload for debugging
      console.log("Sending payload:", { email: username, password });

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        router.push("/products"); // Redirect to products page on success
      } else {
        const data = await response.json();
        console.error("Login failed:", data);
        setErrorMessage(data.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero is-medium is-light">
      <div className="hero-body has-text-centered">
        <div className="container">
          {/* Title and Subtitle */}
          <h1 className="title is-3">Welcome To Handcrafted Haven</h1>
          <p className="subtitle">
            Our Partners only sell the highest hand crafted goods on our site.
          </p>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="field is-grouped is-grouped-centered mt-5"
          >
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="control">
              <div className="field has-addons">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="button is-light"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="control">
              <button
                className={`button is-dark ${isSubmitting ? "is-loading" : ""}`}
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <p className="help is-danger mt-3">{errorMessage}</p>
          )}

          {/* Links for Registration and Password Reset */}
          <p className="mt-4">
            <a href="/register" className="has-text-dark">
              Don&apos;t have an account? Register here.
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="has-text-dark">
              Forgot your password? Reset it here.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
