import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
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
          <Link to="/login">
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;