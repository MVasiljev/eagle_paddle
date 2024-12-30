import styled from "@emotion/styled";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #121212; /* Match the dark background */
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Subtle shadow */
  max-width: 900px; /* Set a reasonable max width */
  margin: 0 auto; /* Center the search bar */
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1); /* Subtle light shadow */

  @media (max-width: 768px) {
    max-width: 90%; /* Adjust for smaller screens */
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  padding: ${({ theme }) => theme.spacing.small};

  &::placeholder {
    color: ${({ theme }) => theme.colors.lightGray}; /* Placeholder color */
  }

  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const SearchIconContainer = styled.div`
  color: ${({ theme }) => theme.colors.lightGray}; /* Icon color */
  margin-right: ${({ theme }) => theme.spacing.small};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryBlue};
  }
`;
