import styled from "@emotion/styled";

export const IntensityContainer = styled.div`
  background-color: #1a1a2e;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const IntensityHeader = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-align: center;
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
  margin-top: ${({ theme }) => theme.spacing.small};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryBlue};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primaryBlue};
  }
`;

export const IntensityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }

  label {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.default};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  box-shadow: ${({ theme }) => theme.shadows.card};

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }
`;
