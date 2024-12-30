import styled from "@emotion/styled";

export const SegmentContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.default};
`;

export const SegmentHeader = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const SegmentField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #1a1a2e;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.secondaryBlue};
  }
`;

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  padding-right: 2rem; /* Add space for the arrow icon */
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #1a1a2e;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  appearance: none; /* Remove the default arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FFFFFF' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 0.5rem) center; /* Adjust arrow position */
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.white};
  }
`;
