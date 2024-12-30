import styled from "@emotion/styled";

export const SegmentContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const SegmentHeader = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

export const InputField = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.small};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const SelectField = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.small};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const InputLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  display: block;
`;
