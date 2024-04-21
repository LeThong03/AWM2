import React, { useState, useEffect } from 'react';
import './status.css';
import SideMenu from '../sideMenu/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilePdf } from '@fortawesome/free-solid-svg-icons';

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

  // Function to format date and time in Hanoi timezone
  const formatSubmissionDate = (submissionDate) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Ho_Chi_Minh' // Set timezone to Hanoi
    };
    return new Date(submissionDate).toLocaleString('en-US', options);
  };

  const handleEdit = (submissionId) => {
    // Implement edit functionality here
    console.log(`Editing submission with ID: ${submissionId}`);
  };

  return (
    <div className="status-page">
      <SideMenu />
      <div className="status-content">
        <h2 className="status-title">Submitted Magazines</h2>
        <div className="magazine-table-container">
          <table className="magazine-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Content</th>
                <th>Document</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={submission._id}>
                  <td>{index + 1}</td>
                  <td>{submission.magazineTitle}</td>
                  <td>{submission.magazineContent}</td>
                  <td>
                    <a href={`http://localhost:5000/uploads/${submission.document}`} target="_blank" rel="noopener noreferrer" className="document-link">
                      <FontAwesomeIcon icon={faFilePdf} /> Download PDF
                    </a>
                  </td>
                  <td>{formatSubmissionDate(submission.submissionDate)}</td> {/* Convert submission date to Hanoi timezone */}
                  <td>{submission.submissionStatus}</td> {/* Adjust with the actual field name from your database */}
                  <td>{submission.comment}</td>
                  <td><button className="edit-button" onClick={() => handleEdit(submission._id)}><FontAwesomeIcon icon={faEdit} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Status;
