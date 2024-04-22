import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilePdf } from '@fortawesome/free-solid-svg-icons';

import './viewSelectedSubmission.css'; // Import your CSS file for styling
import SideMenu from '../sideMenu/SideMenu';

const ViewSelectedSubmission = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch selected submissions from the backend
    fetchSelectedSubmissions();
  }, []);

  const fetchSelectedSubmissions = async () => {
    try {
      // Fetch data from the backend
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

  return (
    <div className="view-selected-submission"> {/* Add unique class name */}
      <h2 className="submission-title">Selected Submissions</h2> {/* Add class name for submission title */}
      <SideMenu/>
      <table className="submission-table"> {/* Add class name for submission table */}
        <thead>
          <tr>
            <th>No</th>
            <th>Student Name</th>
            <th>Faculty</th>
            <th>Magazine Title</th>
            <th>Document</th>
            <th>Comment</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSelectedSubmission;
