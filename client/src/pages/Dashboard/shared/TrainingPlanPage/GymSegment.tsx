import { useState } from "react";
import { GymSegment } from "./types";

interface GymSegmentProps {
  segment: GymSegment;
  onUpdate: (updatedSegment: GymSegment) => void;
}

export const GymSegmentInput = ({ segment, onUpdate }: GymSegmentProps) => {
  const [localSegment, setLocalSegment] = useState(segment);

  const handleChange = <K extends keyof GymSegment>(
    field: K,
    value: GymSegment[K]
  ) => {
    const updated = { ...localSegment, [field]: value };
    setLocalSegment(updated);
    onUpdate(updated);
  };

  return (
    <div>
      <h4>Gym Segment</h4>
      <input
        type="text"
        value={localSegment.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Gym Segment Name"
      />
      <select
        value={localSegment.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
      </select>
      {/* Reuse components */}
    </div>
  );
};
