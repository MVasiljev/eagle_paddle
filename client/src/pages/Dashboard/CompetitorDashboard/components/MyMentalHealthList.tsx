// src/components/MyMentalHealthList.tsx
import React, { useEffect } from "react";
import {
  ListContainer,
  ListItem,
  ListHeader,
  ActionButton,
} from "./MyMentalHealthList.styles";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Views } from "../../../../constants/views";
import { useMentalHealth } from "../../../../hooks/useMentalHealth";
import { setView } from "../../../../redux/slices/viewSlice";
import { MentalHealthEntry } from "../../../../types/types";
import { setEditMentalHealth } from "../../../../redux/slices/mentalHealthSlice";

const MyMentalHealthList: React.FC = () => {
  const { myEntries, getMyMentalHealthEntries, removeMentalHealthEntry } =
    useMentalHealth();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyMentalHealthEntries();
  }, []);

  // src/components/MyMentalHealthList.tsx
  const handleEdit = (entry: MentalHealthEntry) => {
    dispatch(setEditMentalHealth(entry));
    dispatch(setView(Views.MENTAL_HEALTH_CREATE));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      await removeMentalHealthEntry(id);
    }
  };

  return (
    <ListContainer>
      <ListHeader>Moja istorija raspolozenja</ListHeader>
      {myEntries.map((entry) => (
        <ListItem key={entry._id}>
          Datum:{" "}
          {entry.createdAt
            ? new Date(entry.createdAt).toLocaleDateString()
            : "Nepoznat datum"}{" "}
          - Raspoloženje: {entry.moodRating}
          <div>
            <ActionButton onClick={() => handleEdit(entry)}>
              <AiOutlineEdit />
            </ActionButton>
            <ActionButton onClick={() => handleDelete(entry._id)}>
              <AiOutlineDelete />
            </ActionButton>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default MyMentalHealthList;
