/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { Views } from "../../constants/views"; // Import the enum
import {
  HeaderContainer,
  LogoSection,
  Logo,
  NavLinks,
  NavLink,
  ActionsContainer,
  AvatarMenu,
} from "./Header.styles";
import { setView } from "../../redux/slices/viewSlice";

const Header: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
  };

  const roleName = user?.role?.name || "unknown";

  const renderLinks = () => {
    switch (roleName) {
      case "admin":
        return (
          <>
            <NavLink onClick={() => dispatch(setView(Views.CALENDAR))}>
              Početna
            </NavLink>

            <NavLink onClick={() => dispatch(setView(Views.COMPETITORS))}>
              Takmičari
            </NavLink>
            <NavLink onClick={() => dispatch(setView(Views.COACHES))}>
              Treneri
            </NavLink>
            <NavLink onClick={() => dispatch(setView(Views.REQUESTS))}>
              Zahtevi za odobrenje
            </NavLink>
            {/* <NavLink
              onClick={() => dispatch(setView(Views.MENTAL_HEALTH_HISTORY))}
            >
              Mentalno zdravlje
            </NavLink>
            <NavLink onClick={() => dispatch(setView(Views.REQUESTS))}>
              Statistika
            </NavLink> */}
          </>
        );
      case "coach":
        return (
          <>
            <NavLink onClick={() => dispatch(setView(Views.CALENDAR))}>
              Početna
            </NavLink>

            <NavLink onClick={() => dispatch(setView(Views.PLAN))}>
              Kreiraj trening
            </NavLink>
            <NavLink onClick={() => dispatch(setView(Views.ASSIGN))}>
              Dodeli trening
            </NavLink>
            <NavLink onClick={() => dispatch(setView(Views.COMPETITORS))}>
              Takmičari
            </NavLink>
            <NavLink onClick={() => dispatch(setView(Views.MY_TEAM))}>
              Moj tim
            </NavLink>
          </>
        );
      case "competitor":
        return (
          <>
            <NavLink onClick={() => dispatch(setView(Views.CALENDAR))}>
              Početna
            </NavLink>
            <NavLink onClick={() => dispatch(setView(Views.MY_PROFILE))}>
              Moj profil
            </NavLink>
            <NavLink
              onClick={() => dispatch(setView(Views.MENTAL_HEALTH_CREATE))}
            >
              Tvoj Dan
            </NavLink>
            <NavLink
              onClick={() => dispatch(setView(Views.MY_MENTAL_HEALTH_HISTORY))}
            >
              Istorija raspoloženja
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <HeaderContainer>
      <LogoSection>
        <Logo>EAGLE PADDLE</Logo>
        <NavLinks>{renderLinks()}</NavLinks>
      </LogoSection>
      <ActionsContainer>
        {token && (
          <AvatarMenu>
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
          </AvatarMenu>
        )}
      </ActionsContainer>
    </HeaderContainer>
  );
};

export default Header;
