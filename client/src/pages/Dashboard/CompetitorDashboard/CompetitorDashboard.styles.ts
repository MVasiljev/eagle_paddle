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

export const MainContent = styled.div`
  margin-top: 6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: ${({ theme }) => theme.spacing.medium};
  }
`;

export const ContentCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.small};
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: ${({ theme }) => theme.spacing.medium};

  @media (max-width: 768px) {
    margin-top: ${({ theme }) => theme.spacing.medium};
    width: 100%;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 90vh; // Add maximum height of 90% of viewport height
  height: auto; // Allow content to determine height up to max-height
  overflow-y: auto; // Enable vertical scrolling if content exceeds max-height
  background: #121212;
  border-radius: ${({ theme }) => theme.radius?.default || "8px"};
  box-shadow: ${({ theme }) =>
    theme.shadows?.card || "0 4px 6px rgba(0, 0, 0, 0.1)"};
  padding: 1rem; // Add padding to ensure content doesn't touch edges
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  padding: 0.5rem;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;
