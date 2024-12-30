import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: #121212;
  border-radius: 8px;
  max-width: 900px; /* Matches the calendar's width */
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.white};
  min-width: 90%;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #555;
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #1a1a2e;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  placeholder: ${({ theme }) => theme.colors.lightGray};

  &::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const DashboardContainer = styled.div`
  background-color: #121212;
  border-radius: 8px;
  max-width: 900px; /* Matches the calendar's width */
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.white};
`;

export const PlanTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const SectionTitle = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const InputField = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #555;
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #1a1a2e;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  placeholder: ${({ theme }) => theme.colors.lightGray};
`;

export const SegmentWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background: #1a1a2e;
  border: 1px solid #555;
  border-radius: ${({ theme }) => theme.radius.default};
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: #ffffff;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: ${({ theme }) => theme.radius.default};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: background 0.3s;
  margin-top: ${({ theme }) => theme.spacing.medium};

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing.small};
  }
`;

export const ModalWrapper = styled.div`
  background: ${({ theme }) => theme.colors.darkBlue};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.white};
  max-width: 600px;
  margin: 0 auto;
`;

export const PreformattedText = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #1a1a2e;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.default};
  color: ${({ theme }) => theme.colors.white};
  overflow-x: auto;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

export const ModalContent = styled.div`
  padding: 20px;
  background-color: #121212;
  color: #ffffff;
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align buttons to the left */
  gap: ${({ theme }) => theme.spacing.medium}; /* Add spacing between buttons */
  margin-top: ${({ theme }) =>
    theme.spacing.medium}; /* Add some spacing above the buttons */
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid #6a5acd; /* Purple border to match buttons */
  border-radius: ${({ theme }) => theme.radius.default};
  background-color: #1a1a2e; /* Dark background for dropdown */
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  appearance: none; /* Remove default dropdown arrow for custom styling */
  position: relative;

  &:focus {
    outline: none;
    border-color: #483d8b; /* Highlight border on focus */
    box-shadow: 0 0 4px #6a5acd; /* Glow effect on focus */
  }

  &:hover {
    border-color: #483d8b; /* Darker purple on hover */
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.lightGray}; /* Placeholder color */
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownArrow = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.small};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* Prevent interaction with the arrow */
  font-size: ${({ theme }) => theme.typography.sizes.body};
  color: ${({ theme }) => theme.colors.lightGray};
`;
