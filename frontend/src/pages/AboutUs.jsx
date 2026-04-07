import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-container">
            <div className="about-hero">
                <h1>About Book Link</h1>
                <p>Connecting readers, one book at a time.</p>
            </div>

            <div className="about-content">
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At Book Link, we believe that books should be accessible to everyone.
                        Our platform is designed to facilitate the sharing, selling, and
                        exchanging of books within communities, making it easier than ever
                        to find your next great read while giving your old favorites a new home.
                    </p>
                </section>

                <section className="about-section">
                    <h2>What We Offer</h2>
                    <div className="offer-grid">
                        <div className="offer-item">
                            <h3>Community Marketplace</h3>
                            <p>Sell or buy pre-loved books at affordable prices within your local area.</p>
                        </div>
                        <div className="offer-item">
                            <h3>Book Exchange</h3>
                            <p>Trade books with other enthusiasts and discover new genres safely.</p>
                        </div>
                        <div className="offer-item">
                            <h3>Donate</h3>
                            <p>Give back to the community by donating books to those in need.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where every book finds a second, third, or fourth
                        reader, reducing waste and fostering a global culture of literacy
                        and knowledge sharing.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
