//Home.jsx file
import React from 'react';
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='main-container'>
      <div className='inside-container'>
        <img
          src="/image.png"
          alt=""
        />
        {/* Text content on top */}
        <div className='text-container'>
          <h1>Welcome to Book Link</h1>
          <p>
            Here you can sell, exchange, and donate second-hand books.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;