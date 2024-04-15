import React, { useState, useEffect } from 'react';

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch submissions from the backend upon component mount
    fetch('/submissions')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch submissions');
      })
      .then(data => {
        setSubmissions(data);
      })
      .catch(error => {
        console.error('Error fetching submissions:', error);
      });
  }, []);

  return (
    <div>
      <h2>View Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Magazine Title</th>
            <th>Magazine Content</th>
            <th>Cover Image</th>
            <th>Document</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.studentName}</td>
              <td>{submission.magazineTitle}</td>
              <td>{submission.magazineContent}</td>
              <td>
                <img src={submission.coverImageURL} alt="Cover" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </td>
              <td>
                <a href={submission.documentURL} target="_blank" rel="noopener noreferrer">View Document</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSubmissions;
