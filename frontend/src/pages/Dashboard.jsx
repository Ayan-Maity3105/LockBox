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
import AddSecretModal from "../components/AddSecretModal";
import EditSecretModal from "../components/EditSecretModal";

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

  const [showAddSecret, setShowAddSecret] = useState(false);

  const [showEditSecret, setShowEditSecret] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [activeSection, setActiveSection] = useState("Dashboard");

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
    let items = vaultItems;

    if (activeSection === "Passwords") {
      items = items.filter((item) => item.type?.toLowerCase() === "password");
    }

    if (activeSection === "API Keys") {
      items = items.filter(
        (item) =>
          item.type?.toLowerCase() === "api key" ||
          item.type?.toLowerCase() === "apikey",
      );
    }

    if (activeSection === "Notes") {
      items = items.filter(
        (item) =>
          item.type?.toLowerCase() === "note" ||
          item.type?.toLowerCase() === "secret note",
      );
    }

    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return items;
    }

    return items.filter(
      (item) =>
        item.title?.toLowerCase().includes(search) ||
        item.type?.toLowerCase().includes(search) ||
        item.username?.toLowerCase().includes(search) ||
        item.website?.toLowerCase().includes(search),
    );
  }, [vaultItems, searchTerm, activeSection]);

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
              <button
                className={
                  activeSection === "Dashboard" ? "nav-item active" : "nav-item"
                }
                onClick={() => setActiveSection("Dashboard")}
              >
                <LayoutDashboard size={17} />

                <span>Dashboard</span>
              </button>

              <button
                className={
                  activeSection === "Vault" ? "nav-item active" : "nav-item"
                }
                onClick={() => setActiveSection("Vault")}
              >
                <LockKeyhole size={17} />
                <span>Vault</span>
              </button>

              <button
                className={
                  activeSection === "Passwords" ? "nav-item active" : "nav-item"
                }
                onClick={() => setActiveSection("Passwords")}
              >
                <KeyRound size={17} />
                <span>Passwords</span>
              </button>

              <button
                className={
                  activeSection === "API Keys" ? "nav-item active" : "nav-item"
                }
                onClick={() => setActiveSection("API Keys")}
              >
                <Link size={17} />
                <span>API Keys</span>
              </button>

              <button
                className={
                  activeSection === "Notes" ? "nav-item active" : "nav-item"
                }
                onClick={() => setActiveSection("Notes")}
              >
                <FileText size={17} />
                <span>Notes</span>
              </button>
            </nav>

            <div className="sidebar-bottom">
              <button
                className="nav-item"
                onClick={() => navigate("/settings")}
              >
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
                  <h2>
                    {activeSection === "Dashboard"
                      ? "Your Vault"
                      : activeSection === "Vault"
                        ? "Your Vault"
                        : `Your ${activeSection}`}
                  </h2>

                  <p>
                    {activeSection === "Dashboard"
                      ? "Your encrypted secrets"
                      : `Manage your stored ${activeSection.toLowerCase()}`}
                  </p>
                </div>

                <button
                  className="add-secret-button"
                  onClick={() => setShowAddSecret(true)}
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

                        <button
                          title="Edit"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowEditSecret(true);
                          }}
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          title="Delete"
                          onClick={async () => {
                            const confirmed = window.confirm(
                              `Delete "${item.title}" permanently?`,
                            );

                            if (!confirmed) {
                              return;
                            }

                            try {
                              await api.delete(`/vault/${item.id}`);

                              await fetchVaultItems();
                            } catch (err) {
                              console.error(
                                "Failed to delete vault item:",
                                err,
                              );

                              alert(
                                "Unable to delete secret. Please try again.",
                              );
                            }
                          }}
                        >
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

      {showAddSecret && (
        <AddSecretModal
          onClose={() => setShowAddSecret(false)}
          onCreated={fetchVaultItems}
        />
      )}

      {showEditSecret && selectedItem && (
        <EditSecretModal
          item={selectedItem}
          onClose={() => {
            setShowEditSecret(false);
            setSelectedItem(null);
          }}
          onUpdated={fetchVaultItems}
        />
      )}
    </SecurityMeshBackground>
  );
}

export default Dashboard;
