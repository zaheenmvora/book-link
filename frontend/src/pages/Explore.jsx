//Explore.jsx file
import React, { useState } from 'react';
import '../styles/explore.css';

function Explore() {
  const [activeFilter, setActiveFilter] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPost, setSelectedPost] = useState(null);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/books/");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredPosts = books.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'recent' || post.genre.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };

  return (
    <div className="explore-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${activeFilter === 'recent' ? 'active' : ''}`}
          onClick={() => handleFilterClick('recent')}
        >
          Recent Posts
        </button>
        <button
          className={`filter-btn ${activeFilter === 'sell' ? 'active' : ''}`}
          onClick={() => handleFilterClick('sell')}
        >
          Sell
        </button>
        <button
          className={`filter-btn ${activeFilter === 'exchange' ? 'active' : ''}`}
          onClick={() => handleFilterClick('exchange')}
        >
          Exchange
        </button>
        <button
          className={`filter-btn ${activeFilter === 'donate' ? 'active' : ''}`}
          onClick={() => handleFilterClick('donate')}
        >
          Donate
        </button>
      </div>

      {/* Posts Display */}
      <div className="posts-container">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card" onClick={() => handlePostClick(post)}>
            <div className={`post-type-badge ${post.genre || 'general'}`}>
              {(post.genre || 'BOOK').toUpperCase()}
            </div>
            <h3 className="post-title" title={post.title}>{post.title}</h3>
            <p className="post-description">{post.description}</p>
            <p className="post-author" title={post.author}>By: {post.author}</p>
          </div>
        ))}
      </div>

      {/* Detail Popup/Modal */}
      {selectedPost && (
        <div className="explore-modal-overlay" onClick={closePopup}>
          <div className="explore-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={closePopup}>&times;</button>

            <div className="modal-header">
              <div className={`modal-badge ${selectedPost.genre}`}>
                {selectedPost.genre.toUpperCase()}
              </div>
              <h2 className="modal-title">{selectedPost.title}</h2>
              <p className="modal-author">by <span> {selectedPost.author}</span></p>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Description</h3>
                <p className="modal-description">{selectedPost.description}</p>
              </div>

              <div className="modal-meta">
                {selectedPost.genre === 'sell' && (
                  <div className="meta-item">
                    <span className="meta-label">Price:</span>
                    <span className="meta-value highlight">₹{selectedPost.price}</span>
                  </div>
                )}

                <div className="meta-item">
                  <span className="meta-label">Contact:</span>
                  {selectedPost.contact_email ? (
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedPost.contact_email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="email-link"
                      title="Click to compose a Gmail"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedPost.contact_email}
                    </a>
                  ) : (
                    <span className="email-link disabled" title="Author did not provide an email">
                      Not Provided
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-close-btn-footer" onClick={closePopup}>Close Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
