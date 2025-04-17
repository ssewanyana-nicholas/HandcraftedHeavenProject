"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // Use the `useParams` hook to access route parameters
  const productId = params?.id; // Access the `id` parameter from the route, with a null check

  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the product details to pre-fill the form
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/get?id=${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct({
          id: data.id,
          name: data.name,
          category: data.category,
          description: data.description,
          price: data.price.toString(),
          image_url: data.image_url,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/products/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // Include the `id` in the body
      });

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      router.push(`/products/${productId}`);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-6 mb-6">
        <div className="box">
          <h1 className="title is-4 has-text-centered">Edit Product</h1>
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}