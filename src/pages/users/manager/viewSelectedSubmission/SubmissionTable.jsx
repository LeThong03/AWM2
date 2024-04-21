import React from 'react';
import './submissionTable.css'; // Import your CSS file for styling

const SubmissionTable = ({ submissions }) => {
  return (
    <div className="submission-table-container">
      <table className="submission-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Faculty</th>
            <th>Author</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission.title}</td>
              <td>{submission.faculty}</td>
              <td>{submission.author}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
