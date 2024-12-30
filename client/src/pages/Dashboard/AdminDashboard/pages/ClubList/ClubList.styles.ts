// src/components/ClubList.styles.ts
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

export const CategoryList = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.medium};
  list-style: none;
  padding: 0;
`;

export const CategoryItem = styled.li`
  background-color: #1e1e1e;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.radius.default};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primaryBlue};
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: ${({ theme }) => theme.spacing.small};

  &:hover {
    color: ${({ theme }) => theme.colors.secondaryBlue};
  }
`;
