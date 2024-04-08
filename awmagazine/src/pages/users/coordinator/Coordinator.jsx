import React from 'react';
import './coordinator.css';
import SideMenu from './sideMenu/SideMenu';


const Coordinator = () => {
  return (
    <div className="manager-container">
      <SideMenu />
      <div className="main-content">
      </div>
    </div>
  );
};

export default Coordinator;
