import React from "react";
import {
  TableContainer,
  TableHeader,
  TableRow,
  TableCell,
  PlanSummaryContainer,
  PlanSummaryTitle,
  Button,
  ButtonContainer,
} from "./TrainingPlanSummary.styles"; // import the styles

const TrainingPlanSummary = ({ planDetails: any }) => {
  // Example hardcoded plan
  const plan = planDetails || {
    name: "Glavni trening",
    type: "standard",
    categories: ["default"],
    exercises: [
      {
        name: "Zagrevanje",
        variant: "standard",
        type: "Endurance",
        category: "Aerobic Base",
        unit: "m",
        intensityType: "single",
        durations: [
          { duration: 60, unit: "s" },
          { duration: 60, unit: "s" },
          { duration: 60, unit: "s" },
        ],
        intensities: [
          { value: 1, duration: 1, technique: 20 },
          { value: 4, duration: 4, technique: 2 },
        ],
        series: 1,
        repetitions: 1,
        restBetweenSeries: 0,
        restBetweenRepetitions: 0,
      },
    ],
  };

  return (
    <TableContainer>
      <PlanSummaryContainer>
        <PlanSummaryTitle>
          {plan.name} - {plan.type} plan
        </PlanSummaryTitle>
        <div>
          <strong>Categories:</strong> {plan.categories.join(", ")}
        </div>
        <div>
          <strong>Exercises:</strong>
          {plan.exercises.map((exercise, index) => (
            <TableContainer key={index}>
              <TableHeader>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Intensity</TableCell>
              </TableHeader>
              <TableRow>
                <TableCell>{exercise.name}</TableCell>
                <TableCell>{exercise.type}</TableCell>
                <TableCell>{exercise.category}</TableCell>
                <TableCell>
                  {exercise.durations.map((dur, idx) => (
                    <div key={idx}>
                      {dur.duration} {dur.unit}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {exercise.intensities.map((int, idx) => (
                    <div key={idx}>
                      {int.value}% for {int.duration}s - Technique:{" "}
                      {int.technique}
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            </TableContainer>
          ))}
        </div>
      </PlanSummaryContainer>

      <ButtonContainer>
        <Button onClick={() => alert("Action confirmed")}>Confirm</Button>
        <Button onClick={() => alert("Action cancelled")}>Cancel</Button>
      </ButtonContainer>
    </TableContainer>
  );
};

export default TrainingPlanSummary;
