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
  flex: 1;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: ${({ theme }) => theme.spacing.large};

  @media (max-width: 768px) {
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.medium};
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const ActionButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const ModalContent = styled.div`
  h2 {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
  }

  li {
    margin: 10px 0;
    display: flex;
    align-items: center;
  }

  label {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;

export const ConfirmButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  background-color: #dc3545;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;
