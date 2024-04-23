// ViewSelectedSubmission.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faCheck } from '@fortawesome/free-solid-svg-icons'; 

import './viewSelectedSubmission.css'; 
import SideMenu from '../sideMenu/SideMenu';

const ViewSelectedSubmission = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSelectedSubmissions();
  }, []);

  const fetchSelectedSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/selectedSubmissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        throw new Error(`Failed to fetch selected submissions: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching selected submissions:', error);
    }
  };

  const handleApproveSubmission = async (submissionId) => {
    try {
      const response = await fetch(`http://localhost:5000/approveSubmission/${submissionId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        // Remove the approved submission from the state
        setSubmissions((prevSubmissions) => prevSubmissions.filter((submission) => submission._id !== submissionId));
        console.log('Submission approved successfully');
      } else {
        console.error('Failed to approve submission:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  return (
    <div className="view-selected-submission">
      <h2 className="submission-title">Selected Submissions</h2>
      <SideMenu/>
      <table className="submission-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Student Name</th>
            <th>Faculty</th>
            <th>Magazine Title</th>
            <th>Document</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission._id}>
              <td>{index + 1}</td>
              <td>{submission.studentName}</td>
              <td>{submission.faculty}</td>
              <td>{submission.magazineTitle}</td>
              <td>
                <a href={`http://localhost:5000/uploads/${submission.document}`} target="_blank" rel="noopener noreferrer" className="document-link">
                  <FontAwesomeIcon icon={faFilePdf} /> Download PDF
                </a>
              </td>
              <td>{submission.comment}</td>
              <td>
                <button onClick={() => handleApproveSubmission(submission._id)}>
                  <FontAwesomeIcon icon={faCheck} /> Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSelectedSubmission;