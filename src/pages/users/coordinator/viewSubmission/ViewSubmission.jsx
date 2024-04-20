import React, { useState, useEffect } from 'react';
import './viewSubmission.css';
import SideMenu from '../sideMenu/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilePdf } from '@fortawesome/free-solid-svg-icons';

const ViewSubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [editedSubmission, setEditedSubmission] = useState({
    submissionStatus: '',
    comment: ''
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const username = new URLSearchParams(window.location.search).get('username'); 
        const response = await fetch(`http://localhost:5000/coordinatorFetchSubmission?username=${encodeURIComponent(username)}`);                if (response.ok) {
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

  const handleEdit = (submissionId) => {
    // Find the submission to edit
    const submissionToEdit = submissions.find(submission => submission._id === submissionId);
    setEditingSubmission(submissionToEdit);
    // Clear editedSubmission state
    setEditedSubmission({
      submissionStatus: submissionToEdit.submissionStatus,
      comment: submissionToEdit.comment
    });
  };

  const handleStatusChange = (e) => {
    setEditedSubmission({
      ...editedSubmission,
      submissionStatus: e.target.value
    });
  };

  const handleCommentChange = (e) => {
    setEditedSubmission({
      ...editedSubmission,
      comment: e.target.value
    });
  };

  const handleSubmitEdit = async () => {
    try {
      // Make API call to update the submission
      await fetch(`http://localhost:5000/updateSubmission/${editingSubmission._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedSubmission)
      });
      // Clear editing state
      setEditingSubmission(null);
      setEditedSubmission({
        submissionStatus: '',
        comment: ''
      });
      // Refetch submissions to reflect the changes
      const response = await fetch(`http://localhost:5000/fetchStudentSubmissions`);
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        console.error('Failed to fetch submissions:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating submission:', error);
    }
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
                <th>Student Name</th>
                <th>Faculty</th>
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
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.studentName}</td>
                  <td>{submission.faculty}</td>
                  <td>{submission.magazineTitle}</td>
                  <td>{submission.magazineContent}</td>
                  <td>
                    <a href={`http://localhost:5000/uploads/${submission.document}`} target="_blank" rel="noopener noreferrer" className="document-link">
                      <FontAwesomeIcon icon={faFilePdf} /> Download PDF
                    </a>
                  </td>
                  <td>{new Date(submission.submissionDate).toLocaleString()}</td>
                  <td>{submission.submissionStatus}</td>
                  <td>{submission.comment}</td>
                  <td>
                    {editingSubmission && editingSubmission._id === submission._id ? (
                      <div>
                        <select value={editedSubmission.submissionStatus} onChange={handleStatusChange}>
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <textarea value={editedSubmission.comment} onChange={handleCommentChange} />
                        <button onClick={handleSubmitEdit}>Save</button>
                      </div>
                    ) : (
                      <button className="edit-button" onClick={() => handleEdit(submission._id)}><FontAwesomeIcon icon={faEdit} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmission;