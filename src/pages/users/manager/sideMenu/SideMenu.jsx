import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCog, FaSignOutAlt, FaUser, FaChartBar } from 'react-icons/fa';
import './sideMenu.css';

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [location]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Clear user information
    setUsername('');
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className={`sider ${collapsed ? 'collapsed' : ''}`}>
      <div className="trigger" onClick={toggle}>
        {collapsed ? (
          <span>&#x2630;</span>
        ) : (
          <span>&#x2715;</span>
        )}
      </div>
      <ul className="menu">
        <li>
          <Link to={`/Manager/dashboard?username=${username}`}>
            {collapsed ? <FaHome /> : <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to={`/Manager/view-reports?username=${username}`}>
            {collapsed ? <FaChartBar /> : <span>View Faculty Magazines</span>}
          </Link>
        </li>
        <li>
          <Link to={`/Manager/manage-team?username=${username}`}>
            {collapsed ? <FaUser /> : <span>Manage Magazine</span>}
          </Link>
        </li>
        <li>
          <Link to={`/Manager/settings?username=${username}`}>
            {collapsed ? <FaCog /> : <span>Settings</span>}
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={handleLogout}>
            {collapsed ? <FaSignOutAlt /> : <span>Logout</span>}
          </Link>
        </li>
      </ul>
      <div className="user-info">
        {collapsed ? (
          <FaUser />
        ) : (
          <p>{username}</p>
        )}
      </div>
    </div>
  );
  
};

export default SideMenu;
