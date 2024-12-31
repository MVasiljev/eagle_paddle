import styled from "@emotion/styled";

export const FormWrapper = styled.div`
  background-color: #121212;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  height: 100%;
  margin: 2rem auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Heading = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
`;

export const SubHeading = styled.p`
  color: #a8a8a8;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  border-bottom: 1px solid #444444;
  margin-bottom: 1.5rem;
  color: white;
`;

export const Input = styled.input`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  width: 100%;
  padding: 10px 0;
  outline: none;
`;

export const Button = styled.button`
  background-color: #6a5acd;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #483d8b;
  }
`;
