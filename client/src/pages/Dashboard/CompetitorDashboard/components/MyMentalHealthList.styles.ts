import styled from "@emotion/styled";

export const ListContainer = styled.div`
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

export const ListHeader = styled.h2`
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c2c2c;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  color: #ffffff;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.5rem;

  &:hover {
    color: #6a5acd;
  }
`;
