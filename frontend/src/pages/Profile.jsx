import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

export default function Profile() {
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // Post Editing State
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  // Load user, bio & posts from API
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Fetch User Info
        const userRes = await fetch("http://127.0.0.1:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
          if (userData.bio) setBio(userData.bio);

          // Fetch All Books and filter by owner_id
          const booksRes = await fetch("http://127.0.0.1:8000/books/");
          if (booksRes.ok) {
            const allBooks = await booksRes.json();
            const myBooks = allBooks.filter(book => book.owner_id === userData.id);
            setPosts(myBooks);
          }
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };
    fetchProfileData();

    const savedBio = localStorage.getItem("bio");
    if (savedBio) setBio(savedBio);
  }, []);

  // Save bio
  const handleSaveBio = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bio: bio })
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        localStorage.setItem("bio", bio);
        alert("✅ Profile updated!");
      } else {
        alert("❌ Failed to update profile.");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      alert("📡 Connection error.");
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        alert("🚮 Post deleted successfully.");
      } else {
        alert("❌ Failed to delete post.");
      }
    } catch (error) {
      console.error("Delete post error:", error);
    }
  };

  const handleEditPost = (post) => {
    setCurrentPost({ ...post });
    setIsEditingPost(true);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${currentPost.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: currentPost.title,
          author: currentPost.author,
          description: currentPost.description,
          genre: currentPost.genre,
          contact_email: currentPost.contact_email,
          price: parseFloat(currentPost.price)
        })
      });

      if (response.ok) {
        const updated = await response.json();
        setPosts(posts.map(p => p.id === updated.id ? updated : p));
        setIsEditingPost(false);
        alert("✅ Post updated!");
      } else {
        alert("❌ Failed to update post.");
      }
    } catch (error) {
      console.error("Update post error:", error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h1 className="profile-title">My Profile</h1>
          <div className="profile-badge">📚</div>

          <div className="user-details">
            <div className="detail-item">
              <span className="label">Username:</span>
              <span className="value">{user?.username || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email || "Loading..."}</span>
            </div>
          </div>

          <div className="bio-section">
            <h2 className="bio-title">About Me</h2>
            {isEditing ? (
              <div className="bio-editor">
                <textarea
                  className="bio-textarea"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your story..."
                />
                <div className="bio-actions">
                  <button onClick={handleSaveBio} className="btn-primary-mini">Save</button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary-mini">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="bio-display">
                {bio || "No bio added yet. Tell us about your reading tastes!"}
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-outline-wide"
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
            <button
              onClick={handleLogout}
              className="btn-danger-wide"
            >
              Logout Account
            </button>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <div style={{ width: "100%", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>My Posts</h2>
          <span style={{ color: "#b0cbe0", fontWeight: "bold" }}>{posts.length} Books</span>
        </div>

        {posts.length === 0 ? (
          <div style={{ width: "100%", textAlign: "center", padding: "40px", color: "white" }}>
            <p>No posts created yet.</p>
            <button onClick={() => window.location.href = "/CreatePost"} style={{ margin: "20px auto", width: "auto", padding: "10px 30px" }}>List a Book</button>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card-profile">
              <div className="post-card-heading">
                <h3 className="truncate-text" title={post.title}>{post.title}</h3>
                <div className="post-card-actions">
                  <button onClick={() => handleEditPost(post)} className="action-btn edit-mini" title="Edit">✏️</button>
                  <button onClick={() => handleDeletePost(post.id)} className="action-btn delete-mini" title="Delete">🗑️</button>
                </div>
              </div>
              <p className="p-author">by {post.author || "Unknown"}</p>
              <p className="p-desc">{post.description}</p>
              <div className="post-card-footer">
                <span className={`tag-genre ${post.genre}`}>{post.genre}</span>
                {post.genre === "sell" && <span className="price-tag">₹{post.price}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Post Modal overlay - reusable style from CreatePost if possible, or manual */}
      {isEditingPost && (
        <div className="modal-overlay">
          <div className="edit-post-modal">
            <h3>Edit Book Details</h3>
            <form onSubmit={handleUpdatePost} className="edit-post-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  placeholder="Title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={currentPost.author}
                  onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                  placeholder="Author"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={currentPost.description}
                  onChange={(e) => setCurrentPost({ ...currentPost, description: e.target.value })}
                  placeholder="Description"
                  required
                />
              </div>
              {currentPost.genre === "sell" && (
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    value={currentPost.price}
                    onChange={(e) => setCurrentPost({ ...currentPost, price: e.target.value })}
                    placeholder="Price"
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  value={currentPost.contact_email || ""}
                  onChange={(e) => setCurrentPost({ ...currentPost, contact_email: e.target.value })}
                  placeholder="Contact Email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <div className="options" style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                  {["sell", "exchange", "donate"].map((opt) => (
                    <span
                      key={opt}
                      className={`tag ${opt} ${currentPost.genre === opt ? "active" : ""}`}
                      onClick={() => setCurrentPost({ ...currentPost, genre: opt })}
                      style={{
                        padding: "5px 15px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        border: currentPost.genre === opt ? "2px solid #1B3C53" : "2px solid transparent",
                        background: currentPost.genre === opt ? "#B0CBE0" : "#f1f5f9",
                        color: "#1B3C53",
                        fontWeight: "700"
                      }}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="update-btn">Update Post</button>
                <button type="button" onClick={() => setIsEditingPost(false)} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
