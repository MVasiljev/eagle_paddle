import styled from "@emotion/styled";

export const TrainingEventContainer = styled.div`
  background-color: #121212;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  max-width: 600px;
  margin: 0 auto;
`;

export const TrainingTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.hero};
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const ShowIcon = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const EditIcon = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const CompetitorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.large};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const CompetitorCard = styled.div`
  background-color: transparent; /* Transparent background */
  //   border: 1px solid ${({ theme }) =>
    theme.colors.primaryBlue}; /* Blue border */
  border-radius: ${({ theme }) => theme.radius.default};
  //   padding: ${({ theme }) => theme.spacing.small};
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px ${({ theme }) => theme.colors.primaryBlue};
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
