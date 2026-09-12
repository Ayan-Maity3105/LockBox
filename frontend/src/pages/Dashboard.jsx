import { useEffect, useMemo, useState } from "react";

import {
  LayoutDashboard,
  LockKeyhole,
  KeyRound,
  Link,
  FileText,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Search,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import SecurityMeshBackground from "../components/SecurityMeshBackground";
import GlassPanel from "../components/GlassPanel";
import api from "../services/api";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ================= USER =================

  const [userName] = useState(localStorage.getItem("name") || "User");

  // ================= VAULT =================

  const [vaultItems, setVaultItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= SEARCH =================

  const [searchTerm, setSearchTerm] = useState("");

  // ================= SECRET VISIBILITY =================

  const [visibleSecrets, setVisibleSecrets] = useState({});

  useEffect(() => {
    const handlePageShow = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          replace: true,
        });
      }
    };  

    window.addEventListener("pageshow", handlePageShow);

    handlePageShow();

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [navigate]);

  // ================= FETCH VAULT =================

  useEffect(() => {
    fetchVaultItems();
  }, []);

  const fetchVaultItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/vault");

      setVaultItems(response.data);
    } catch (err) {
      console.error("Failed to fetch vault:", err);

      if (err.response?.status === 401) {
        localStorage.clear();

        navigate("/login");

        return;
      }

      setError("Unable to load your vault. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= COUNTS =================

  const totalSecrets = vaultItems.length;

  const passwordCount = vaultItems.filter(
    (item) => item.type?.toLowerCase() === "password",
  ).length;

  const apiKeyCount = vaultItems.filter(
    (item) =>
      item.type?.toLowerCase() === "api key" ||
      item.type?.toLowerCase() === "apikey",
  ).length;

  const noteCount = vaultItems.filter(
    (item) =>
      item.type?.toLowerCase() === "note" ||
      item.type?.toLowerCase() === "secret note",
  ).length;

  // ================= SEARCH =================

  const filteredItems = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return vaultItems;
    }

    return vaultItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(search) ||
        item.type?.toLowerCase().includes(search) ||
        item.username?.toLowerCase().includes(search) ||
        item.website?.toLowerCase().includes(search),
    );
  }, [vaultItems, searchTerm]);

  // ================= SECRET TOGGLE =================

  const toggleSecret = (id) => {
    setVisibleSecrets((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/login", {
      replace: true,
    });
  };

  // ================= ICON =================

  const getVaultIcon = (type) => {
    const normalizedType = type?.toLowerCase();

    if (normalizedType === "password") {
      return <KeyRound size={18} />;
    }

    if (normalizedType === "api key" || normalizedType === "apikey") {
      return <Link size={18} />;
    }

    return <FileText size={18} />;
  };

  // ================= RENDER =================

  return (
    <SecurityMeshBackground>
      <div className="dashboard-page">
        <div className="dashboard-layout">
          {/* ================= SIDEBAR ================= */}

          <GlassPanel className="dashboard-sidebar">
            <div className="sidebar-brand">
              <LockKeyhole size={22} />

              <span>LOCKBOX</span>
            </div>

            <nav className="sidebar-nav">
              <button className="nav-item active">
                <LayoutDashboard size={17} />

                <span>Dashboard</span>
              </button>

              <button className="nav-item">
                <LockKeyhole size={17} />

                <span>Vault</span>
              </button>

              <button className="nav-item">
                <KeyRound size={17} />

                <span>Passwords</span>
              </button>

              <button className="nav-item">
                <Link size={17} />

                <span>API Keys</span>
              </button>

              <button className="nav-item">
                <FileText size={17} />

                <span>Notes</span>
              </button>
            </nav>

            <div className="sidebar-bottom">
              <button className="nav-item">
                <Settings size={17} />

                <span>Settings</span>
              </button>

              <button className="nav-item logout-item" onClick={handleLogout}>
                <LogOut size={17} />

                <span>Logout</span>
              </button>
            </div>
          </GlassPanel>

          {/* ================= MAIN ================= */}

          <GlassPanel className="dashboard-main">
            {/* ================= HEADER ================= */}

            <header className="dashboard-header">
              <div>
                <span className="dashboard-label">SECURE DASHBOARD</span>

                <h1>Welcome back, {userName} 👋</h1>

                <p>Your digital vault is protected.</p>
              </div>

              <div className="vault-protection">
                <span className="protection-dot"></span>
                Vault Protected
              </div>
            </header>

            {/* ================= KPI ================= */}

            <section className="stats-grid">
              <div className="stat-card">
                <LockKeyhole size={19} />

                <div>
                  <strong>{totalSecrets}</strong>

                  <span>Total Secrets</span>
                </div>
              </div>

              <div className="stat-card">
                <KeyRound size={19} />

                <div>
                  <strong>{passwordCount}</strong>

                  <span>Passwords</span>
                </div>
              </div>

              <div className="stat-card">
                <Link size={19} />

                <div>
                  <strong>{apiKeyCount}</strong>

                  <span>API Keys</span>
                </div>
              </div>

              <div className="stat-card">
                <FileText size={19} />

                <div>
                  <strong>{noteCount}</strong>

                  <span>Notes</span>
                </div>
              </div>
            </section>

            {/* ================= VAULT ================= */}

            <section className="vault-section">
              <div className="vault-header">
                <div>
                  <h2>Your Vault</h2>

                  <p>Your encrypted secrets</p>
                </div>

                <button
                  className="add-secret-button"
                  onClick={() => {
                    // Add Secret modal will be added next
                  }}
                >
                  <Plus size={16} />
                  Add Secret
                </button>
              </div>

              {/* SEARCH */}

              <div className="search-box">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search your secrets..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              {/* ================= LOADING ================= */}

              {loading && (
                <div className="vault-state">Loading your vault...</div>
              )}

              {/* ================= ERROR ================= */}

              {!loading && error && (
                <div className="vault-state vault-error">{error}</div>
              )}

              {/* ================= EMPTY ================= */}

              {!loading && !error && filteredItems.length === 0 && (
                <div className="vault-state">
                  {searchTerm
                    ? "No secrets match your search."
                    : "Your vault is empty."}
                </div>
              )}

              {/* ================= ITEMS ================= */}

              {!loading && !error && filteredItems.length > 0 && (
                <div className="vault-list">
                  {filteredItems.slice(0, 5).map((item) => (
                    <div className="vault-item" key={item.id}>
                      {/* ICON */}

                      <div className="vault-item-icon">
                        {getVaultIcon(item.type)}
                      </div>

                      {/* INFORMATION */}

                      <div className="vault-item-info">
                        <strong>{item.title}</strong>

                        <span>
                          {item.username || item.website || "Secure item"}
                        </span>
                      </div>

                      {/* TYPE */}

                      <span className="vault-type">{item.type}</span>

                      {/* SECRET */}

                      <span className="vault-secret">
                        {visibleSecrets[item.id] ? item.secret : "•••••••••"}
                      </span>

                      {/* ACTIONS */}

                      <div className="vault-actions">
                        <button
                          title="Show / Hide"
                          onClick={() => toggleSecret(item.id)}
                        >
                          {visibleSecrets[item.id] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>

                        <button title="Edit">
                          <Pencil size={14} />
                        </button>

                        <button title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </GlassPanel>
        </div>
      </div>
    </SecurityMeshBackground>
  );
}

export default Dashboard;
