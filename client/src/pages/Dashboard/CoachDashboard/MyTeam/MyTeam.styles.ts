import styled from "@emotion/styled";

export const FormWrapper = styled.div`
  background-color: #121212;
  padding: 2rem;
  max-width: 900px; // Wider form for better alignment
  width: 100%;
  margin: 3rem auto;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export const Heading = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button`
  background-color: #6a5acd;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  margin-top: 2rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #483d8b;
  }
`;

export const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 30px 0;
  background-color: #1e1e1e;
  color: #d3d3d3;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #444;

  &:nth-of-type(even) {
    background-color: #292929;
  }

  &:hover {
    background-color: #333333;
  }
`;

export const TableHeader = styled.th`
  background-color: #2d2d2d;
  color: #ffffff;
  font-weight: 600;
  padding: 18px;
  text-align: left;
  width: 25%; // Equal width for all columns

  &:first-of-type {
    border-top-left-radius: 8px;
  }

  &:last-of-type {
    border-top-right-radius: 8px;
  }
`;

export const TableCell = styled.td`
  padding: 18px;
  border-bottom: 1px solid #444;
  text-align: left;

  &:first-of-type {
    border-left: 1px solid #444;
  }

  &:last-of-type {
    border-right: 1px solid #444;
  }
`;
