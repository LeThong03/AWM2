import React, { useState, useEffect } from 'react';
import './viewSelectedSubmission.css'; // Import your CSS file for styling
import SideMenu from '../sideMenu/SideMenu'; // Import SideMenu component
import SubmissionTable from './SubmissionTable'; // Import SubmissionTable component

const ViewSelectedSubmission = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch submissions with status "Approved for Publication" from the backend
    const fetchApprovedSubmissions = async () => {
      try {
        const response = await fetch('/approvedSubmissions');
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          console.error('Failed to fetch approved submissions:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching approved submissions:', error);
      }
    };

    fetchApprovedSubmissions();
  }, []);

  return (
    <div className="manager-dashboard">
      <SideMenu />
      <div className="dashboard-content">
        <h2 className="dashboard-title">Manager Dashboard</h2>
        <SubmissionTable submissions={submissions} />
      </div>
    </div>
  );
};

export default ViewSelectedSubmission;
