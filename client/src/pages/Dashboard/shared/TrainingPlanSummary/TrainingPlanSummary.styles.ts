// TrainingPlanSummary.styles.ts

import styled from "@emotion/styled";

// Container for the entire table
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 20px;
`;

// Header row of the table
export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #1a1a2e;
  padding: 10px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  border-radius: 8px 8px 0 0;
  margin-bottom: 10px;
`;

// Table row styling
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

// Table cell with padding
export const TableCell = styled.div`
  padding: 8px;
  font-size: ${({ theme }) => theme.typography.sizes.body};
`;

// Container for the summary section of the plan
export const PlanSummaryContainer = styled.div`
  margin-bottom: 20px;
  background-color: #1a1a2e;
  padding: 15px;
  border-radius: 10px;
`;

// Title for the summary section
export const PlanSummaryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.typography.sizes.hero};
`;

// Custom button style for any actions
export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 20px;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGray};
  }
`;

// Button container for multiple actions
export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;
