import styled from "@emotion/styled";

export const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  background-color: #121212;
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin: auto;
  max-width: 1000px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.large};
  background-color: #121212;
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};

  th,
  td {
    padding: ${({ theme }) => theme.spacing.medium};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }

  th {
    background-color: #1a1a2e;
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.radius.default};
  //   border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
  background-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.default};
  border: 0.1px solid white;
  color: white;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  cursor: pointer;
  transition: all 0.3s ease;

  &.approve-btn {
    background-color: transparent;
    margin-right: ${({ theme }) => theme.spacing.small};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryBlue};
    }
  }

  &.reject-btn {
    background-color: ${({ theme }) => theme.colors.danger};

    &:hover {
      background-color: ${({ theme }) => theme.colors.danger};
    }
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

export const LoadingMessage = styled.p`
  color: ${({ theme }) => theme.colors.primaryBlue};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-top: ${({ theme }) => theme.spacing.large};
`;
