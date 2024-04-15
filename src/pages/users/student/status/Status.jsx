import React, { useState, useEffect } from 'react';
import './status.css';
import SideMenu from '../sideMenu/SideMenu';

const useFetchMagazines = (username) => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await fetch(`http://localhost:5000/fetchMagazines/${encodeURIComponent(username)}`);
        if (response.ok) {
          const data = await response.json();
          setMagazines(data);
        } else {
          console.error('Failed to fetch magazines:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching magazines:', error);
      }
    };
    fetchMagazines();
  }, [username]); // Include username in the dependency array

  return magazines;
};

const Status = () => {
  // Extracting username from URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  const magazines = useFetchMagazines(username);

  return (
    <div className="status-page">
      <SideMenu />
      <div className="status-content">
        <h2>Magazine Status</h2>
        <div className="magazine-list">
          {magazines.map((magazine) => (
            <div key={magazine._id} className="magazine-status">
              <h3>{magazine.magazineTitle}</h3>
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
      </div>
    </div>
  );
};

export default Status;
