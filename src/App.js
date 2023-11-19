import React, { useState } from 'react';
import AdminPage from './components/Sam1';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform authentication using the provided API
      const response = await fetch('https://stg.dhunjam.in/account/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        // Authentication successful
        setLoginSuccess(true);
      } else {
        // Authentication failed
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setLoginSuccess(false);
    }
  };

  return (
    <div className="login-container">
      {loginSuccess ? (
        <AdminPage />
      ) : (
        <>
          <style>
            {`
              body {
                background-color: #030303;
                font-family: 'Poppins', sans-serif;
                color: #ffffff;
              }

              .login-container {
                max-width: 600px;
                margin: auto;
                padding: 20px;
                border: 1px solid #fff; /* White border for the input fields */
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                background-color: #030303;
                text-align: center;
              }

              h2 {
                color: #ffffff;
              }

              form {
                display: flex;
                flex-direction: column;
              }

              label {
                margin-bottom: 8px;
              }

              input {
                width: calc(100% - 16px);
                padding: 8px;
                margin-bottom: 12px;
                box-sizing: border-box;
                border: 1px solid #ffffff; /* White border for the input fields */
                background-color: transparent;
                color: #ffffff;
              }

              button {
                background-color: #6741D9;
                color: white;
                padding: 10px;
                border: 1px solid #fff; /* White border for the button */
                border-radius: 4px;
                cursor: pointer;
              }

              button:hover, button:active {
                border-color: #F0C3F1;
                background-color: #6741D9;
              }
            `}
          </style>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
