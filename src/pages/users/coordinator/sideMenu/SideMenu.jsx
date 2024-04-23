import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { MdComment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BsWindowPlus } from "react-icons/bs";

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
          <Link to={`/coordinator/dashboard?username=${username}`}>
            {collapsed ? <RxDashboard /> : <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to={`/coordinator/submissionwindow?username=${username}`}>
            {collapsed ? <BsWindowPlus /> : <span>Submissions Window</span>}
          </Link>
        </li>
        <li>
          <Link to={`/coordinator/viewsubmission?username=${username}`}>
            {collapsed ? <MdComment  /> : <span>View Submissions</span>}
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
