import React, { useState } from "react";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    date: "",
    price: "",
    contactEmail: "",
    sellCriteria: "",
    exchangeBook: "",
    exchangeCriteria: ""
  });

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (option) => {
    setCategory(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title: formData.title,
      author: formData.author || "Unknown",
      description: formData.description,
      genre: category || "Other",
      price: parseFloat(formData.price) || 0,
      contact_email: formData.contactEmail,
      image_url: ""
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        alert("✅ Post Created Successfully!");
        setFormData({
          title: "",
          author: "",
          description: "",
          date: "",
          price: "",
          contactEmail: "",
          sellCriteria: "",
          exchangeBook: "",
          exchangeCriteria: ""
        });
        setCategory("");
      } else {
        const errorData = await response.json();
        alert("❌ Failed to create post: " + (errorData.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Create post error:", error);
      alert("📡 Connection error. Please ensure the backend is running.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="outside-post-container">
        <div className="inside-post-container">
          <h2>Registration Required</h2>
          <p>Please log in or sign up to share your books.</p>
          <button onClick={() => window.location.href = "/login"} className="createpost-btn">Go to Login</button>
          <p>
            New here?{" "}
            <span className="link" onClick={() => window.location.href = "/signup"}>Sign Up</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-content-div">
      <div className="outer">
        <div className="create-post-container">
          <h2>Create Book Post</h2>
          <form onSubmit={handleSubmit} className="form-box">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              required
              value={formData.author}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description (condition, edition, etc.)"
              required
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email (e.g. your@gmail.com)"
              required
              value={formData.contactEmail}
              onChange={handleChange}
            />

            <label>Choose Option:</label>
            <div className="options">
              {["sell", "exchange", "donate"].map((opt) => (
                <span
                  key={opt}
                  className={`tag ${opt} ${category === opt ? "active" : ""}`}
                  onClick={() => handleCategoryChange(opt)}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </span>
              ))}
            </div>

            {category === "sell" && (
              <div className="extra-box">
                <input
                  type="number"
                  name="price"
                  placeholder="Set Price (₹)"
                  required
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            )}

            {category === "exchange" && (
              <div className="extra-box">
                <input
                  type="text"
                  name="exchangeBook"
                  placeholder="Which book do you want?"
                  required
                  value={formData.exchangeBook}
                  onChange={handleChange}
                />
              </div>
            )}

            <button type="submit" className="createpost-btn">Publish Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
