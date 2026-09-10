import SecurityMeshBackground from './components/SecurityMeshBackground';
import GlassPanel from './components/GlassPanel';

function App() {
  return (
    <SecurityMeshBackground>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}
      >

        <GlassPanel>
          <div
            style={{
              padding: '50px',
              textAlign: 'center'
            }}
          >

            <div style={{ fontSize: '48px' }}>
              🔐
            </div>

            <h1
              style={{
                marginTop: '15px',
                fontSize: '36px'
              }}
            >
              LOCKBOX
            </h1>

            <p
              style={{
                marginTop: '10px',
                color: 'var(--text-secondary)'
              }}
            >
              Your secrets. Secured.
            </p>

          </div>
        </GlassPanel>

      </div>

    </SecurityMeshBackground>
  );
}

export default App;