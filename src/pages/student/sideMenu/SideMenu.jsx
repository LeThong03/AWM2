import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Perform logout actions here
    // For example, clear localStorage or session storage
    // Then redirect to login page using window.location.href
    window.location.href = '/login'; // Redirect to login page using window.location.href
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
          <Link to="/me">
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/attendance">
            <span>Attendance</span>
          </Link>
        </li>
        <li>
          <Link to="/assignments">
            <span>Assignments</span>
          </Link>
        </li>
        <li>
          <span>Settings</span>
        </li>
        <li>
          <button onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
