import './SecurityMeshBackground.css';

function SecurityMeshBackground({ children }) {
  return (
    <div className="security-page">

      <svg
        className="security-mesh"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        {/* Network connections */}
        <g className="mesh-lines">
          <line x1="50" y1="120" x2="300" y2="250" />
          <line x1="300" y1="250" x2="520" y2="100" />
          <line x1="520" y1="100" x2="760" y2="220" />
          <line x1="760" y1="220" x2="1020" y2="80" />
          <line x1="1020" y1="80" x2="1300" y2="200" />
          <line x1="1300" y1="200" x2="1550" y2="100" />

          <line x1="300" y1="250" x2="420" y2="500" />
          <line x1="420" y1="500" x2="760" y2="220" />
          <line x1="760" y1="220" x2="850" y2="520" />
          <line x1="850" y1="520" x2="1020" y2="80" />
          <line x1="1020" y1="80" x2="1180" y2="470" />
          <line x1="1180" y1="470" x2="1300" y2="200" />

          <line x1="420" y1="500" x2="180" y2="700" />
          <line x1="420" y1="500" x2="650" y2="760" />
          <line x1="650" y1="760" x2="850" y2="520" />
          <line x1="850" y1="520" x2="1100" y2="780" />
          <line x1="1100" y1="780" x2="1180" y2="470" />
          <line x1="1180" y1="470" x2="1450" y2="700" />

          <line x1="180" y1="700" x2="50" y2="850" />
          <line x1="650" y1="760" x2="500" y2="880" />
          <line x1="1100" y1="780" x2="1350" y2="880" />
          <line x1="1450" y1="700" x2="1550" y2="850" />
        </g>

        {/* Glowing nodes */}
        <g className="mesh-nodes">
          <circle cx="50" cy="120" r="3" />
          <circle cx="300" cy="250" r="4" />
          <circle cx="520" cy="100" r="3" />
          <circle cx="760" cy="220" r="4" />
          <circle cx="1020" cy="80" r="4" />
          <circle cx="1300" cy="200" r="3" />
          <circle cx="1550" cy="100" r="3" />

          <circle cx="420" cy="500" r="4" />
          <circle cx="850" cy="520" r="4" />
          <circle cx="1180" cy="470" r="4" />

          <circle cx="180" cy="700" r="3" />
          <circle cx="650" cy="760" r="4" />
          <circle cx="1100" cy="780" r="4" />
          <circle cx="1450" cy="700" r="3" />

          <circle cx="50" cy="850" r="3" />
          <circle cx="500" cy="880" r="3" />
          <circle cx="1350" cy="880" r="3" />
          <circle cx="1550" cy="850" r="3" />
        </g>
      </svg>

      <div className="mesh-glow mesh-glow-purple"></div>
      <div className="mesh-glow mesh-glow-cyan"></div>

      <div className="security-content">
        {children}
      </div>

    </div>
  );
}

export default SecurityMeshBackground;