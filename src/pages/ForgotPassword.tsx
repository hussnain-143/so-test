import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';

const ForgotPassword: React.FC = () => {
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="Solo" style={{ height: 60 }} />
        </div>
        
        {!sent ? (
          <>
            <div className="login-header">
              <h1>Forgot Password</h1>
              <p>Enter your email address to receive a password reset link.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address <span>*</span></label>
                <div className="form-input-container">
                  <Mail size={18} className="form-icon" />
                  <input type="email" required className="form-input" placeholder="Enter your email address" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full" style={{ padding: '14px', marginBottom: '16px' }}>
                Send Reset Link
              </button>
              
              <div className="flex justify-center text-sm">
                <Link to="/login" className="text-muted" style={{textDecoration: 'underline'}}>Back to Login</Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="login-header">
              <h1 style={{color: 'var(--primary)'}}>Check your email</h1>
              <p>We've sent a password reset link to your email address. Please check your inbox and follow the instructions.</p>
            </div>
            <Link to="/login" className="btn btn-outline w-full">Back to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
