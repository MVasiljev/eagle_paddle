import { useState, useEffect } from "react";
import { ExerciseSegment, TrainingCategory } from "./types";
import {
  SegmentContainer,
  SegmentHeader,
  SegmentField,
  Label,
  Input,
  Select,
} from "./TrainingSegment.styles";

interface SegmentProps {
  segment: ExerciseSegment;
  onUpdate: (updatedSegment: ExerciseSegment) => void;
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

  const handleChange = <K extends keyof ExerciseSegment>(
    field: K,
    value: ExerciseSegment[K]
  ) => {
    const updatedSegment = { ...localSegment, [field]: value };
    setLocalSegment(updatedSegment);
    onUpdate(updatedSegment);
  };

  return (
    <SegmentContainer>
      <SegmentHeader>Trening Segment</SegmentHeader>

      {/* Segment Name */}
      <SegmentField>
        <Label>Ime Segmenta:</Label>
        <Input
          type="text"
          value={localSegment.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ime Segmenta"
        />
      </SegmentField>

      {/* Variant Selection (Standard/Gym) */}
      {/* <SegmentField> */}
      {/* <Label>Varijanta:</Label>
        <Select
          value={localSegment.variant}
          onChange={(e) =>
            handleChange("variant", e.target.value as "standard" | "gym")
          }
        >
          <option value="">Izaberite Varijantu</option>
          <option value="standard">Standard</option>
          <option value="gym">Gym</option>
        </Select>
      </SegmentField> */}

      {/* Type Selection */}
      <SegmentField>
        <Label>Tip:</Label>
        <Select
          value={localSegment.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">Izaberite Tip</option>
          {trainingCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>
      </SegmentField>

      {/* Category Selection */}
      <SegmentField>
        <Label>Kategorija:</Label>
        <Select
          value={localSegment.category}
          onChange={(e) => handleChange("category", e.target.value)}
          disabled={!localSegment.type}
        >
          <option value="">Izaberite Kategoriju</option>
          {filteredCategories.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </Select>
      </SegmentField>

      {/* Additional Segment Inputs */}
      {localSegment.type && localSegment.category && (
        <>
          {/* Series (Standard Segment) */}
          {localSegment.variant === "standard" && (
            <>
              <SegmentField>
                <Label>Broj Serija:</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.series || 0}
                  onChange={(e) => handleChange("series", +e.target.value)}
                  placeholder="Broj Serija"
                />
              </SegmentField>

              <SegmentField>
                <Label>Broj Ponavljanja:</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.repetitions || 0}
                  onChange={(e) => handleChange("repetitions", +e.target.value)}
                  placeholder="Broj Ponavljanja"
                />
              </SegmentField>

              <SegmentField>
                <Label>Pauza posle Serije (s):</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.restBetweenSeries || 0}
                  onChange={(e) =>
                    handleChange("restBetweenSeries", +e.target.value)
                  }
                  placeholder="Pauza posle Serije (s)"
                />
              </SegmentField>

              <SegmentField>
                <Label>Pauza posle Ponavljanja (s):</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.restBetweenRepetitions || 0}
                  onChange={(e) =>
                    handleChange("restBetweenRepetitions", +e.target.value)
                  }
                  placeholder="Pauza posle Ponavljanja (s)"
                />
              </SegmentField>
            </>
          )}

          {/* Gym Segment Inputs */}
          {localSegment.variant === "gym" && (
            <>
              <SegmentField>
                <Label>Broj Setova:</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.sets || 0}
                  onChange={(e) => handleChange("sets", +e.target.value)}
                  placeholder="Broj Setova"
                />
              </SegmentField>

              <SegmentField>
                <Label>Ponavljanja:</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.reps || 0}
                  onChange={(e) => handleChange("reps", +e.target.value)}
                  placeholder="Ponavljanja"
                />
              </SegmentField>

              <SegmentField>
                <Label>Težina (kg):</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.weight || 0}
                  onChange={(e) => handleChange("weight", +e.target.value)}
                  placeholder="Težina (kg)"
                />
              </SegmentField>

              <SegmentField>
                <Label>Pauza između Setova (s):</Label>
                <Input
                  type="number"
                  min="0"
                  value={localSegment.pauseBetweenSets || 0}
                  onChange={(e) =>
                    handleChange("pauseBetweenSets", +e.target.value)
                  }
                  placeholder="Pauza između Setova (s)"
                />
              </SegmentField>
            </>
          )}
        </>
      )}
    </SegmentContainer>
  );
};
