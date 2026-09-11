import { LockKeyhole, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SecurityMeshBackground from '../components/SecurityMeshBackground';
import GlassPanel from '../components/GlassPanel';
import './Splash.css';

function Splash() {
  const navigate = useNavigate();

  return (
    <SecurityMeshBackground>

      <div className="splash-container">

        <GlassPanel className="splash-card">

          <div className="splash-icon">
            <LockKeyhole size={42} strokeWidth={1.8} />
          </div>

          <h1>LOCKBOX</h1>

          <p className="splash-tagline">
            Your secrets. Secured.
          </p>

          <p className="splash-description">
            A secure space for your passwords,
            API keys and private notes.
          </p>

          <button
            className="splash-button"
            onClick={() => navigate('/register')}
          >
            <span>Secure your data</span>
            <ArrowRight size={18} />
          </button>

        </GlassPanel>

      </div>

    </SecurityMeshBackground>
  );
}

export default Splash;