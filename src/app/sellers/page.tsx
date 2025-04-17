"use client";

import React, { useEffect, useState } from "react";
import Header from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import { fetchUsers } from "@app/sellers/sellers"; // Import the fetchUsers function
import { User } from "@app/lib/definitions"; // Adjust the import path as necessary
import Link from "next/link";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true); // Set loading to true before fetching
      const allUsers = await fetchUsers();
      setUsers(allUsers);
      setLoading(false); // Set loading to false after fetching
    };

    loadUsers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    // Show a loading screen while users are being fetched
    return (
      <div className="loading-screen">
        <Header />
        <div className="container has-text-centered mt-6">
          <h1 className="title">Loading Sellers...</h1>
          <p>Please wait while we load the users for you.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="users-page">
      <Header />
      {/* Hero Section */}
      <section className="hero is-small is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Sellers</h1>
            <div className="field is-grouped is-grouped-centered mt-4">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Users Grid */}
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {currentUsers.map((user) => (
              <div key={user.id} className="column is-one-quarter">
                <Link href={`/sellers/${user.id}`}>
                  <div className="box has-text-centered">
                    <figure className="image is-128x128 is-inline-block">
                      <img
                        className="is-rounded"
                        src={"https://avatar.iran.liara.run/public/boy?username=WDD43"}
                        alt={user.name}
                      />
                    </figure>
                    <h2 className="title is-5 mt-3">{user.name}</h2>
                  </div>
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

export default UsersPage;