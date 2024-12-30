import styled from "@emotion/styled";

export const ProfileContainer = styled.div`
  background-color: #121212;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin: ${({ theme }) => theme.spacing.large} auto;
  max-width: 900px;
  min-width: 80%;
`;
export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.white};

  h1 {
    font-size: ${({ theme }) => theme.typography.sizes.hero};
    margin-left: ${({ theme }) =>
      theme.spacing.medium}; /* Add space between avatar and name */
  }

  p {
    color: ${({ theme }) => theme.colors.primaryBlue};
    font-size: ${({ theme }) => theme.typography.sizes.body};
    margin-left: ${({ theme }) => theme.spacing.medium};
  }
`;

export const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px; /* Square with slightly rounded corners */
  object-fit: cover;
`;

export const ProfileDetails = styled.div`
  color: ${({ theme }) => theme.colors.white};
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.small} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const Label = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;
