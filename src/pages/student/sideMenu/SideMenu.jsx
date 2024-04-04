// SideMenu.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaNewspaper, FaEye, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons library
import './sideMenu.css';

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sider ${collapsed ? 'collapsed' : ''}`}>
      <div className="trigger" onClick={toggle}>
        {collapsed ? (
          <span>&#x2630;</span> // Placeholder for collapsed icon
        ) : (
          <span>&#x2715;</span> // Placeholder for expanded icon
        )}
      </div>
      <ul className="menu">
        <li>
          <Link to="/dashboard">
            {collapsed ? <FaHome /> : <span>Dashboard</span>} {/* Use icon when collapsed */}
          </Link>
        </li>
        <li>
          <Link to="/submit-magazine">
            {collapsed ? <FaNewspaper /> : <span>Submission</span>} {/* Use icon when collapsed */}
          </Link>
        </li>
        <li>
          <Link to="/check-publish-status">
            {collapsed ? <FaEye /> : <span>Status</span>} {/* Use icon when collapsed */}
          </Link>
        </li>
        <li>
          <Link to="/settings">
            {collapsed ? <FaCog /> : <span>Settings</span>} {/* Use icon when collapsed */}
          </Link>
        </li>
        <li>
          <Link to="/login">
            {collapsed ? <FaSignOutAlt /> : <span>Logout</span>} {/* Use icon when collapsed */}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
