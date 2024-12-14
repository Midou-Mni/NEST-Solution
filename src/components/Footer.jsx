import React from "react";

function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Nest</h2>
          <p>
            Nest Marketing is your trusted fashion partner, providing quality products
            with innovative BLF technology for secure transactions.
          </p>
        </div>
        
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Homepage</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h2>Help & Info</h2>
          <ul>
            <li><a href="/faq">FAQ's</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/tracking">Tracking ID</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 Nest Marketing. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 