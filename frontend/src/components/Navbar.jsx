//Navbar.jsx file 
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar({ isLoggedIn }) {
  return (
    <nav style={{ borderRadius: '10px', backgroundColor: '#1B3C53', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{
        maxWidth: '1200px',         // fixed max width
        margin: '0 auto',           // center horizontally
        padding: '10px 20px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: '600',
        fontSize: '1.1rem',
        color: '#b0cbe0ff',
      }}>
        <div style={{ fontWeight: '900', fontSize: '1.8rem', whiteSpace: 'nowrap' }}>
          Book Link
        </div>
        <div className="nav-option" style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-around',
          marginLeft: '20px',
        }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/CreatePost" className="nav-link">Create Post</Link>
          {isLoggedIn ? (
            <Link to="/profile" className="nav-link">Profile</Link>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link highlight">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;





