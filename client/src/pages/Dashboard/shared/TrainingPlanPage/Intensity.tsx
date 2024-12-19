import React, { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import "./Intensity.css";

interface IntensityProps {
  initialSegmentType?: string;
  initialIntensityType?: string;
  initialIntensities?: { value: string; duration: string; technique: string }[];
  initialUnit?: string;
  onIntensitiesChange: (data: {
    segmentType: string;
    intensityType: string;
    intensities: { value: string; duration: string; technique: string }[];
    unit: string;
  }) => void;
}

export const Intensity = ({
  initialSegmentType = "vreme", // "vreme" (time) or "distance"
  initialIntensityType = "single", // Default backend-compatible value
  initialIntensities = [{ value: "", duration: "", technique: "" }],
  initialUnit = "s",
  onIntensitiesChange,
}: IntensityProps) => {
  const [segmentType, setSegmentType] = useState(initialSegmentType);
  const [intensityType, setIntensityType] = useState(initialIntensityType);
  const [intensities, setIntensities] = useState(initialIntensities);
  const [unit, setUnit] = useState(initialUnit);
  const [piramida, setPiramida] = useState(false);

  const intensityTypeOptions = [
    { label: "Single Value", value: "single" },
    { label: "By Segment", value: "multiple" },
    { label: "Time/Intensity", value: "time-intensity" },
    { label: "Technique/Time/Intensity", value: "technique-time-intensity" },
  ];

  // Notify parent when changes occur
  const notifyParent = () => {
    onIntensitiesChange({ segmentType, intensityType, intensities, unit });
  };

  // Segment Type Change
  const handleSegmentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSegmentType = e.target.value;
    setSegmentType(newSegmentType);

    // Update unit based on segment type
    const newUnit = newSegmentType === "vreme" ? "s" : "m";
    setUnit(newUnit);

    notifyParent();
  };

  // Unit Change
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
    notifyParent();
  };

  // Intensity Type Change
  const handleIntensityTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntensityType(e.target.value);
    notifyParent();
  };

  // Input Change
  const handleInputChange = (
    index: number,
    key: "value" | "duration" | "technique",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...intensities];
    updated[index][key] = e.target.value;
    setIntensities(updated);
    notifyParent();
  };

  // Add and Remove Intensity
  const addIntensity = () => {
    setIntensities([
      ...intensities,
      { value: "", duration: "", technique: "" },
    ]);
    notifyParent();
  };

  const removeIntensity = (index: number) => {
    if (intensities.length > 1) {
      setIntensities(intensities.filter((_, i) => i !== index));
      notifyParent();
    }
  };

  return (
    <div className="intensity-container">
      <h4 className="intensity-header">Intensity</h4>

      {/* Segment Type */}
      <label className="input-label">
        Segment Type:
        <select
          value={segmentType}
          onChange={handleSegmentTypeChange}
          className="input-select"
        >
          <option value="vreme">Time</option>
          <option value="distance">Distance</option>
        </select>
      </label>

      {/* Unit */}
      <label className="input-label">
        Unit:
        <select
          value={unit}
          onChange={handleUnitChange}
          className="input-select"
        >
          {segmentType === "vreme" ? (
            <>
              <option value="s">Seconds</option>
              <option value="min">Minutes</option>
            </>
          ) : (
            <>
              <option value="m">Meters</option>
              <option value="km">Kilometers</option>
            </>
          )}
        </select>
      </label>

      {/* Intensity Type */}
      <label className="input-label">
        Intensity Type:
        <select
          value={intensityType}
          onChange={handleIntensityTypeChange}
          className="input-select"
        >
          {intensityTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {/* Intensity Inputs */}
      {intensities.map((intensity, index) => (
        <div key={index} className="intensity-item">
          {intensityType === "single" && (
            <label className="input-label">
              Value:
              <input
                type="number"
                value={intensity.value}
                onChange={(e) => handleInputChange(index, "value", e)}
                placeholder="Value"
              />
            </label>
          )}
          {intensityType === "multiple" && (
            <label className="input-label">
              Segment Intensity:
              <input
                type="number"
                value={intensity.value}
                onChange={(e) => handleInputChange(index, "value", e)}
                placeholder="Segment Intensity"
              />
            </label>
          )}
          {intensityType === "time-intensity" && (
            <>
              <label className="input-label">
                Value:
                <input
                  type="number"
                  value={intensity.value}
                  onChange={(e) => handleInputChange(index, "value", e)}
                  placeholder="Value"
                />
              </label>
              <label className="input-label">
                Duration:
                <input
                  type="number"
                  value={intensity.duration}
                  onChange={(e) => handleInputChange(index, "duration", e)}
                  placeholder="Duration"
                />
              </label>
            </>
          )}
          {intensityType === "technique-time-intensity" && (
            <>
              <label className="input-label">
                Technique:
                <input
                  type="text"
                  value={intensity.technique}
                  onChange={(e) => handleInputChange(index, "technique", e)}
                  placeholder="Technique"
                />
              </label>
              <label className="input-label">
                Value:
                <input
                  type="number"
                  value={intensity.value}
                  onChange={(e) => handleInputChange(index, "value", e)}
                  placeholder="Value"
                />
              </label>
              <label className="input-label">
                Duration:
                <input
                  type="number"
                  value={intensity.duration}
                  onChange={(e) => handleInputChange(index, "duration", e)}
                  placeholder="Duration"
                />
              </label>
            </>
          )}
          {intensities.length > 1 && (
            <button onClick={() => removeIntensity(index)}>
              <MdDelete style={{ height: "20px", width: "20px" }} />
            </button>
          )}
        </div>
      ))}

      {piramida && (
        <button onClick={addIntensity}>
          <MdAdd /> Add Intensity
        </button>
      )}

      {/* Piramida Toggle */}
      <label className="input-label">
        <input
          type="checkbox"
          checked={piramida}
          onChange={(e) => setPiramida(e.target.checked)}
        />
        Enable Pyramid
      </label>
    </div>
  );
};
