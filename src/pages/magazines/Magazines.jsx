import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarLogined from './navbarLogined/NavbarLogin';
import './magazines.css';

const Library = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submissions, setSubmissions] = useState([]);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/fetchSubmissions');
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

    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    const userRoleParam = searchParams.get('userRole');

    if (usernameParam) {
      setUsername(usernameParam);
    }
    if (userRoleParam) {
      setUserRole(userRoleParam);
    }
  }, [location]);

  const openDetail = (submissionId) => {
    if (username) {
      navigate(`/publicmagazine/detail?submissionId=${submissionId}&username=${username}&userRole=${userRole}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="library">
      <NavbarLogined />
      <div className="submission-container">
        {submissions.map((submission) => (
          <div key={submission._id} className="submission-card" onClick={() => openDetail(submission._id)}>
            <img src={`http://localhost:5000/uploads/${submission.coverImage}`} alt={`Image for ${submission.magazineTitle}`} className="submission-image" />
            <div className="submission-info">
              <h3>{submission.magazineTitle}</h3>
              <p>Student Name: {submission.studentName}</p>
              <p>Faculty: {submission.faculty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
