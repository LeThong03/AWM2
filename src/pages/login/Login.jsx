import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackGround } from './imports';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({ fullName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.fullName || !formData.password) {
      setError('Full name and password are required.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      console.log('Submitting form data:', formData);
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response:', response);
  
      const data = await response.json(); // Chỉ gọi response.json() một lần
  
      console.log('Data:', data);
  
      if (response.ok) {
        console.log('Login successful:', data.message);
        // Chuyển hướng đến trang được chỉ định từ server
        window.location.href = data.redirect;
      } else {
        setError('Invalid full name or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
          </div>
          <div className="form-group">
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
