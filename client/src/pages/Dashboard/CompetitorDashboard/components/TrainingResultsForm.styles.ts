import styled from "@emotion/styled";

export const FormWrapper = styled.div`
  background-color: #121212;
  max-width: 500px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1.5rem;
  }
`;

export const Heading = styled.h1`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  text-align: left;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #444444;
  margin-bottom: 0.5rem;
`;

export const Icon = styled.div`
  color: #666666;
  margin-right: ${({ theme }) => theme.spacing.small};
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  padding: 0.75rem 0;
  width: 100%;
  border-bottom: 1px solid #444444;

  &::placeholder {
    color: #666666;
  }

  &:focus {
    border-bottom: 1px solid #6a5acd;
  }

  &:-webkit-autofill {
    background-color: transparent !important;
    -webkit-text-fill-color: #ffffff !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  padding: 0.75rem 0;
  width: 100%;
  min-height: 100px;
  resize: vertical;

  &::placeholder {
    color: #666666;
  }

  &:focus {
    border-bottom: 1px solid #6a5acd;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.large};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  flex: 1;
  background: ${({ variant }) =>
    variant === "primary"
      ? "linear-gradient(135deg, #6a5acd, #483d8b)"
      : "transparent"};
  color: #ffffff;
  padding: 14px;
  border: ${({ variant }) =>
    variant === "primary" ? "none" : "1px solid #6a5acd"};
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === "primary"
        ? "linear-gradient(135deg, #483d8b, #6a5acd)"
        : "rgba(106, 90, 205, 0.1)"};
  }
`;

export const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin: -0.25rem 0 0.5rem;
  text-align: left;
`;

export const ZoneGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #444444;
  padding: 1rem;
`;

export const ZoneLabel = styled.label`
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  display: block;
`;

export const DescriptionText = styled.p`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-top: 0.25rem;
  text-align: left;
`;
