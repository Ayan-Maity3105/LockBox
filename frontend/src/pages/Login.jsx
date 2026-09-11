import { useState } from 'react';
import {
  LockKeyhole,
  ArrowRight,
  KeyRound,
  Eye,
  EyeOff,
  UnlockKeyhole
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import SecurityMeshBackground from '../components/SecurityMeshBackground';
import GlassPanel from '../components/GlassPanel';

import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loginStatus, setLoginStatus] = useState('locked');
  const [error, setError] = useState('');

  const [successMessage] = useState(
    location.state?.message || ''
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoginStatus('loading');
      setError('');

      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email: formData.email,
          password: formData.password
        }
      );

      const { token, userId, name, email } = response.data;

      // Store authentication data
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

      // Unlock animation
      setLoginStatus('unlocked');

      // Give the animation time to play
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      setLoginStatus('locked');

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Unable to login. Please check your credentials.');
      }
    }
  };

  const isLoading = loginStatus === 'loading';

  return (
    <SecurityMeshBackground>

      <div className="login-page">

        {/* BRAND */}

        <div className="login-header">
          <span>LOCKBOX</span>
        </div>


        <div className="login-layout">

          {/* LEFT - LOGIN FORM */}

          <GlassPanel className="login-card">

            <div className="login-title">

              <h1>Welcome back</h1>

              <p>
                Access your secure digital vault.
              </p>

            </div>


            {/* SUCCESS MESSAGE FROM REGISTER */}

            {successMessage && (
              <div className="login-success-message">
                ✓ {successMessage}
              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

              <div className="form-group">

                <label>Email Address</label>

                <div className="input-wrapper">

                  <span className="input-symbol">@</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label>Password</label>

                <div className="input-wrapper">

                  <KeyRound size={18} />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                    }
                  </button>

                </div>

              </div>


              {/* ERROR */}

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="login-button"
                disabled={isLoading || loginStatus === 'unlocked'}
              >

                {isLoading ? (
                  'Authenticating...'
                ) : loginStatus === 'unlocked' ? (
                  'Vault unlocked'
                ) : (
                  <>
                    Login
                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>


            {/* REGISTER LINK */}

            <div className="register-link">

              <span>Don't have an account?</span>

              <button onClick={() => navigate('/register')}>
                Create one
              </button>

            </div>

          </GlassPanel>


          {/* RIGHT - VAULT STATUS */}

          <GlassPanel className="vault-card">

            <div
              className={`vault-icon ${
                loginStatus === 'unlocked'
                  ? 'vault-unlocked'
                  : ''
              }`}
            >

              {loginStatus === 'unlocked' ? (
                <UnlockKeyhole
                  size={48}
                  strokeWidth={1.6}
                />
              ) : (
                <LockKeyhole
                  size={48}
                  strokeWidth={1.6}
                />
              )}

            </div>


            <h2>LOCKBOX VAULT</h2>

            <p className="vault-message">
              Your secrets are waiting.
            </p>


            <div className="vault-divider"></div>


            <div
              className={`vault-status ${
                loginStatus === 'unlocked'
                  ? 'status-unlocked'
                  : ''
              }`}
            >

              {loginStatus === 'unlocked'
                ? 'UNLOCKED'
                : 'LOCKED'}

            </div>


            {isLoading && (
              <p className="authenticating-text">
                Authenticating...
              </p>
            )}

          </GlassPanel>

        </div>

      </div>

    </SecurityMeshBackground>
  );
}

export default Login;