// src/components/ClubForm.styles.ts
import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: #121212;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin: ${({ theme }) => theme.spacing.large} auto;
  width: 100%;
  max-width: 600px;
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
  background-color: #1e1e1e;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const Button = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: #ffffff;
  padding: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: ${({ theme }) => theme.spacing.medium};

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }
`;
