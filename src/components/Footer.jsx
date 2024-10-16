import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] text-white w-full text-sm p-4">
      <div className="container text-center">
        <p>Follow us on:</p>
        <ul className="social-links flex justify-center gap-6">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom text-center mt-4">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
