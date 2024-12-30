import styled from "@emotion/styled";

export const ListContainer = styled.div`
  background-color: #121212;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin: ${({ theme }) => theme.spacing.large} auto;
  width: 100%;
  max-width: 900px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1c1c;
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.radius.default};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const ListDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const ActionButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.radius.default};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const DeleteButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.danger};

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
  }
`;
