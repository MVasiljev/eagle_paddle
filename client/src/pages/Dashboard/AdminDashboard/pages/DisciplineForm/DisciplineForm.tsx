import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  InputField,
  Dropdown,
  SaveButton,
} from "./DisciplineForm.styles";
import { useSelector, useDispatch } from "react-redux";
import { Views } from "../../../../../constants/views";
import { useDisciplines } from "../../../../../hooks/useDisciplines";
import { clearEditDiscipline } from "../../../../../redux/slices/disciplineSlice";
import { setView } from "../../../../../redux/slices/viewSlice";
import { RootState } from "../../../../../redux/store";

const DisciplineForm: React.FC = () => {
  const dispatch = useDispatch();
  const { addDiscipline, editDiscipline } = useDisciplines();
  const editDisciplineData = useSelector(
    (state: RootState) => state.disciplines.edit
  );

  const [distance, setDistance] = useState<number>(0);
  const [unit, setUnit] = useState<"m" | "km">("m");
  const [editId, setEditId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Populate form if editing
  useEffect(() => {
    if (editDisciplineData) {
      setDistance(editDisciplineData.distance);
      setUnit(editDisciplineData.unit);
      setEditId(editDisciplineData._id);

      // Auto-focus and place cursor at end
      if (inputRef.current) {
        inputRef.current.focus();
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }
  }, [editDisciplineData]);

  // Update state without losing cursor
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDistance(Number(value));
    }
  };

  const handleSubmit = async () => {
    if (!distance) {
      alert("Distanca je obavezna.");
      return;
    }

    const discipline = {
      distance,
      unit,
    };

    try {
      if (editId) {
        await editDiscipline(editId, discipline);
      } else {
        await addDiscipline(discipline);
      }

      setDistance(0);
      setUnit("m");
      setEditId(null);

      dispatch(clearEditDiscipline());
      dispatch(setView(Views.DISCIPLINE_LIST));
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  return (
    <Container>
      <h2>{editId ? "Ažuriraj Disciplinu" : "Kreiraj Disciplinu"}</h2>
      <InputField
        ref={inputRef}
        type="text"
        value={distance.toString()}
        onChange={handleDistanceChange}
        placeholder="Unesite distancu"
      />
      <Dropdown
        value={unit}
        onChange={(e) => setUnit(e.target.value as "m" | "km")}
      >
        <option value="m">Meters</option>
        <option value="km">Kilometers</option>
      </Dropdown>
      <SaveButton onClick={handleSubmit}>
        {editId ? "Ažurirajte Disciplinu" : "Kreirajte disciplinu"}
      </SaveButton>
      <SaveButton
        onClick={() => {
          setDistance(0);
          setUnit("m");
          dispatch(clearEditDiscipline());
          dispatch(setView(Views.DISCIPLINE_LIST));
        }}
      >
        Cancel
      </SaveButton>
    </Container>
  );
};

export default DisciplineForm;
