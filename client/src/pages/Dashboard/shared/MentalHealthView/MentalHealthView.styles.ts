import styled from "@emotion/styled";

export const ViewContainer = styled.div`
  background-color: #1e1e1e;
  max-width: 600px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
`;

export const ViewHeader = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2b2b2b;
  padding: 1rem;
  border-radius: 8px;
`;

export const DetailLabel = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #cccccc;
`;

export const BackButton = styled.button`
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 2rem;
  display: block;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }
`;
