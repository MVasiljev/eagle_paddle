import styled from "@emotion/styled";

export const TrainingReportContainer = styled.div`
  background-color: #121212;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  max-width: 800px;
  margin: 0 auto;
`;

export const TrainingTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.hero};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

export const CompetitorInfo = styled.div`
  display: flex;
  //   justify-content: center;
  margin-left: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const CompetitorAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

export const CompetitorName = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
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

export const DataGroup = styled.div`
  display: flex;
  //   flex-direction: column; /* Changed from row to column for vertical layout */
  gap: ${({ theme }) => theme.spacing.medium};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  align-items: center; /* Centers the content */
`;

export const DataItem = styled.div`
  //   background-color: ${({ theme }) => theme.colors.darkGray};
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ theme }) => theme.spacing.small};
  width: 100%; /* Full width to ensure consistent item size */
  text-align: center;
  display: flex;
  flex-direction: column; /* Stack icon and text vertically */
  justify-content: center;
  align-items: center; /* Center icon and text horizontally */
`;

export const DescriptionText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const ChartContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;
