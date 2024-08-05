import React from 'react';
import "../Css/signup.css";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

const Signup = ({ loginCredentials, setLoginCredentials }) => {
    const navigate = useNavigate();

    const handleSuccess = (response) => {
        console.log('Login Success:', response);
        // Handle successful login, e.g., set user state or send token to backend
    };

    const handleFailure = (error) => {
        console.log('Login Failure:', error);
        // Handle failed login
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
  
      try {
          const response = await fetch('https://email-template-generator-backend.vercel.app/register', { // Updated to Vercel serverless function
              method: 'POST',
              body: formData
          });
  
          if (response.ok) {
              document.getElementById('form-feedback').classList.remove('hidden');
              form.reset();
              // Redirect to login page after successful signup
              navigate('/login');
          } else {
              const errorData = await response.json();
              console.error('Error:', errorData);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
      

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1>Create an Account</h1>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" required />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    <div id="form-feedback" className="hidden">Sign up successful!</div>
                </form>
                <p>Already have an account? <span 
                    onClick={() => navigate("/login")} 
                    style={{
                        cursor: "pointer",
                        color: "blue",
                    }}
                >Login here</span></p>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                    buttonText="Login with Google"
                />
            </div>
        </div>
    );
};

export default Signup;
