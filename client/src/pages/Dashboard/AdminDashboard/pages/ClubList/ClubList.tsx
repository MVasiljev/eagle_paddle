// src/components/ClubList.tsx
import React, { useEffect } from "react";
import {
  Container,
  Header,
  CategoryList,
  CategoryItem,
  ActionButton,
} from "./ClubList.styles";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Views } from "../../../../../constants/views";
import { useClubs } from "../../../../../hooks/useClubs";
import { setView } from "../../../../../redux/slices/viewSlice";
import { IClub } from "../../../../../types/types";

const ClubList: React.FC = () => {
  const { clubs, isLoading, getClubs, removeClub } = useClubs();
  const dispatch = useDispatch();

  useEffect(() => {
    getClubs();
  }, []);

  const handleEdit = (club: IClub) => {
    dispatch(setView(Views.CLUB_CREATE));
    dispatch({ type: "clubs/setEditClub", payload: club });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Da li ste sigurni?")) {
      await removeClub(id);
      getClubs(); // Refetch clubs after deletion
    }
  };

  return (
    <Container>
      <Header>Klubovi</Header>
      {isLoading && <p>Loading clubs...</p>}
      <CategoryList>
        {clubs.map((club) => (
          <CategoryItem key={club._id}>
            {club.name} - {club.location}
            <div>
              <ActionButton onClick={() => handleEdit(club)}>
                <AiOutlineEdit />
              </ActionButton>
              <ActionButton onClick={() => club._id && handleDelete(club._id)}>
                <AiOutlineDelete />
              </ActionButton>
            </div>
          </CategoryItem>
        ))}
      </CategoryList>
    </Container>
  );
};

export default ClubList;
