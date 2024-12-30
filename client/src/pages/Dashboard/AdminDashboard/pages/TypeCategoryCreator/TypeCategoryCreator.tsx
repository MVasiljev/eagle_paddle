import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  InputField,
  Dropdown,
  AddButton,
  CategoryList,
  CategoryItem,
  RemoveButton,
  SaveButton,
} from "./TypeCategoryCreator.styles";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useTrainingTypes } from "../../../../../hooks/useTrainingTypes";
import { RootState } from "../../../../../redux/store";
import { setView } from "../../../../../redux/slices/viewSlice";
import { Views } from "../../../../../constants/views";
import { useDispatch } from "react-redux";
import { clearEditType } from "../../../../../redux/slices/trainingTypeSlice";

const TypeCategoryCreator: React.FC = () => {
  const { addTrainingType, editTrainingType, types } = useTrainingTypes();
  const editType = useSelector((state: RootState) => state.trainingTypes.edit);

  const [type, setType] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [exercises, setExercises] = useState<string[]>([]);
  const [newExercise, setNewExercise] = useState<string>("");
  const [variant, setVariant] = useState<"standard" | "strength" | "cardio">(
    "standard"
  );
  const [editId, setEditId] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Populate form when editing
  useEffect(() => {
    if (editType) {
      setType(editType.name);
      setCategories(editType.categories);
      setExercises(editType.exercises || []);
      setVariant(editType.variant);
      setEditId(editType._id);
    }
  }, [editType]);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleAddExercise = () => {
    if (newExercise.trim() !== "") {
      setExercises([...exercises, newExercise.trim()]);
      setNewExercise("");
    }
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!type.trim()) {
      alert("Type is required");
      return;
    }
    if (categories.length === 0) {
      alert("Please add at least one category");
      return;
    }
    if (
      (variant === "strength" || variant === "cardio") &&
      exercises.length === 0
    ) {
      alert("Molim vas dodajte najmanje jednu vežbu.");
      return;
    }

    // Check if strength or cardio already exists
    if (
      (variant === "strength" || variant === "cardio") &&
      !editId &&
      types.some((t) => t.variant === variant)
    ) {
      alert(`Samo jedna${variant} može postojati.`);
      return;
    }

    const trainingType = {
      name: type,
      categories,
      exercises: variant === "standard" ? [] : exercises, // Attach exercises only if it's strength/cardio
      variant,
    };

    try {
      if (editId) {
        await editTrainingType(editId, trainingType);
      } else {
        await addTrainingType(trainingType);
      }
      setType("");
      setCategories([]);
      setExercises([]);
      setVariant("standard");
      setEditId(null);
      dispatch(clearEditType());
      alert("Tip treninga uspešno snimljen!");
    } catch (error) {
      console.error("Greška prilikom unosa tipa treninga:", error);
    }
  };

  return (
    <Container>
      <Header>
        {editId ? "Izmeni tip" : "Kreiraj tip i kategorije treninga"}
      </Header>

      <InputField
        placeholder="Upiši tip..."
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <Dropdown
        value={variant}
        onChange={(e) =>
          setVariant(e.target.value as "standard" | "strength" | "cardio")
        }
      >
        <option value="standard">Standard</option>
        <option value="strength">Strength</option>
        <option value="cardio">Cardio</option>
      </Dropdown>

      <div style={{ display: "flex", alignItems: "center" }}>
        <InputField
          placeholder="Dodaj novu kategoriju..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <AddButton onClick={handleAddCategory}>
          <AiOutlinePlus />
        </AddButton>
      </div>

      <CategoryList>
        {categories.map((category, index) => (
          <CategoryItem key={index}>
            {category}
            <RemoveButton onClick={() => handleRemoveCategory(index)}>
              <AiOutlineMinus />
            </RemoveButton>
          </CategoryItem>
        ))}
      </CategoryList>

      {(variant === "strength" || variant === "cardio") && (
        <>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <InputField
              placeholder="Add a new exercise..."
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
            />
            <AddButton onClick={handleAddExercise}>
              <AiOutlinePlus />
            </AddButton>
          </div>

          <CategoryList>
            {exercises.map((exercise, index) => (
              <CategoryItem key={index}>
                {exercise}
                <RemoveButton onClick={() => handleRemoveExercise(index)}>
                  <AiOutlineMinus />
                </RemoveButton>
              </CategoryItem>
            ))}
          </CategoryList>
        </>
      )}

      <SaveButton onClick={handleSave}>
        {editId ? "Ažuriraj" : "Snimi"}
      </SaveButton>
      <SaveButton
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setType("");
          setCategories([]);
          setExercises([]);
          setVariant("standard");
          setEditId(null);
          dispatch(clearEditType());
          dispatch(setView(Views.CALENDAR));
        }}
      >
        Odustani
      </SaveButton>
    </Container>
  );
};

export default TypeCategoryCreator;
