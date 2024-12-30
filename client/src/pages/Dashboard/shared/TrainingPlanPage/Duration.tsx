import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import {
  DurationContainer,
  DurationHeader,
  InputGroup,
  InputLabel,
  InputField,
  SelectField,
  Button,
  AddButton,
  CheckboxWrapper,
} from "./DurationStyles";

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
    <DurationContainer>
      <DurationHeader>Trajanje</DurationHeader>

      {/* Segment Type */}
      <InputLabel>
        Tip Segmenta:
        <SelectField
          value={segmentType}
          onChange={(e) => setSegmentType(e.target.value)}
        >
          <option value="vreme">Vreme</option>
          <option value="distance">Razdaljina</option>
        </SelectField>
      </InputLabel>

      {/* Duration Inputs */}
      {durations.map((d, index) => (
        <InputGroup key={index}>
          <InputLabel>
            Trajanje:
            <InputField
              type="number"
              value={d.duration}
              onChange={(e) =>
                handleDurationChange(index, "duration", +e.target.value)
              }
            />
          </InputLabel>
          <InputLabel>
            Jedinica:
            <SelectField
              value={d.unit}
              onChange={(e) =>
                handleDurationChange(index, "unit", e.target.value)
              }
            >
              {segmentType === "vreme" ? (
                <>
                  <option value="s">Sekunde</option>
                  <option value="min">Minuti</option>
                </>
              ) : (
                <>
                  <option value="m">Metri</option>
                  <option value="km">Kilometri</option>
                </>
              )}
            </SelectField>
          </InputLabel>
          {durations.length > 1 && (
            <Button
              style={{
                marginTop: "1.5rem",
                marginLeft: "1rem",
                height: "3rem",
                width: "3rem",
                color: "white",
              }}
              onClick={() => removeDuration(index)}
            >
              <MdDelete />
            </Button>
          )}
        </InputGroup>
      ))}

      {/* Add Duration Button */}
      {piramida && (
        <AddButton onClick={addDuration}>
          <MdAdd /> Dodaj Trajanje
        </AddButton>
      )}

      {/* Pyramid Toggle */}
      <CheckboxWrapper>
        <input
          type="checkbox"
          checked={piramida}
          onChange={handlePiramidaToggle}
        />
        <label>Omogući Piramidu</label>
      </CheckboxWrapper>
    </DurationContainer>
  );
};
