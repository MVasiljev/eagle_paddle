import styled from "@emotion/styled";

export const DurationContainer = styled.div`
  background-color: #1a1a2e;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const DurationHeader = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  > div {
    flex: 1;
    min-width: 150px; /* Ensure inputs do not shrink excessively */
  }
`;

export const InputLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const InputField = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #555;
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  margin-top: ${({ theme }) => theme.spacing.small};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const SelectField = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #555;
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  padding-right: 2rem; /* Add space for the arrow icon */
  appearance: none; /* Remove the default arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FFFFFF' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 0.5rem) center; /* Adjust arrow position */
  background-size: 1rem;
  margin-top: ${({ theme }) => theme.spacing.small};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  // margin-top: 1.5rem;

  &:focus {
    outline: none;
  }
`;

export const AddButton = styled(Button)`
  display: flex;
  align-items: center;

  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.default};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  color: ${({ theme }) => theme.colors.white};

  input {
    width: 18px;
    height: 18px;
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  label {
    cursor: pointer;
  }
`;
