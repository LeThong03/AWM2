import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link, useLocation, and useNavigate
import './navbarLogined.css';

const NavbarLogined = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Initialize useLocation hook
  const [user, setUser] = useState(null); // Include user state to hold user data

  // Extract user data from URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userData = {
      username: searchParams.get('username'),
      role: searchParams.get('role') // Include role in user data
    };
    setUser(userData);
    
    // Log user role
    console.log(`User role: ${userData.role}`);
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
          {user && user.role !== 'guest' && user.username && ( // Display only if user is not a guest and is logged in
            <p>
              {/* Pass the username as a query parameter in the URL */}
              <Link to={`/Student/dashboard?username=${user.username}`}>My Dashboard</Link>
            </p>
          )}
          <p><Link to="/library">Faculties</Link></p>
        </div>
      </div>

      {user && user.username && ( // Display only if user data is available and user is logged in
        <div className="magazine__navbar-user">
          <p className="user-username">{user.username}</p> {/* Add class to the <p> element */}
        </div>
      )}

      <div className="magazine__navbar-sign">
        {user ? (
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
              {user && user.role !== 'guest' && user.username && ( // Display only if user is not a guest and is logged in
                <p>
                  {/* Pass the username as a query parameter in the URL */}
                  <Link to={`/Student/dashboard?username=${user.username}`}>My Dashboard</Link>
                </p>
              )}
              <p><Link to="/library">Faculties</Link></p>
            </div>

            <div className="magazine__navbar-menu_container-links-sign">
              {user ? (
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
