import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: #121212;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin: ${({ theme }) => theme.spacing.large} auto;
  width: 100%;
  max-width: 900px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const InputField = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #121212;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  margin: ${({ theme }) => theme.spacing.medium} 0;
  background-color: #121212;
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.radius.default};
  font-size: ${({ theme }) => theme.typography.sizes.body};
`;

export const Button = styled.button`
  width: auto;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.body};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export const AddButton = styled(Button)`
  width: auto;
  margin-left: ${({ theme }) => theme.spacing.small};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CategoryList = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.medium};
  list-style: none;
  padding: 0;
`;

export const CategoryItem = styled.li`
  background-color: #121212;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.radius.default};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RemoveButton = styled.button`
  width: auto;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const SaveButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: #ffffff;
  padding: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }
`;
