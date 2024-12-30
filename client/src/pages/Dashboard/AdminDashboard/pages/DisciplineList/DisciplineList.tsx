import React, { useEffect } from "react";
import {
  Container,
  CategoryList,
  CategoryItem,
  ActionButton,
} from "./DisciplineList.styles";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Views } from "../../../../../constants/views";
import { useDisciplines } from "../../../../../hooks/useDisciplines";
import { setEditDiscipline } from "../../../../../redux/slices/disciplineSlice";
import { setView } from "../../../../../redux/slices/viewSlice";
import { Discipline } from "../../../../../types/types";

const DisciplineList: React.FC = () => {
  const { disciplines, getDisciplines, removeDiscipline } = useDisciplines();
  const dispatch = useDispatch();

  useEffect(() => {
    getDisciplines();
  }, []);

  const handleEdit = (discipline: Discipline) => {
    dispatch(setEditDiscipline(discipline));
    dispatch(setView(Views.DISCIPLINE_CREATE));
  };

  return (
    <Container>
      <h2>Lista disciplina</h2>
      <CategoryList>
        {disciplines.map((discipline) => (
          <CategoryItem key={discipline._id}>
            {discipline.distance} {discipline.unit}
            <div>
              <ActionButton onClick={() => handleEdit(discipline)}>
                <AiOutlineEdit />
              </ActionButton>
              <ActionButton onClick={() => removeDiscipline(discipline._id)}>
                <AiOutlineDelete />
              </ActionButton>
            </div>
          </CategoryItem>
        ))}
      </CategoryList>
    </Container>
  );
};

export default DisciplineList;
