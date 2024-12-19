import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { AiOutlineMenu, AiOutlineArrowLeft } from "react-icons/ai";

const Header: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false); // Close the mobile menu after logout
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false); // Close the mobile menu after navigation
  };

  const roleName = user?.role?.name || "unknown";

  const renderLinks = () => {
    switch (roleName) {
      case "admin":
        return (
          <>
            <a onClick={() => handleNavigation("/dashboard/admin")}>Home</a>
            <a onClick={() => handleNavigation("/dashboard/admin/profile")}>
              Profile
            </a>
            <a onClick={() => handleNavigation("/dashboard/admin/requests")}>
              Requests for Approval
            </a>
            <a
              onClick={() => handleNavigation("/dashboard/admin/training-plan")}
            >
              Trainings
            </a>
            <a onClick={() => handleNavigation("/dashboard/admin/competitors")}>
              Competitors
            </a>
            <a onClick={() => handleNavigation("/dashboard/admin/coaches")}>
              Coaches
            </a>
          </>
        );
      case "coach":
        return (
          <>
            <a onClick={() => handleNavigation("/dashboard/coach")}>Home</a>
            <a
              onClick={() => handleNavigation("/dashboard/coach/training-plan")}
            >
              Trainings
            </a>
            <a onClick={() => handleNavigation("/dashboard/admin/competitors")}>
              Competitors
            </a>
          </>
        );
      case "competitor":
        return (
          <>
            {/* <a onClick={() => handleNavigation("/dashboard/events")}>
              My Events
            </a>
            <a onClick={() => handleNavigation("/dashboard/stats")}>My Stats</a> */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className={`header ${token ? "logged-in" : "logged-out"}`}>
      <div className={`logo ${token ? "black-text" : "white-text"}`}>
        EAGLE PADDLE
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger-menu">
        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <AiOutlineArrowLeft size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>

      <nav className={`nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
        {renderLinks()}
      </nav>

      <div className="actions">
        {token && (
          <>
            <div className="avatar-menu">
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="avatar"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="menu">
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
