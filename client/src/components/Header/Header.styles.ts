import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  //   top: 0;
  left: 1rem;
  right: 1rem;
  background: rgba(10, 15, 30, 0.7); /* Semi-transparent dark background */
  padding: 0; /* Reset padding to prevent size issues */
  z-index: 100; /* Keep it above other elements */
  box-sizing: border-box; /* Ensure consistent width calculations */
  height: 100px; /* Set a fixed height to avoid overflow */
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column; /* Stack logo and links vertically */
  align-items: flex-start; /* Align logo and links to the left */
  gap: ${({ theme }) =>
    theme.spacing.small}; /* Add spacing between logo and links */
  margin-top: ${({ theme }) => theme.spacing.small}; /* Add top margin */
  margin-left: ${({ theme }) => theme.spacing.medium}; /* Add left margin */
`;

export const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.sizes.subtitle};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  flex-wrap: wrap; /* Ensure links wrap if they exceed available space */
  padding-left: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.lightGray};
    cursor: pointer;
  }

  &:active {
    color: ${({ theme }) => theme.colors.darkBlue};
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const AvatarMenu = styled.div`
  position: relative;

  .avatar {
    border-radius: 50%;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: ${({ theme }) => theme.spacing.medium};
  }

  .menu {
    position: absolute;
    top: 50px;
    right: 0;
    background: ${({ theme }) => theme.colors.darkGray};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.small};
    border-radius: ${({ theme }) => theme.radius.default};
    box-shadow: ${({ theme }) => theme.shadows.card};
    width: 200px;
  }

  .logout-btn {
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: ${({ theme }) => theme.spacing.small};
    border-radius: ${({ theme }) => theme.radius.default};
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.sizes.body};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryBlue};
    }
  }
`;
