import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Import the FaArrowLeft icon
import { useNavigate } from 'react-router-dom';
import { Cosmos, Space1 } from './imports'; // Importing the Cosmos image from the imports folder
import './magazines.css';

const Library = () => {
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

  return (
    <div className="library">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/home')}>
          <FaArrowLeft />
        </button>
        <h2>Library</h2>
      </div>
      <div className="magazine-container">
        {/* Example magazines */}
        <div className="magazine">
          <img src={Cosmos} alt="Magazine 1" />
          <div className="magazine-info">
            <h3>Quantum Computer Chronicles:</h3>
            <p>Faculty: Faculty of Engineering</p>
            <p>Author: LeDangThong</p>
          </div>
        </div>
        <div className="magazine">
          <img src={Space1} alt="Magazine 2" />
          <div className="magazine-info">
            <h3>Space the final frontier:</h3>
            <p>Category: Faculty of Engineering</p>
            <p>Author: LeDangThong</p>
          </div>
        </div>
        {/* Add more magazines here */}
      </div>
      <div className="form-container">
        <form className="form">
          {/* Add form fields here */}
        </form>
      </div>
    </div>
  );
};

export default Library;
