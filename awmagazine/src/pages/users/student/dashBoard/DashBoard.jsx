import React, { useState, useEffect } from 'react';
import './dashBoard.css'; // Import your CSS file for styling
import { FaNewspaper, FaCheckCircle, FaBell } from 'react-icons/fa'; // Import icons from react-icons library

const DashBoard = () => {
  // Mock data for submitted magazines (replace with actual data from backend)
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    // Fetch data from backend or API
    // Example of mock data
    const mockData = [
      { id: 1, title: 'Magazine 1', status: 'Approved' },
      { id: 2, title: 'Magazine 2', status: 'Pending' },
      { id: 3, title: 'Magazine 3', status: 'Rejected' }
    ];
    setMagazines(mockData);
  }, []);

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>
      <div className="box-container">
        <div className="box">
          <FaNewspaper className="icon" />
          <h3>All Magazines</h3>
        </div>
        <div className="box">
          <FaCheckCircle className="icon" />
          <h3>Status</h3>
        </div>
        <div className="box">
          <FaBell className="icon" />
          <h3>Notifications</h3>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
