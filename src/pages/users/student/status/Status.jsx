import React, { useState, useEffect } from 'react';
import './status.css'; // Import your CSS file for styling

const Status = () => {
  // State for magazine status data
  const [magazineStatus, setMagazineStatus] = useState([]);

  useEffect(() => {
    // Fetch magazine status data from MongoDB or API
    // Example of mock data
    const mockData = [
      {
        id: 1,
        title: 'Magazine 1',
        status: 'Commented',
        comments: [
          'Good work! Keep it up.',
          'Needs improvement in content.',
          'Excellent cover design.'
        ]
      },
      {
        id: 2,
        title: 'Magazine 2',
        status: 'Published',
        comments: []
      },
      // Add more magazine status data as needed
    ];
    setMagazineStatus(mockData);
  }, []);

  return (
    <div className="status-page">
      <h2>Magazine Status</h2>
      {magazineStatus.map((magazine) => (
        <div key={magazine.id} className="magazine-status">
          <h3>{magazine.title}</h3>
          <p>Status: {magazine.status}</p>
          {magazine.comments.length > 0 && (
            <div className="comments">
              <h4>Comments:</h4>
              <ul>
                {magazine.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Status;
