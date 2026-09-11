import { useState } from 'react';
import { LockKeyhole, ShieldCheck, KeyRound, UserRound, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SecurityMeshBackground from '../components/SecurityMeshBackground';
import GlassPanel from '../components/GlassPanel';

import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await axios.post(
        'http://localhost:8080/api/auth/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      navigate('/login', {
        state: {
          message: 'Account created successfully. Please sign in.'
        }
      });

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Unable to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecurityMeshBackground>

      <div className="register-page">

        <div className="register-header">
          <span>LOCKBOX</span>
        </div>

        <div className="register-layout">

          {/* LEFT PANEL */}

          <GlassPanel className="security-info">

            <div className="security-icon">
              <LockKeyhole size={38} />
            </div>

            <h1>
              Your digital vault
              <br />
              starts here.
            </h1>

            <p className="security-description">
              Secure your passwords, API keys and
              private notes in one protected space.
            </p>

            <div className="security-features">

              <div className="security-feature">
                <ShieldCheck size={20} />
                <div>
                  <h3>AES Encryption</h3>
                  <p>Your vault secrets are encrypted before storage.</p>
                </div>
              </div>

              <div className="security-feature">
                <KeyRound size={20} />
                <div>
                  <h3>JWT Authentication</h3>
                  <p>Only authenticated users can access their vault.</p>
                </div>
              </div>

              <div className="security-feature">
                <LockKeyhole size={20} />
                <div>
                  <h3>Private Vault</h3>
                  <p>Your stored items belong only to your account.</p>
                </div>
              </div>

            </div>

          </GlassPanel>


          {/* REGISTER FORM */}

          <GlassPanel className="register-card">

            <div className="register-title">

              <h2>Create your LockBox</h2>

              <p>
                Start securing your digital secrets.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-group">

                <label>Full Name</label>

                <div className="input-wrapper">

                  <UserRound size={18} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                    }
                  </button>

                </div>

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="form-group">

                <label>Confirm Password</label>

                <div className="input-wrapper">

                  <KeyRound size={18} />

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                    }
                  </button>

                </div>

              </div>


              {/* ERROR */}

              {error && (
                <div className="register-error">
                  {error}
                </div>
              )}


              {/* BUTTON */}

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >

                {loading ? (
                  'Creating account...'
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>


            <div className="login-link">

              <span>Already have an account?</span>

              <button onClick={() => navigate('/login')}>
                Login
              </button>

            </div>

          </GlassPanel>

        </div>

      </div>

    </SecurityMeshBackground>
  );
}

export default Register;