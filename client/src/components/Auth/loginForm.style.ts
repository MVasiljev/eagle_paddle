import styled from "@emotion/styled";

export const FormWrapper = styled.div`
  background-color: #121212;
  // border-radius: 8px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  margin: 0 auto; /* Center the form */
  // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Subtle shadow */

  @media (max-width: 768px) {
    max-width: 90%; /* Reduce the width on smaller screens */
    padding: 1.5rem; /* Adjust padding for smaller screens */
  }
`;

export const Heading = styled.h1`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const SubHeading = styled.p`
  font-size: 1rem;
  color: #a8a8a8;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  text-align: left; /* Align inputs to the left */
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #444444;
`;

export const Icon = styled.div`
  color: #666666;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

export const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #ffffff; /* Normal text color */
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  padding: 0.75rem 0;
  width: 100%;

  &::placeholder {
    color: #666666; /* Placeholder text color */
  }

  &:focus {
    border-bottom: 1px solid #1a73e8;
  }

  /* Autofill fix */
  &:-webkit-autofill {
    background-color: transparent !important;
    -webkit-text-fill-color: #ffffff !important; /* Ensure autofill text is white */
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const EyeIcon = styled.div`
  color: #666666;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
  text-align: left;
`;

export const Button = styled.button`
  width: 100%; /* Full width */
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: #ffffff;
  padding: 14px; /* Increased padding for height */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem; /* Slightly larger font size */
  font-weight: 600;

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

export const CheckboxLabel = styled.label`
  margin-left: ${({ theme }) => theme.spacing.small};
  font-size: 0.9rem;
  color: #ffffff;
`;

export const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #1a73e8;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ToggleButton = styled.a`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #1a73e8;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
