import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="magazine__navbar">
      <div className="magazine__navbar-links">
        <div className="magazine__navbar-links_logo">
        </div>

        <div className="magazine__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#new">News</a></p>
          <p><a href="#event">Events</a></p>
          <p><a href="#blog">Library</a></p>
        </div>
      </div>

      <div className="magazine__navbar-sign">

        <p>Sign in</p>

        <button type="button">Sign up</button>
        
      </div>

      <div className="magazine__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="magazine__navbar-menu_container scale-up-center">
            <div className="magazine__navbar-menu_container-links">
              <p><a href="#">Home</a></p>
              <p><a href="#">News</a></p>
              <p><a href="#">Events</a></p>
              <p><a href="#">Library</a></p>
            </div>

            <div className="magazine__navbar-menu_container-links-sign">
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
