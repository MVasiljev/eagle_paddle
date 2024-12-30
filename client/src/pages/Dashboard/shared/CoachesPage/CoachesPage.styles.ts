import styled from "@emotion/styled";

export const CoachesContainer = styled.div`
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

export const CoachesList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.large};
  justify-content: center;
`;

export const CoachCard = styled.div`
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const CoachAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const CoachName = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const CoachEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.subtitle};
  color: ${({ theme }) => theme.colors.lightGray};
`;
