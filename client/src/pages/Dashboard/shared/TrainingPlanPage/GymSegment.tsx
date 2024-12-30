import { useState, useEffect } from "react";
import {
  SegmentContainer,
  SegmentHeader,
  InputField,
  SelectField,
  InputLabel,
} from "./GymSegmentStyles";
import { ExerciseSegment } from "./types";
import { useTrainingTypes } from "../../../../hooks/useTrainingTypes";

interface GymSegmentInputProps {
  segment: ExerciseSegment;
  onUpdate: (updatedSegment: ExerciseSegment) => void;
}

export const GymSegmentInput = ({
  segment,
  onUpdate,
}: GymSegmentInputProps) => {
  const [localSegment, setLocalSegment] = useState<ExerciseSegment>({
    ...segment,
    variant: "gym", // Ensure gym segment
  });

  const { types: trainingTypes, getTrainingTypes } = useTrainingTypes();

  // Fetch gym-related training types
  useEffect(() => {
    getTrainingTypes();
  }, []);

  // Filter to get only gym types (strength & cardio)
  const gymCategories = trainingTypes.filter(
    (type) => type.variant === "strength" || type.variant === "cardio"
  );

  const handleChange = <K extends keyof ExerciseSegment>(
    field: K,
    value: ExerciseSegment[K]
  ) => {
    const updated = { ...localSegment, [field]: value };
    setLocalSegment(updated);
    onUpdate(updated);
  };

  const filteredSubcategories =
    gymCategories.find((cat) => cat.name === localSegment.type)?.categories ||
    [];

  return (
    <SegmentContainer>
      <SegmentHeader>{localSegment.name || "Gym Segment"}</SegmentHeader>

      {/* Segment Name */}
      <InputLabel>Naziv Segmenta:</InputLabel>
      <InputField
        type="text"
        value={localSegment.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Naziv Gym Segmenta"
      />

      {/* Type Selection (Cardio/Strength) */}
      <InputLabel>Tip:</InputLabel>
      <SelectField
        value={localSegment.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="">Izaberite tip</option>
        {gymCategories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </SelectField>

      {/* Category Selection */}
      <InputLabel>Kategorija:</InputLabel>
      <SelectField
        value={localSegment.category}
        onChange={(e) => handleChange("category", e.target.value)}
        disabled={!localSegment.type}
      >
        <option value="">Izaberite kategoriju</option>
        {filteredSubcategories.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </SelectField>

      {localSegment.type === "Snaga" && (
        <>
          <InputLabel>Vežba:</InputLabel>
          <SelectField
            value={localSegment.exercise || ""}
            onChange={(e) => handleChange("exercise", e.target.value)}
          >
            <option value="">Izaberite vežbu</option>
            {["Čučanj", "Bench Press", "Iskorak", "Mrtvo dizanje"].map(
              (exercise, index) => (
                <option key={index} value={exercise}>
                  {exercise}
                </option>
              )
            )}
          </SelectField>

          <InputLabel>Broj ponavljanja:</InputLabel>
          <InputField
            type="number"
            value={localSegment.reps || ""}
            onChange={(e) => handleChange("reps", +e.target.value)}
          />

          <InputLabel>Težina (kg):</InputLabel>
          <InputField
            type="number"
            value={localSegment.weight || ""}
            onChange={(e) => handleChange("weight", +e.target.value)}
          />

          <InputLabel>Broj serija:</InputLabel>
          <InputField
            type="number"
            value={localSegment.sets || ""}
            onChange={(e) => handleChange("sets", +e.target.value)}
          />

          <InputLabel>Intenzitet (0-100%):</InputLabel>
          <InputField
            type="number"
            value={localSegment.intensity || ""}
            onChange={(e) => handleChange("intensity", +e.target.value)}
            min="0"
            max="100"
            placeholder="0-100%"
          />
        </>
      )}
    </SegmentContainer>
  );
};
