import React from "react";
import {
  ListContainer,
  ListItem,
  ListActions,
  ListDetails,
  ActionButton,
  DeleteButton,
} from "./TrainingTypeList.styles";
import { useDispatch } from "react-redux";
import { useTrainingTypes } from "../../../../../hooks/useTrainingTypes";
import { setView } from "../../../../../redux/slices/viewSlice";
import { setEditType } from "../../../../../redux/slices/trainingTypeSlice";
import { TrainingType } from "../../../../../types/types";
import { Views } from "../../../../../constants/views";

const TrainingTypeList: React.FC = () => {
  const { types, isLoading, error, removeTrainingType } = useTrainingTypes();
  const dispatch = useDispatch();

  const handleEdit = (type: TrainingType) => {
    dispatch(setEditType(type)); // Set the training type to edit
    dispatch(setView(Views.TYPE_CATEGORY_CREATE)); // Navigate to the form
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete ovaj tip treninga?"
    );
    if (confirmDelete) {
      await removeTrainingType(id);
    }
  };

  if (isLoading) return <p>Učitavanje tipova treninga...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <ListContainer>
      <h2>Tipovi Treninga</h2>
      {types.map((type) => (
        <ListItem key={type._id}>
          <ListDetails>
            <strong>{type.name}</strong>
            <small>
              Varijanta:{" "}
              {type.variant === "strength" || type.variant === "cardio"
                ? type.variant === "strength"
                  ? "Snaga"
                  : "Kardio"
                : "Standard"}
            </small>
            <small>Kategorije: {type.categories.join(", ")}</small>

            {/* Conditionally Render Exercises for Strength or Cardio */}
            {(type.variant === "strength" || type.variant === "cardio") &&
              type.exercises && (
                <small>
                  Vežbe:{" "}
                  {type.exercises.length > 0
                    ? type.exercises.join(", ")
                    : "Nema vežbi"}
                </small>
              )}
          </ListDetails>
          <ListActions>
            <ActionButton onClick={() => handleEdit(type)}>Izmeni</ActionButton>
            <DeleteButton onClick={() => handleDelete(type._id)}>
              Obriši
            </DeleteButton>
          </ListActions>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default TrainingTypeList;
