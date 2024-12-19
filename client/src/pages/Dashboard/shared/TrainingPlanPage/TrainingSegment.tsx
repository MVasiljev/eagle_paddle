import { useState, useEffect } from "react";
import { Segment, TrainingCategory } from "./types";

interface SegmentProps {
  segment: Segment;
  onUpdate: (updatedSegment: Segment) => void;
  trainingCategories: TrainingCategory[];
}

export const TrainingSegment = ({
  segment,
  onUpdate,
  trainingCategories,
}: SegmentProps) => {
  const [localSegment, setLocalSegment] = useState(segment);
  const [filteredCategories, setFilteredCategories] = useState<
    TrainingCategory["subcategories"]
  >([]);

  // Sync local state with parent prop when `segment` changes
  useEffect(() => {
    setLocalSegment(segment);
  }, [segment]);

  // Update subcategories when type changes
  useEffect(() => {
    const selectedType = trainingCategories.find(
      (cat) => cat.name === localSegment.type
    );
    setFilteredCategories(selectedType?.subcategories || []);
  }, [localSegment.type, trainingCategories]);

  const handleChange = <K extends keyof Segment>(
    field: K,
    value: Segment[K]
  ) => {
    const updatedSegment = { ...localSegment, [field]: value };
    setLocalSegment(updatedSegment);
    onUpdate(updatedSegment);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4>Training Segment</h4>

      {/* Segment Name */}
      <div style={{ marginBottom: "0.5rem" }}>
        <label style={{ marginRight: "1rem" }}>Segment Name:</label>
        <input
          type="text"
          value={localSegment.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Segment Name"
        />
      </div>

      {/* Type Selection */}
      <div style={{ marginBottom: "0.5rem" }}>
        <label style={{ marginRight: "1rem" }}>Type:</label>
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
      </div>

      {/* Category Selection */}
      <div style={{ marginBottom: "0.5rem" }}>
        <label style={{ marginRight: "1rem" }}>Category:</label>
        <select
          value={localSegment.category}
          onChange={(e) => handleChange("category", e.target.value)}
          disabled={!localSegment.type}
        >
          <option value="">Select Category</option>
          {filteredCategories.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Segment Inputs */}
      {localSegment.type && localSegment.category && (
        <>
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ marginRight: "1rem" }}>Series Count:</label>
            <input
              type="number"
              min="0"
              value={localSegment.seriesCount}
              onChange={(e) => handleChange("seriesCount", +e.target.value)}
              placeholder="Series Count"
            />
          </div>

          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ marginRight: "1rem" }}>Segment Count:</label>
            <input
              type="number"
              min="0"
              value={localSegment.segmentCount}
              onChange={(e) => handleChange("segmentCount", +e.target.value)}
              placeholder="Segment Count"
            />
          </div>

          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ marginRight: "1rem" }}>
              Pause After Series (min):
            </label>
            <input
              type="number"
              min="0"
              value={localSegment.pauseAfterSeries}
              onChange={(e) =>
                handleChange("pauseAfterSeries", +e.target.value)
              }
              placeholder="Pause After Series (min)"
            />
          </div>

          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ marginRight: "1rem" }}>
              Pause After Segment (min):
            </label>
            <input
              type="number"
              min="0"
              value={localSegment.pauseAfterSegment}
              onChange={(e) =>
                handleChange("pauseAfterSegment", +e.target.value)
              }
              placeholder="Pause After Segment (min)"
            />
          </div>
        </>
      )}
    </div>
  );
};
