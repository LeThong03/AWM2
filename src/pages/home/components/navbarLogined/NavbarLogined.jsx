import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link, useLocation, and useNavigate
import './navbarLogined.css';

const NavbarLogined = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Initialize useLocation hook
  const [userFullName, setUserFullName] = useState('');

  // Extract full name from URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fullNameParam = searchParams.get('fullName');
    if (fullNameParam) {
      setUserFullName(fullNameParam);
    }
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    // Implement logout functionality here

    // After logout, navigate to the login page
    navigate('/login');
  };

  return (
    <div className="magazine__navbar">
      <div className="magazine__navbar-links">
        <div className="magazine__navbar-links_logo">
        </div>

        <div className="magazine__navbar-links_container">
          <p>{userFullName && <Link to="/dashboard">My Dashboard</Link>}</p>
          <p><Link to="/library">Faculties</Link></p>
        </div>
      </div>

      {userFullName && ( // Display only if userFullName is available
        <div className="magazine__navbar-user">
          <p className="user-fullname">{userFullName}</p> {/* Add class to the <p> element */}
        </div>
      )}

      <div className="magazine__navbar-sign">
        {userFullName ? (
          <button type="button" onClick={handleLogout}>Logout</button>
        ) : (
          <button type="button"><Link to="/login">Sign in</Link></button>
        )}
      </div>

      <div className="magazine__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className="magazine__navbar-menu_container scale-up-center">
            <div className="magazine__navbar-menu_container-links">
              <p>{userFullName && <Link to="/dashboard">My Dashboard</Link>}</p>
              <p><Link to="/library">Faculties</Link></p>
            </div>

            <div className="magazine__navbar-menu_container-links-sign">
              {userFullName ? (
                <button type="button" onClick={handleLogout}>Logout</button>
              ) : (
                <button type="button"><Link to="/login">Sign in</Link></button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarLogined;
