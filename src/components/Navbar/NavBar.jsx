import React from 'react';
import './Navbar.css'; // Import the CSS file

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <h1 className="logo">MovieAppy</h1>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/movie" className="nav-link">
            Movies
          </a>
        </li>
        <li className="nav-item">
          <a href="/aboutus" className="nav-link">
            About Us
          </a>
        </li>
      </ul>
    </div>
  );
}
