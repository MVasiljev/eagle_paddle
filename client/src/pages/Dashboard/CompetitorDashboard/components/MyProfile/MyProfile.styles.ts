import styled from "@emotion/styled";

export const ProfileContainer = styled.div`
  background-color: #1e1e1e;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 850px;
  width: 100%;
  margin: 60px auto;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  h1 {
    font-size: 2rem;
    color: #ffffff;
    margin: 0;
  }
`;

export const ProfileAvatar = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  cursor: pointer;
  border: 4px solid #6a5acd;
  margin-right: 24px;
  border-radius: 12px;
  transition: border-color 0.3s;

  &:hover {
    border-color: #8a75f0;
  }
`;

export const UploadInput = styled.input`
  display: none;
`;

export const ProfileDetails = styled.div`
  margin-top: 30px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #444;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2a2a2a;
  }
`;

export const Label = styled.span`
  font-weight: 600;
  color: #cccccc;
`;

export const Value = styled.span`
  color: #e0e0e0;
`;

export const EditButton = styled.button`
  background-color: #6a5acd;
  color: white;
  padding: 14px 28px;
  margin-top: 30px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7d69f0;
  }
`;

export const SaveButton = styled(EditButton)`
  background-color: #4caf50;

  &:hover {
    background-color: #66bb6a;
  }
`;
