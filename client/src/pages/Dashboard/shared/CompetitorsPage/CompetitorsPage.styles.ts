import styled from "@emotion/styled";

export const CompetitorsContainer = styled.div`
  background-color: #1a1a2e;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  justify-content: center;

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    font-size: ${({ theme }) => theme.typography.sizes.hero};
    color: ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const CompetitorsList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  display: flex; /* Use flexbox for centering */
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.large}; /* Adjust gap between cards */
  justify-content: center; /* Center the cards horizontally */
`;

export const CompetitorCard = styled.div`
  //   background-color: ${({ theme }) => theme.colors.darkGray};
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow to card */
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px ${({ theme }) => theme.colors.primaryBlue}; /* Enhance shadow on hover */
  }
`;

export const CompetitorAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const CompetitorName = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const ExportButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;
