import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavbarLogin.css';

const NavbarLogined = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userusername, setUserusername] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUserusername(usernameParam);
    }
  }, [location]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        {/* Your logo or brand */}
      </div>

      <div className="navbar-links">
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to={`/Student/dashboard?username=${userusername}`} className="navbar-link">My Dashboard</Link>
      </div>

      <div className="navbar-user">
        {userusername && <p className="user-username">{userusername}</p>}
        <button className="navbar-button" onClick={handleLogout}>
          {userusername ? 'Logout' : 'Sign in'}
        </button>
      </div>

      <div className="navbar-menu-toggle" onClick={() => setToggleMenu(!toggleMenu)}>
        {toggleMenu ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
      </div>

      {toggleMenu && (
        <div className="navbar-menu">
          <Link to={`/Student/dashboard?username=${userusername}`} className="navbar-link">My Dashboard</Link>
          <button className="navbar-button" onClick={handleLogout}>
            {userusername ? 'Logout' : 'Sign in'}
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarLogined;
