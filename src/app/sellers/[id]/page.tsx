"use client";
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import slider styles
import Header from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import ProductBox from "@app/components/Product";
import { fetchProductsByUserId } from "@app/sellers/[id]/product"; // Updated import for fetching products by user ID
import { Product } from "@app/lib/definitions"; // Adjust the import path as necessary
import Link from "next/link";
import { useParams } from "next/navigation"; // Import useParams to get the user ID from the route

const ProductsPage = () => {
  const params = useParams(); // Get the route parameters
  const userId = params?.id ? String(params.id) : null; // Safely extract the user ID
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1000]); // Default range: 1 to 1000
  const productsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      if (userId) {
        const userProducts = await fetchProductsByUserId(Number(userId)); // Fetch products by user ID
        setProducts(userProducts);
      }
      setLoading(false); // Set loading to false after fetching
    };

    loadProducts();
  }, [userId]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to the first page on category change
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange([value[0], value[1]]);
      setCurrentPage(1); // Reset to the first page on price range change
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    )
    .filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    // Show a loading screen while products are being fetched
    return (
      <div className="loading-screen">
        <Header />
        <section className="hero is-small is-light">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Products</h1>
              <p>Loading products for the seller...</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-page">
      <Header />
      {/* Hero Section */}
      <section className="hero is-small is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Products by Seller</h1>
            <div className="field is-grouped is-grouped-centered mt-4">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="control">
                <div className="select">
                  <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="all">All Categories</option>
                    <option value="ceramics">Ceramics</option>
                    <option value="home-goods">Home Goods</option>
                    <option value="fibers">Fibers</option>
                    <option value="jewelry">Jewelry</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="control mt-4">
              <label className="label" style={{ color: "black" }}>
                Price Range
              </label>
              <div className="field">
                <Slider
                  range
                  min={1}
                  max={1000}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  allowCross={false}
                />
                <div className="is-flex is-justify-content-space-between mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Grid */}
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {currentProducts.map((product) => (
              <div key={product.id} className="column is-one-quarter">
                <Link href={`/products/${product.id}`}>
                  <ProductBox
                    {...product}
                    onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                  />
                </Link>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <nav className="pagination is-centered mt-4" role="navigation" aria-label="pagination">
            <button
              className="pagination-previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="pagination-next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <ul className="pagination-list">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`pagination-link ${currentPage === index + 1 ? "is-current" : ""}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductsPage;