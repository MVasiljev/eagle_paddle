import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: #121212; /* Match Calendar background */
  border-radius: 8px; /* Same border radius */
  max-width: 900px; /* Match Calendar max-width */
  padding: ${({ theme }) => theme.spacing.large}; /* Add consistent padding */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Match Calendar shadow */
  color: ${({ theme }) => theme.colors.white}; /* White text for consistency */
  margin: 5%;
  margin-top: 0;
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1); /* Subtle light shadow */
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #444; /* Match Calendar day borders */
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #1a1a2e; /* Same as Calendar day background */
  color: ${({ theme }) => theme.colors.white};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #444; /* Match Calendar day borders */
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #1a1a2e; /* Same as Calendar day background */
  color: ${({ theme }) => theme.colors.white};
`;

export const PlanSummary = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background: #1a1a2e; /* Match Calendar day background */
  border: 1px solid #444; /* Match Calendar day borders */
  border-radius: ${({ theme }) => theme.radius.default};
`;

export const CompetitorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const ListContainer = styled.div`
  flex: 1;
  background: #1a1a2e; /* Match Calendar day background */
  border: 1px solid #444; /* Match Calendar day borders */
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;
  min-height: 200px;
`;

export const ListTitle = styled.h4`
  color: ${({ theme }) => theme.colors.white};
`;

export const CompetitorItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.small};
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

export const AddButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 30px;
  height: 30px;

  &:hover {
    transform: scale(1.2);
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

export const SectionTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;
