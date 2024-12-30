import { useEffect, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import {
  IntensityContainer,
  IntensityHeader,
  InputLabel,
  InputField,
  SelectField,
  IntensityItem,
  Button,
  AddButton,
  CheckboxWrapper,
} from "./IntensityStyles";

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
  initialSegmentType = "vreme",
  initialIntensityType = "single",
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
    { label: "Tehnika/Vreme/Intezitet", value: "technique-time-intensity" },
  ];

  // Ensure state is consistent with intensity type on load
  useEffect(() => {
    if (intensityType === "single" && intensities.length === 0) {
      setIntensities([{ value: "", duration: "", technique: "" }]);
    }
  }, [intensityType]);

  const notifyParent = () => {
    onIntensitiesChange({ segmentType, intensityType, intensities, unit });
  };

  const handleSegmentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSegmentType = e.target.value;
    setSegmentType(newSegmentType);
    const newUnit = newSegmentType === "vreme" ? "s" : "m";
    setUnit(newUnit);
    notifyParent();
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
    notifyParent();
  };

  const handleIntensityTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntensityType(e.target.value);
    notifyParent();
  };

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
    <IntensityContainer>
      <IntensityHeader>Intenzitet</IntensityHeader>

      {/* Segment Type */}
      <InputLabel>
        Tip Segmenta:
        <SelectField value={segmentType} onChange={handleSegmentTypeChange}>
          <option value="vreme">Vreme</option>
          <option value="distance">Razdaljina</option>
        </SelectField>
      </InputLabel>

      {/* Unit */}
      <InputLabel>
        Jedinica:
        <SelectField value={unit} onChange={handleUnitChange}>
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

      {/* Intensity Type */}
      <InputLabel>
        Tip Intenziteta:
        <SelectField value={intensityType} onChange={handleIntensityTypeChange}>
          {intensityTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </InputLabel>

      {/* Intensity Inputs */}
      {intensities.map((intensity, index) => (
        <IntensityItem key={index}>
          {intensityType === "single" && (
            <InputLabel>
              Vrednost:
              <InputField
                type="number"
                value={intensity.value}
                onChange={(e) => handleInputChange(index, "value", e)}
                placeholder="Vrednost"
              />
            </InputLabel>
          )}
          {intensityType === "multiple" && (
            <InputLabel>
              Segment Intenziteta:
              <InputField
                type="number"
                value={intensity.value}
                onChange={(e) => handleInputChange(index, "value", e)}
                placeholder="Segment Intenziteta"
              />
            </InputLabel>
          )}
          {intensityType === "time-intensity" && (
            <>
              <InputLabel>
                Vrednost:
                <InputField
                  type="number"
                  value={intensity.value}
                  onChange={(e) => handleInputChange(index, "value", e)}
                  placeholder="Vrednost"
                />
              </InputLabel>
              <InputLabel style={{ marginLeft: "20px" }}>
                Trajanje:
                <InputField
                  type="number"
                  value={intensity.duration}
                  onChange={(e) => handleInputChange(index, "duration", e)}
                  placeholder="Trajanje"
                />
              </InputLabel>
            </>
          )}
          {intensityType === "technique-time-intensity" && (
            <>
              <InputLabel>
                Tehnika:
                <InputField
                  type="text"
                  value={intensity.technique}
                  onChange={(e) => handleInputChange(index, "technique", e)}
                  placeholder="Tehnika"
                />
              </InputLabel>
              <InputLabel style={{ marginLeft: "20px" }}>
                Vrednost:
                <InputField
                  type="number"
                  value={intensity.value}
                  onChange={(e) => handleInputChange(index, "value", e)}
                  placeholder="Vrednost"
                />
              </InputLabel>
              <InputLabel style={{ marginLeft: "20px" }}>
                Trajanje:
                <InputField
                  type="number"
                  value={intensity.duration}
                  onChange={(e) => handleInputChange(index, "duration", e)}
                  placeholder="Trajanje"
                />
              </InputLabel>
            </>
          )}
          {intensities.length > 1 && (
            <Button
              style={{
                marginTop: "1.5rem",
                marginLeft: "1rem",
                height: "3rem",
                width: "3rem",
                fontSize: "1.5rem",
              }}
              onClick={() => removeIntensity(index)}
            >
              <MdDelete />
            </Button>
          )}
        </IntensityItem>
      ))}

      {/* Add Intensity Button */}
      {piramida && (
        <AddButton onClick={addIntensity}>
          <MdAdd /> Dodaj Intenzitet
        </AddButton>
      )}

      {/* Pyramid Toggle */}
      <CheckboxWrapper>
        <input
          type="checkbox"
          checked={piramida}
          onChange={(e) => setPiramida(e.target.checked)}
        />
        <label>Omogući Piramidu</label>
      </CheckboxWrapper>
    </IntensityContainer>
  );
};
