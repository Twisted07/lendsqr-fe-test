import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/login.scss';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, perform validation and API call here.
    // For this assessment, any non-empty credential works.
    if (email && password) {
      navigate('/users');
    }
  };

  return (
    <div className="login__container">
      <div className="login__left">
        <div className="logo">
            <img src='/logo.svg' alt='Lendsqr logo' />
        </div>
        <div className="illustration">
          <img src="/pablo-sign-in.png" alt="Login Illustration" />
        </div>
      </div>

      <div className="login__right">
         <div className="logo">
            <img src='/logo.svg' alt='Lendsqr logo' />
        </div>
        <div className="welcome-text">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
        </div>
        <form className="login__form" onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </span>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot PASSWORD?</a>
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
