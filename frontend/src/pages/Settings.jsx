import {
  LockKeyhole,
  ShieldCheck,
  KeyRound,
  UserRound,
  ArrowLeft,
  LogOut
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import SecurityMeshBackground from '../components/SecurityMeshBackground';
import GlassPanel from '../components/GlassPanel';

import './Settings.css';


function Settings() {

  const navigate = useNavigate();

  const userName =
    localStorage.getItem('name') || 'User';

  const email =
    localStorage.getItem('email') || '';


  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    navigate('/login', {
      replace: true
    });
  };


  return (

    <SecurityMeshBackground>

      <div className="settings-page">

        <GlassPanel className="settings-container">

          {/* HEADER */}

          <div className="settings-header">

            <button
              className="back-button"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </button>

            <div className="settings-heading">

              <span className="settings-label">
                ACCOUNT CONFIGURATION
              </span>

              <h1>Settings</h1>

              <p>
                Manage your LockBox account and security information.
              </p>

            </div>

          </div>


          {/* PROFILE */}

          <section className="settings-section">

            <div className="section-title">

              <UserRound size={18} />

              <div>
                <h2>Profile</h2>
                <p>Your account information</p>
              </div>

            </div>


            <div className="profile-card">

              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div className="profile-info">

                <strong>{userName}</strong>

                <span>{email}</span>

              </div>

            </div>

          </section>


          {/* ACCOUNT */}

          <section className="settings-section account-section">

            <div className="section-title">

              <LogOut size={18} />

              <div>
                <h2>Account</h2>
                <p>Manage your current session</p>
              </div>

            </div>


            <button
              className="settings-logout"
              onClick={handleLogout}
            >

              <LogOut size={17} />

              Logout from LockBox

            </button>

          </section>

        </GlassPanel>

      </div>

    </SecurityMeshBackground>
  );
}


export default Settings;