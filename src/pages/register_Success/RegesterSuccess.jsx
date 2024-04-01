import React from 'react';
import { Link } from 'react-router-dom';
import { BackGround } from './imports'; // Ensure this import is correct
import './RegisterSuccess.css';

const RegisterSuccess = () => {
  return (
    <div className="register-success-container">
      <div className="register-success-box">
        <h2>Registration Successful</h2>
        <p>Your account has been successfully created.</p>
        <Link to="/login" className="btn-login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
