import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashBoard.css'; // Import your CSS file for styling
import { FaUser, FaChartBar, FaBell } from 'react-icons/fa'; // Import icons from react-icons library
import SideMenu from '../sideMenu/SideMenu';

const DashBoard = () => {
  const [totalUsers, setTotalUsers] = useState({});
  const [totalSubmissions, setTotalSubmissions] = useState({});

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalSubmissions();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getUserCountsByRole');
      setTotalUsers(response.data);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  const fetchTotalSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/totalSubmissions');
      setTotalSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching total submissions:', error);
    }
  };

  return (
    <div>
      <SideMenu />
      <div className="dashboard">
        <h2>Static Analysis Dashboard</h2>
        <div className="box-container">
          <div className="box">
            <FaUser className="icon" />
            <h3>Total Users</h3>
            <p>Managers: {totalUsers.managers}</p>
            <p>Coordinators: {totalUsers.coordinators}</p>
            <p>Students: {totalUsers.students}</p>
          </div>
          <div className="box">
            <FaChartBar className="icon" />
            <h3>Total Submissions</h3>
            <p>Accepted: {totalSubmissions.accepted}</p>
            <p>Pending: {totalSubmissions.pending}</p>
            <p>Rejected: {totalSubmissions.rejected}</p>
            <p>Rejected for Publish: {totalSubmissions.rejectedForPublish}</p>
            <p>Approved for Publish: {totalSubmissions.approvedForPublish}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
