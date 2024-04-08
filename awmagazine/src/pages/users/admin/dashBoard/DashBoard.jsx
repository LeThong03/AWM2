import React, { useState } from 'react';
import './dashBoard.css'; // Import your CSS file for styling

// Sample data for user accounts and submissions
const sampleUserAccounts = [
  { id: 1, name: 'Admin 1', email: 'admin1@example.com', role: 'Admin' },
  { id: 2, name: 'Admin 2', email: 'admin2@example.com', role: 'Admin' },
  { id: 3, name: 'User 1', email: 'user1@example.com', role: 'User' }
];

const sampleSubmissions = [
  { id: 1, title: 'Submission 1', status: 'Pending' },
  { id: 2, title: 'Submission 2', status: 'Approved' },
  { id: 3, title: 'Submission 3', status: 'Rejected' }
];

const Dashboard = () => {
  // State for selected tab (User Management or Content Management)
  const [selectedTab, setSelectedTab] = useState('users');

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="tab" onClick={() => setSelectedTab('users')}>
          User Management
        </div>
        <div className="tab" onClick={() => setSelectedTab('content')}>
          Content Management
        </div>
        {/* Add more tabs for other sections */}
      </div>
      <div className="main-content">
        {selectedTab === 'users' && <UserManagement userAccounts={sampleUserAccounts} />}
        {selectedTab === 'content' && <ContentManagement submissions={sampleSubmissions} />}
        {/* Render other sections based on selected tab */}
      </div>
    </div>
  );
};

const UserManagement = ({ userAccounts }) => {
  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userAccounts.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ContentManagement = ({ submissions }) => {
  return (
    <div>
      <h2>Content Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission.id}>
              <td>{submission.id}</td>
              <td>{submission.title}</td>
              <td>{submission.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
