import styled from "@emotion/styled";

export const DashboardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.large};
  background: radial-gradient(
      circle at top left,
      rgba(25, 30, 60, 1) 0%,
      rgba(20, 25, 50, 0.9) 40%,
      rgba(10, 15, 30, 1) 100%
    ),
    linear-gradient(
      135deg,
      rgba(88, 70, 246, 0.3) 0%,
      rgba(26, 115, 232, 0.2) 60%,
      rgba(20, 25, 50, 1) 100%
    );

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.medium};
  }
`;

export const Sidebar = styled.div`
  margin-top: 6rem;
  width: 220px;
  background-color: #1a1a2e; /* Dark background for sidebar */
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-right: ${({ theme }) => theme.spacing.large};

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.large};
    padding: ${({ theme }) => theme.spacing.medium};
  }
`;

export const SidebarLink = styled.button`
  background: linear-gradient(135deg, #6a5acd, #483d8b); /* Purple gradient */
  color: #ffffff;
  padding: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: ${({ theme }) => theme.radius.default};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-align: center;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size for mobile */
  }
`;

export const MainContent = styled.div`
  margin-top: 6rem;
  flex: 1; /* Take up remaining space */
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-top: ${({ theme }) => theme.spacing.medium};
    width: 100%; /* Full width on mobile */
  }
`;

export const SearchBarWrapper = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.small};
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: ${({ theme }) => theme.spacing.large};

  @media (max-width: 768px) {
    margin-top: ${({ theme }) => theme.spacing.medium};
    width: 100%; /* Full width on mobile */
    max-width: 100%; /* Remove max-width for mobile */
  }
`;
