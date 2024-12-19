import { useState } from "react";
import Modal from "react-modal";
import { Duration } from "./Duration";
import { Intensity } from "./Intensity";
import { TrainingSegment } from "./TrainingSegment";
import "./TrainingPlan.css";
import { GymSegmentInput } from "./GymSegmentInput";
import { useDispatch } from "react-redux";
import { saveTrainingPlan } from "../../../../redux/slices/trainingPlanSlice";
import { AppDispatch } from "../../../../redux/store";
import { Plan, Segment, GymSegment } from "./types";

Modal.setAppElement("#root");

const TrainingPlan = () => {
  const [trainingPlans, setTrainingPlans] = useState<Plan[]>([
    { planName: "Plan 1", segments: [], gymSegments: [] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const trainingCategories = [
    {
      id: "1",
      name: "Izdržljivost",
      subcategories: [
        { id: "1-1", name: "Aerobna baza" },
        { id: "1-2", name: "Tempo" },
        { id: "1-3", name: "Dugi intervali" },
      ],
    },
    {
      id: "2",
      name: "Anaerobni",
      subcategories: [
        { id: "2-1", name: "Intervali za toleranciju laktata" },
        { id: "2-2", name: "Anaerobna snaga" },
        { id: "2-3", name: "Prelomljeni intervali" },
      ],
    },
    {
      id: "3",
      name: "Brzina",
      subcategories: [
        { id: "3-1", name: "Kratki intervalni sprintovi" },
        { id: "3-2", name: "Intervali u trkačkom ritmu" },
        { id: "3-3", name: "Vežbe startova" },
      ],
    },
    {
      id: "4",
      name: "Snaga",
      subcategories: [
        { id: "4-1", name: "Eksplozivni startovi" },
        { id: "4-2", name: "Maksimalni sprintovi" },
        { id: "4-3", name: "Veslanje sa otporom" },
      ],
    },
    {
      id: "5",
      name: "Brzinska izdržljivost",
      subcategories: [
        { id: "5-1", name: "Piramida intervala" },
        { id: "5-2", name: "Mešani intervali" },
        { id: "5-3", name: "Modeli Cross-trening (trčanje/bajs/plivanje)" },
      ],
    },
    {
      id: "6",
      name: "Tehnika",
      subcategories: [
        { id: "6-1", name: "Vežbe za efikasnost zaveslaja" },
        { id: "6-2", name: "Vežbe za ravnotežu i stabilnost" },
      ],
    },
    {
      id: "7",
      name: "Trka",
      subcategories: [
        { id: "7-1", name: "Tempo trke" },
        { id: "7-2", name: "Aktivni oporavak veslanjem" },
      ],
    },
  ];

  const addTrainingSegment = (planIndex: number) => {
    const newSegment: Segment = {
      name: "New Segment",
      type: "",
      category: "",
      durations: [{ duration: 60, unit: "s" }],
      unit: "s",
      intensityType: "Single Value",
      intensities: [{ value: "", duration: "", technique: "" }],
      seriesCount: 1,
      segmentCount: 1,
      pauseAfterSeries: 0,
      pauseAfterSegment: 0,
    };

    const updatedPlans = [...trainingPlans];
    updatedPlans[planIndex].segments.push(newSegment);
    setTrainingPlans(updatedPlans);
  };

  const addGymSegment = (planIndex: number) => {
    const newGymSegment: GymSegment = {
      name: "New Gym Segment",
      type: "", // Initially empty to select Cardio or Strength
      category: "",
      reps: undefined, // Specific to Strength
      weight: undefined, // Specific to Strength
      sets: undefined, // Specific to Strength
      pauseBetweenSets: undefined, // Specific to Strength
      duration: undefined, // Specific to Cardio
      distance: undefined, // Specific to Cardio
      intensity: undefined, // Specific to Cardio
      restTime: undefined, // Specific to Cardio
    };

    const updatedPlans = [...trainingPlans];
    updatedPlans[planIndex].gymSegments.push(newGymSegment);
    setTrainingPlans(updatedPlans);
  };

  const updateSegment = (
    planIndex: number,
    segmentIndex: number,
    updatedSegment: Segment
  ) => {
    setTrainingPlans((prevPlans) => {
      const updatedPlans = [...prevPlans];
      updatedPlans[planIndex].segments[segmentIndex] = updatedSegment;
      return updatedPlans;
    });
  };

  const updateGymSegment = (
    planIndex: number,
    gymSegmentIndex: number,
    updatedGymSegment: GymSegment
  ) => {
    setTrainingPlans((prevPlans) => {
      const updatedPlans = [...prevPlans];
      updatedPlans[planIndex].gymSegments[gymSegmentIndex] = updatedGymSegment;
      return updatedPlans;
    });
  };

  const handlePreview = () => {
    const formattedPlans = trainingPlans.map((plan) => ({
      name: plan.planName,
      exercises: [
        ...plan.segments.map((segment) => ({
          name: segment.name,
          variant: "standard",
          type: segment.type || "Endurance",
          category: segment.category || "default",
          unit: segment.unit,
          intensityType: segment.intensityType,
          durations: segment.durations,
          intensities: segment.intensities,
          series: segment.seriesCount,
          repetitions: segment.segmentCount,
          restBetweenSeries: segment.pauseAfterSeries,
          restBetweenRepetitions: segment.pauseAfterSegment,
        })),
        ...plan.gymSegments.map((gymSegment) => ({
          name: gymSegment.name,
          variant: gymSegment.type === "Strength" ? "strength" : "cardio",
          type: gymSegment.type,
          category: gymSegment.category || "default",
          reps: gymSegment.reps,
          weight: gymSegment.weight,
          sets: gymSegment.sets,
          pauseBetweenSets: gymSegment.pauseBetweenSets,
          duration: gymSegment.duration, // Cardio-specific
          distance: gymSegment.distance, // Cardio-specific
          intensity: gymSegment.intensity, // Cardio-specific
          restTime: gymSegment.restTime, // Cardio-specific
        })),
      ],
    }));

    setModalContent(JSON.stringify(formattedPlans, null, 2));
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    const formattedPlans = JSON.parse(modalContent);

    try {
      const resultAction = await dispatch(saveTrainingPlan(formattedPlans));
      if (saveTrainingPlan.fulfilled.match(resultAction)) {
        alert("Training plans saved successfully!");
      } else {
        alert(`Error: ${resultAction.payload}`);
      }
    } catch (error) {
      console.error("Unexpected error saving training plans:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Create a New Training Plan</h2>
      {trainingPlans.map((plan, planIndex) => (
        <div key={planIndex}>
          <input
            type="text"
            value={plan.planName}
            onChange={(e) => {
              const updatedPlans = [...trainingPlans];
              updatedPlans[planIndex].planName = e.target.value;
              setTrainingPlans(updatedPlans);
            }}
          />
          <h3>Standard Segments</h3>
          {plan.segments.map((segment, segmentIndex) => (
            <div key={segmentIndex}>
              <TrainingSegment
                segment={segment}
                onUpdate={(updatedSegment) =>
                  updateSegment(planIndex, segmentIndex, updatedSegment)
                }
                trainingCategories={trainingCategories}
              />

              {/* Conditionally show Duration and Intensity based on selected type and category */}
              {segment.type && segment.category && (
                <>
                  <Duration
                    initialDurations={segment.durations}
                    onDurationsChange={(values) => {
                      const updatedSegment = {
                        ...segment,
                        durations: values.durations,
                      };
                      updateSegment(planIndex, segmentIndex, updatedSegment);
                    }}
                  />
                  <Intensity
                    initialIntensityType={segment.intensityType}
                    initialIntensities={segment.intensities}
                    initialUnit={segment.unit}
                    onIntensitiesChange={(data) => {
                      const updatedSegment = {
                        ...segment,
                        intensityType: data.intensityType,
                        intensities: data.intensities,
                        unit: data.unit,
                      };
                      updateSegment(planIndex, segmentIndex, updatedSegment);
                    }}
                  />
                </>
              )}
            </div>
          ))}

          <h3>Gym Segments</h3>
          {plan.gymSegments.map((segment, gymSegmentIndex) => (
            <GymSegmentInput
              key={gymSegmentIndex}
              segment={segment}
              onUpdate={(updatedGymSegment) =>
                updateGymSegment(planIndex, gymSegmentIndex, updatedGymSegment)
              }
            />
          ))}

          <button onClick={() => addTrainingSegment(planIndex)}>
            Add Standard Segment
          </button>
          <button onClick={() => addGymSegment(planIndex)}>
            Add Gym Segment
          </button>
        </div>
      ))}

      <button onClick={handlePreview}>Preview & Save</button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Training Plan Summary</h2>
        <pre>{modalContent}</pre>
        <button onClick={handleConfirmSave}>Confirm</button>
        <button onClick={() => setIsModalOpen(false)}>Back</button>
      </Modal>
    </div>
  );
};

export default TrainingPlan;
