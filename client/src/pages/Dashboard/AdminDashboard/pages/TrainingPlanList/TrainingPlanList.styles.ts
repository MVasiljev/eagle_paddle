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
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.radius.default};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const ActionButton = styled.button`
  margin-left: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryBlue};
  }
`;
