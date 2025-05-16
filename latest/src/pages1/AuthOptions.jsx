import React from 'react';
import { Link } from 'react-router-dom';
import './AuthOptions.css';

const AuthPage = () => {
  return (
    <div className="auth-container">
      <h2>Welcome to Timetable Generator</h2>
      <div className="auth-options">
        <Link to="/login" className="auth-btn login-btn">Login</Link>
        <Link to="/signup" className="auth-btn signup-btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default AuthPage;