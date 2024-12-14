import React from 'react';
import './LandingPage.module.css'; // External CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">YourLogo</div>
        <div className="auth-buttons">
          <button className="auth-button">Sign In</button>
          <button className="auth-button">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <button className="get-started-button">Get Started</button>
      </div>
    </div>
  );
}

export default LandingPage;
