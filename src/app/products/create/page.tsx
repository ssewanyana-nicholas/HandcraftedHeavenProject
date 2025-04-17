"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import jwt from "jsonwebtoken"; // Import jsonwebtoken for decoding the token

export default function CreateProductPage() {
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [user_id, setUserId] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(5); // Countdown timer for redirect

  useEffect(() => {
    // Decode the token to get the user ID
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as { id: number };
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    // Redirect to login page if no token is detected
    if (user_id === null) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        clearInterval(interval);
        router.push("/");
      }

      return () => clearInterval(interval);
    }
  }, [user_id, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, user_id }), // Include the user ID in the request
        
      });

      if (!response.ok) throw new Error("Failed to create product");

      alert("Product created successfully!");
      router.push(`/products`); // Redirect to the products list page
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  if (user_id === null) {
    return (
      <div className="container mt-6 mb-6">
        <div className="box has-text-centered">
          <h1 className="title is-4">You need to log in</h1>
          <p className="is-size-6">Redirecting to the login page in {countdown} seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-6 mb-6">
        <div className="box">
          <h1 className="title is-4 has-text-centered">Create Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="ceramics">Ceramics</option>
                    <option value="home-goods">Home Goods</option>
                    <option value="fibers">Fibers</option>
                    <option value="jewelry">Jewelry</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Image URL</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="image_url"
                  value={product.image_url}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="control">
              <button type="submit" className="button is-primary is-fullwidth">
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}