// src/components/MentalHealthList.tsx
import React, { useEffect } from "react";
import {
  ListContainer,
  ListItem,
  ActionButton,
  ListHeader,
} from "./MentalHealthList.styles";
import { AiOutlineDelete } from "react-icons/ai";
import { useMentalHealth } from "../../../../../hooks/useMentalHealth";

const MentalHealthList: React.FC = () => {
  const { entries, getMentalHealthEntries, removeMentalHealthEntry } =
    useMentalHealth();

  useEffect(() => {
    getMentalHealthEntries();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      await removeMentalHealthEntry(id);
    }
  };

  return (
    <ListContainer>
      <ListHeader>Svi Mentalni Zdravstveni Unosi</ListHeader>
      {entries.map((entry) => (
        <ListItem key={entry._id}>
          {typeof entry.user === "object"
            ? `${entry.user.firstName} ${entry.user.lastName}`
            : "Unknown User"}
          - Raspoloženje: {entry.moodRating}
          <div>
            <ActionButton onClick={() => handleDelete(entry._id)}>
              <AiOutlineDelete />
            </ActionButton>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default MentalHealthList;
