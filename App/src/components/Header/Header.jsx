import React from "react";
import "./Header.css";
function Header() {
  return (
    <header>
      <div className="nav">
        <div className="nav-left">
          <h1>Vigenère Cipher</h1>
        </div>
        <div className="nav-right">
          <h4 className="learn">
            <a
              href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#:~:text=The%20Vigen%C3%A8re%20cipher%20(French%20pronunciation,of%20another%20text%2C%20the%20key."
              target="_blank"
            >
              lEARN MORE
            </a>
          </h4>
          <h4 className="contact">
            <a href="https://github.com/Harmfulllll" target="_blank">
              Contact
            </a>
          </h4>
        </div>
      </div>
    </header>
  );
}
export default Header;
