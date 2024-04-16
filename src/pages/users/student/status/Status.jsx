import React, { useState, useEffect } from 'react';
import './status.css';
import SideMenu from '../sideMenu/SideMenu';

const Status = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const username = new URLSearchParams(window.location.search).get('username');
        const response = await fetch(`http://localhost:5000/fetchSubmission?username=${encodeURIComponent(username)}`);
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          console.error('Failed to fetch submissions:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="status-page">
      <SideMenu />
      <div className="status-content">
        <h2 className="status-title">Submitted Magazines</h2>
        <table className="magazine-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Faculty</th>
              <th>Title</th>
              <th>Content</th>
              <th>Cover Image</th>
              <th>Document</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.studentName}</td>
                <td>{submission.faculty}</td>
                <td>{submission.magazineTitle}</td>
                <td>{submission.magazineContent}</td>
                <td><img src={`http://localhost:5000/uploads/${submission.coverImage}`} alt={submission.magazineTitle} width="100" /></td>
                <td><a href={`http://localhost:5000/uploads/${submission.document}`} target="_blank" rel="noopener noreferrer">View Document</a></td>
                <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
                <td>{submission.status}</td>
                <td>{submission.Comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;
