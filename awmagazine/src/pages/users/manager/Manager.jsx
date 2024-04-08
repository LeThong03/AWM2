import React from 'react';
import './manager.css';
import SideMenu from './sideMenu/SideMenu';


const Manager = () => {
  return (
    <div className="manager-container">
      <SideMenu />
      <div className="main-content">
      </div>
    </div>
  );
};

export default Manager;
