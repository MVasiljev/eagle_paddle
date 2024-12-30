import styled from "@emotion/styled";

export const ToastContainer = styled.div`
  position: fixed; /* Position the toast fixed to prevent layout shift */
  top: 10%; /* Adjust vertical positioning */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust for true center */
  z-index: 1000; /* Ensure it's above all elements */
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Subtle shadow */
  text-align: center;
  max-width: 90%;
  width: 300px; /* Fixed width */
`;

export const ToastHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: "Roboto", sans-serif;
`;

export const ToastText = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif;
`;

export const ToastButton = styled.button`
  background: white;
  color: #483d8b;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background: #ddd;
  }
`;
