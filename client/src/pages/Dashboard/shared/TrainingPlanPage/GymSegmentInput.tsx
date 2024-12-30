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
    variant: "gym",
  });

  const {
    types: trainingTypes,
    getTrainingTypes,
    isLoading,
    error,
  } = useTrainingTypes();

  useEffect(() => {
    getTrainingTypes();
  }, []);

  // Filter types by 'strength' and 'cardio'
  const gymCategories = trainingTypes.filter(
    (type) => type.variant === "strength" || type.variant === "cardio"
  );

  // Handle state changes and propagate to parent component
  const handleChange = <K extends keyof ExerciseSegment>(
    field: K,
    value: ExerciseSegment[K]
  ) => {
    const updated = { ...localSegment, [field]: value };
    setLocalSegment(updated);
    onUpdate(updated);
  };

  // Find subcategories based on selected type and category
  const filteredCategories = gymCategories.find(
    (cat) => cat.variant === localSegment.type
  )?.categories;

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

      {/* Tip (strength/cardio) */}
      <InputLabel>Tip Segmenta:</InputLabel>
      <SelectField
        value={localSegment.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="">Izaberite tip</option>
        <option value="strength">Snaga</option>
        <option value="cardio">Kardio</option>
      </SelectField>

      {/* Category Selection */}
      <InputLabel>Kategorija:</InputLabel>
      <SelectField
        value={localSegment.category}
        onChange={(e) => handleChange("category", e.target.value)}
        disabled={!localSegment.type}
      >
        <option value="">Izaberite kategoriju</option>
        {filteredCategories?.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </SelectField>

      {/* Strength-Specific Inputs */}
      {localSegment.type === "strength" && (
        <>
          <InputLabel>Vežba:</InputLabel>
          <InputField
            type="text"
            value={localSegment.exercise || ""}
            onChange={(e) => handleChange("exercise", e.target.value)}
            placeholder="Naziv vežbe"
          />

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
        </>
      )}

      {/* Cardio-Specific Inputs */}
      {localSegment.type === "cardio" && (
        <>
          <InputLabel>Trajanje (min):</InputLabel>
          <InputField
            type="number"
            value={localSegment.duration || ""}
            onChange={(e) => handleChange("duration", +e.target.value)}
          />

          <InputLabel>Udaljenost (m):</InputLabel>
          <InputField
            type="number"
            value={localSegment.distance || ""}
            onChange={(e) => handleChange("distance", +e.target.value)}
          />

          <InputLabel>Intenzitet (0-100%):</InputLabel>
          <InputField
            type="number"
            value={localSegment.intensity || ""}
            onChange={(e) => handleChange("intensity", +e.target.value)}
            min="0"
            max="100"
          />
        </>
      )}

      {/* Loading and Error States */}
      {isLoading && <p>Učitavanje tipova treninga...</p>}
      {error && <p style={{ color: "red" }}>Greška: {error}</p>}
    </SegmentContainer>
  );
};
