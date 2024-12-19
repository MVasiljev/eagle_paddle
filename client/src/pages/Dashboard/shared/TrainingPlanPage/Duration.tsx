import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import "./Duration.css";

interface DurationProps {
  initialDurations?: { duration: number; unit: string }[];
  onDurationsChange: (data: {
    durations: { duration: number; unit: string }[];
  }) => void;
}

export const Duration = ({
  initialDurations,
  onDurationsChange,
}: DurationProps) => {
  const [piramida, setPiramida] = useState(false);
  const [segmentType, setSegmentType] = useState("vreme");
  const [durations, setDurations] = useState(
    initialDurations || [{ duration: 60, unit: "s" }]
  );

  const notifyParent = (
    updatedDurations: { duration: number; unit: string }[]
  ) => {
    setDurations(updatedDurations);
    onDurationsChange({ durations: updatedDurations });
  };

  const handlePiramidaToggle = () => {
    setPiramida(!piramida);

    // Reset durations to default if "Pyramid" is disabled
    if (piramida) {
      notifyParent([{ duration: 60, unit: "s" }]);
    }
  };

  const handleDurationChange = (
    index: number,
    key: "duration" | "unit",
    value: string | number
  ) => {
    const updated = [...durations];
    updated[index] = { ...updated[index], [key]: value };
    notifyParent(updated);
  };

  const addDuration = () => {
    const updated = [...durations, { duration: 60, unit: "s" }];
    notifyParent(updated);
  };

  const removeDuration = (index: number) => {
    if (durations.length > 1) {
      const updated = durations.filter((_, i) => i !== index);
      notifyParent(updated);
    }
  };

  return (
    <div className="duration-container">
      <h4>Duration / Distance</h4>
      <label>
        Segment Type:
        <select
          value={segmentType}
          onChange={(e) => setSegmentType(e.target.value)}
        >
          <option value="vreme">Time</option>
          <option value="distance">Distance</option>
        </select>
      </label>

      {durations.map((d, index) => (
        <div key={index} className="input-group">
          <label>
            Duration:
            <input
              type="number"
              value={d.duration}
              onChange={(e) =>
                handleDurationChange(index, "duration", +e.target.value)
              }
            />
          </label>
          <label>
            Unit:
            <select
              value={d.unit}
              onChange={(e) =>
                handleDurationChange(index, "unit", e.target.value)
              }
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
          {durations.length > 1 && (
            <button
              style={{
                height: "60px",
                width: "60px",
                background: "transparent",
                color: "red",
              }}
              onClick={() => removeDuration(index)}
            >
              <MdDelete />
            </button>
          )}
        </div>
      ))}

      {/* Conditionally show the add button based on "Pyramid" toggle */}
      {piramida && (
        <button onClick={addDuration}>
          <MdAdd /> Add Duration
        </button>
      )}

      <label>
        <input
          type="checkbox"
          checked={piramida}
          onChange={handlePiramidaToggle}
        />
        Enable Pyramid
      </label>
    </div>
  );
};
