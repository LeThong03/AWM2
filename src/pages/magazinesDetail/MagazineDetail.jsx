import React from 'react';
import { useParams } from 'react-router-dom';
import './magazineDetail.css'; // Import your CSS file for styling

const SubmissionDetail = ({ submissionData }) => {
  const { id } = useParams(); // Retrieve the submission ID from URL params

  // Find the submission data by ID
  const submission = submissionData.find(sub => sub._id === id);

  if (!submission) {
    return <div>Submission not found</div>;
  }

  return (
    <div className="submission-detail">
      <div className="submission-detail-header">
        <img src={`http://localhost:5000/uploads/${submission.coverImage}`} alt={submission.magazineTitle} className="submission-detail-cover" />
        <div className="submission-detail-info">
          <h2>{submission.magazineTitle}</h2>
          <p>Student Name: {submission.studentName}</p>
          <p>Faculty: {submission.faculty}</p>
        </div>
      </div>
      <div className="submission-detail-pdf">
        <iframe src={`http://localhost:5000/uploads/${submission.pdfUrl}`} title="Submission PDF" className="pdf-viewer" />
      </div>
    </div>
  );
};

export default SubmissionDetail;
