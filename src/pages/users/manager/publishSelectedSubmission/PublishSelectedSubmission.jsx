import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import faTrash icon
import './publishSelectedSubmission.css'; // Import CSS file for styling
import SideMenu from '../sideMenu/SideMenu';

const PublishSelectedSubmission = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchPublishedSubmissions();
  }, []);

  const fetchPublishedSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/publishedSubmissions'); // Update the endpoint to fetch published submissions
      if (response.ok) {
        const data = await response.json();
        // Map over the data to fetch additional information for each submission
        const submissionsWithAdditionalInfo = await Promise.all(data.map(async (submission) => {
          // Fetch faculty information
          const facultyResponse = await fetch(`http://localhost:5000/getFaculty?username=${submission.studentName}`);
          if (facultyResponse.ok) {
            const facultyData = await facultyResponse.json();
            submission.faculty = facultyData.faculty;
          }
          return submission;
        }));
        setSubmissions(submissionsWithAdditionalInfo);
      } else {
        throw new Error(`Failed to fetch published submissions: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching published submissions:', error);
    }
  };

  const handleRemoveSubmission = async (submissionId) => {
    try {
      const response = await fetch(`http://localhost:5000/removePublishedSubmission/${submissionId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the submission from the state
        setSubmissions((prevSubmissions) => prevSubmissions.filter((submission) => submission._id !== submissionId));
        console.log('Published submission removed successfully');
      } else {
        console.error('Failed to remove published submission:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing published submission:', error);
    }
  };

  return (
    <div className="publish-selected-submission">
      <h2 className="submission-title">Selected Submissions</h2>
      <SideMenu />
      <table className="submission-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Author</th>
            <th>Faculty</th>
            <th>Title</th>
            <th>Content</th>
            <th>Document</th>
            <th>Action</th> {/* Add table header for action */}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission._id}>
              <td>{index + 1}</td>
              <td>
                <img src={`http://localhost:5000/uploads/${submission.coverImage}`} alt={`Image for ${submission.magazineTitle}`} className="submission-image" />
              </td>
              <td>{submission.studentName}</td>
              <td>{submission.faculty}</td>
              <td>{submission.magazineTitle}</td>
              <td>{submission.magazineContent}</td>
              <td>
                <a href={`http://localhost:5000/uploads/${submission.document}`} target="_blank" rel="noopener noreferrer" className="document-link">
                  <FontAwesomeIcon icon={faFilePdf} /> Download PDF
                </a>
              </td>
              <td>
                <button onClick={() => handleRemoveSubmission(submission._id)} className="remove-button">
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublishSelectedSubmission;
