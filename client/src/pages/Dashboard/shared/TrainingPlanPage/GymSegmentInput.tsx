import { useState } from "react";
import { GymSegment } from "./types";

interface GymSegmentInputProps {
  segment: GymSegment;
  onUpdate: (updatedSegment: GymSegment) => void;
}

export const GymSegmentInput = ({
  segment,
  onUpdate,
}: GymSegmentInputProps) => {
  const [localSegment, setLocalSegment] = useState(segment);

  const trainingCategories = [
    {
      id: "1",
      name: "Strength",
      subcategories: [
        { id: "1-1", name: "Lifting" },
        { id: "1-2", name: "Powerlifting" },
      ],
    },
    {
      id: "2",
      name: "Cardio",
      subcategories: [
        { id: "2-1", name: "Running" },
        { id: "2-2", name: "Cycling" },
      ],
    },
  ];

  const handleChange = <K extends keyof GymSegment>(
    field: K,
    value: GymSegment[K]
  ) => {
    const updatedSegment = { ...localSegment, [field]: value };
    setLocalSegment(updatedSegment);
    onUpdate(updatedSegment);
  };

  const filteredSubcategories =
    trainingCategories.find((cat) => cat.name === localSegment.type)
      ?.subcategories || [];

  return (
    <div>
      <h4>{localSegment.name}</h4>
      <label>Type:</label>
      <select
        value={localSegment.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="">Select Type</option>
        {trainingCategories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <label>Category:</label>
      <select
        value={localSegment.category}
        onChange={(e) => handleChange("category", e.target.value)}
        disabled={!localSegment.type}
      >
        <option value="">Select Category</option>
        {filteredSubcategories.map((sub) => (
          <option key={sub.id} value={sub.name}>
            {sub.name}
          </option>
        ))}
      </select>

      {localSegment.type === "Strength" && (
        <>
          <label>Reps:</label>
          <input
            type="number"
            value={localSegment.reps}
            onChange={(e) => handleChange("reps", +e.target.value)}
          />

          <label>Weight (kg):</label>
          <input
            type="number"
            value={localSegment.weight}
            onChange={(e) => handleChange("weight", +e.target.value)}
          />

          <label>Sets:</label>
          <input
            type="number"
            value={localSegment.sets}
            onChange={(e) => handleChange("sets", +e.target.value)}
          />

          <label>Pause Between Sets (s):</label>
          <input
            type="number"
            value={localSegment.pauseBetweenSets}
            onChange={(e) => handleChange("pauseBetweenSets", +e.target.value)}
          />
        </>
      )}

      {localSegment.type === "Cardio" && (
        <>
          <label>Duration (min):</label>
          <input
            type="number"
            value={localSegment.duration || ""}
            onChange={(e) => handleChange("duration", +e.target.value)}
          />

          <label>Distance (m):</label>
          <input
            type="number"
            value={localSegment.distance || ""}
            onChange={(e) => handleChange("distance", +e.target.value)}
          />

          <label>Intensity (%):</label>
          <input
            type="number"
            value={localSegment.intensity || ""}
            onChange={(e) => handleChange("intensity", +e.target.value)}
          />

          <label>Rest Time (s):</label>
          <input
            type="number"
            value={localSegment.restTime || ""}
            onChange={(e) => handleChange("restTime", +e.target.value)}
          />
        </>
      )}
    </div>
  );
};
