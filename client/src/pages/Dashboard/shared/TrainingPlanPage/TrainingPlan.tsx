/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Duration } from "./Duration";
import { Intensity } from "./Intensity";
import { TrainingSegment } from "./TrainingSegment";
import { GymSegmentInput } from "./GymSegmentInput";
import { useDispatch } from "react-redux";
import { saveTrainingPlan } from "../../../../redux/slices/trainingPlanSlice";
import { AppDispatch } from "../../../../redux/store";
import { Plan, ExerciseSegment } from "./types";
import { SubHeading } from "../../../../components/Auth/loginForm.style";
import { Heading } from "../../../Home/Home.styles";
import {
  Button,
  ButtonContainer,
  Container,
  Input,
  ModalContent,
} from "./TrainingPlan.styles";
import { useTrainingTypes } from "../../../../hooks/useTrainingTypes";

Modal.setAppElement("#root");

const TrainingPlan = () => {
  const [trainingPlans, setTrainingPlans] = useState<Plan[]>([
    { planName: "Plan 1", exercises: [] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const { types: trainingTypes, getTrainingTypes } = useTrainingTypes();

  useEffect(() => {
    getTrainingTypes(); // Fetch all training types on component mount
  }, []);

  const trainingCategories = trainingTypes
    .filter((type) => type.variant === "standard")
    .map((type) => ({
      id: type._id,
      name: type.name,
      subcategories: type.categories.map((cat) => ({
        id: `${type._id}-${cat}`,
        name: cat,
      })),
    }));

  const addTrainingSegment = (planIndex: number) => {
    const newSegment: ExerciseSegment = {
      name: "Novi Segment",
      variant: "standard",
      type: "",
      category: "",
      durations: [{ duration: 60, unit: "s" }],
      unit: "s",
      intensityType: "single",
      intensities: [{ value: "", duration: "", technique: "" }],
      series: 1,
      repetitions: 1,
      restBetweenSeries: 0,
      restBetweenRepetitions: 0,
    };

    const updatedPlans = [...trainingPlans];
    updatedPlans[planIndex].exercises.push(newSegment);
    setTrainingPlans(updatedPlans);
  };

  const addGymSegment = (planIndex: number) => {
    const newGymSegment: ExerciseSegment = {
      name: "Novi Gym Segment",
      variant: "gym",
      type: "",
      category: "",
      reps: undefined,
      weight: undefined,
      sets: undefined,
      pauseBetweenSets: undefined,
      duration: undefined,
      distance: undefined,
      intensity: undefined,
      exercise: "",
    };

    const updatedPlans = [...trainingPlans];
    updatedPlans[planIndex].exercises.push(newGymSegment);
    setTrainingPlans(updatedPlans);
  };

  const updateSegment = (
    planIndex: number,
    segmentIndex: number,
    updatedSegment: ExerciseSegment
  ) => {
    setTrainingPlans((prevPlans) => {
      const updatedPlans = [...prevPlans];
      updatedPlans[planIndex].exercises[segmentIndex] = updatedSegment;
      return updatedPlans;
    });
  };

  const handlePreview = () => {
    const formattedPlans = trainingPlans.map((plan) => ({
      name: plan.planName,
      exercises: plan.exercises.map((segment) => ({
        name: segment.name,
        variant: segment.variant,
        type: segment.type || "Endurance",
        category: segment.category || "default",
        unit: segment.unit,
        intensityType: segment.intensityType,
        durations: segment.durations,
        intensities: segment.intensities,
        series: segment.series,
        repetitions: segment.repetitions,
        restBetweenSeries: segment.restBetweenSeries,
        restBetweenRepetitions: segment.restBetweenRepetitions,
        reps: segment.reps,
        weight: segment.weight,
        sets: segment.sets,
        pauseBetweenSets: segment.pauseBetweenSets,
        duration: segment.duration,
        distance: segment.distance,
        intensity: segment.intensity,
        exercise: segment.exercise,
      })),
    }));

    setModalContent(JSON.stringify(formattedPlans, null, 2));
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    const formattedPlans = JSON.parse(modalContent);

    try {
      const resultAction = await dispatch(saveTrainingPlan(formattedPlans));
      if (saveTrainingPlan.fulfilled.match(resultAction)) {
        alert("Planovi treninga su uspešno sačuvani!");
      } else {
        alert(`Greška: ${resultAction.payload}`);
      }
    } catch (error) {
      console.error(
        "Neočekivana greška prilikom čuvanja planova treninga:",
        error
      );
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <Container>
      {trainingPlans.map((plan, planIndex) => (
        <div key={planIndex}>
          <Input
            type="text"
            value={plan.planName}
            onChange={(e) => {
              const updatedPlans = [...trainingPlans];
              updatedPlans[planIndex].planName = e.target.value;
              setTrainingPlans(updatedPlans);
            }}
          />
          <SubHeading>Standardni Segmenti</SubHeading>
          {plan.exercises
            .filter((segment) => segment.variant === "standard")
            .map((segment, segmentIndex) => (
              <div key={segmentIndex}>
                <TrainingSegment
                  segment={segment}
                  onUpdate={(updatedSegment) =>
                    updateSegment(planIndex, segmentIndex, updatedSegment)
                  }
                  trainingCategories={trainingCategories}
                />
                {segment.type && segment.category && (
                  <>
                    <Duration
                      initialDurations={segment.durations}
                      onDurationsChange={(values) => {
                        const updatedSegment = {
                          ...segment,
                          durations: values.durations.map((d) => ({
                            duration: d.duration,
                            unit: d.unit as "m" | "km" | "s" | "min", // Explicitly cast the unit
                          })),
                        };
                        updateSegment(planIndex, segmentIndex, updatedSegment);
                      }}
                    />
                    <Intensity
                      initialIntensityType={segment.intensityType}
                      initialIntensities={segment.intensities}
                      initialUnit={segment.unit as "m" | "km" | "s" | "min"} // Ensure unit is cast to match the expected type
                      onIntensitiesChange={(data) => {
                        const updatedSegment = {
                          ...segment,
                          intensityType: data.intensityType as
                            | "single"
                            | "multiple"
                            | "time-intensity"
                            | "technique-time-intensity",
                          intensities: data.intensities,
                          unit: data.unit as "m" | "km" | "s" | "min",
                        };
                        updateSegment(planIndex, segmentIndex, updatedSegment);
                      }}
                    />
                  </>
                )}
              </div>
            ))}

          <SubHeading>Gym Segmenti</SubHeading>
          {plan.exercises
            .filter((segment) => segment.variant === "gym")
            .map((segment, gymSegmentIndex) => (
              <GymSegmentInput
                key={gymSegmentIndex}
                segment={segment}
                onUpdate={(updatedGymSegment) =>
                  updateSegment(planIndex, gymSegmentIndex, updatedGymSegment)
                }
              />
            ))}

          <ButtonContainer>
            <Button onClick={() => addTrainingSegment(planIndex)}>
              Dodaj Standardni Segment
            </Button>
            <Button onClick={() => addGymSegment(planIndex)}>
              Dodaj Gym Segment
            </Button>
          </ButtonContainer>
        </div>
      ))}

      <Button onClick={handlePreview}>Pregledaj i sačuvaj</Button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <Heading>Pregled Plana Treninga</Heading>
          <pre>{modalContent}</pre>
          <Button onClick={handleConfirmSave}>Potvrdi</Button>
          <Button onClick={() => setIsModalOpen(false)}>Nazad</Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default TrainingPlan;
