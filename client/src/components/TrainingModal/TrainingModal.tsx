import React from "react";
import { TrainingSession, TrainingPlan } from "../../types/types";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); // Dim the background
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensure it is above everything
`;

const ModalContent = styled.div`
  background-color: #1c1c1e;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  text-align: left;
  color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #ffffff;
  cursor: pointer;
  color: white;

  &:hover {
    color: #d32f2f;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
  color: white;
`;

const ExerciseCard = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #2a2a2e;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: white;

  & p {
    margin: 0.5rem 0;
    color: white;
  }

  h4 {
    margin-top: 1rem;
    color: white;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: TrainingSession | undefined;
}

const TrainingModal: React.FC<ModalProps> = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  const plan = session.plan as TrainingPlan;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>{plan.name || "Detalji Treninga"}</ModalTitle>
        <p>
          <strong>Status:</strong> {session.status || "N/A"}
        </p>
        <p>
          {session.date
            ? new Date(session.date).toLocaleDateString("sr-Latn-RS", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "N/A"}{" "}
        </p>

        <h3>Vežbe u Planu:</h3>
        {plan.exercises && plan.exercises.length > 0 ? (
          plan.exercises.map((exercise, idx) => (
            <ExerciseCard key={idx}>
              <p>
                <strong>Ime:</strong> {exercise.name}
              </p>
              <p>
                <strong>Tip:</strong> {exercise.type}
              </p>
              <p>
                <strong>Kategorija:</strong> {exercise.category}
              </p>
              <p>
                <strong>Varijanta:</strong> {exercise.variant}
              </p>
              <p>
                <strong>Serije:</strong> {exercise.series}
              </p>
              <p>
                <strong>Ponavljanja:</strong> {exercise.repetitions}
              </p>
              <p>
                <strong>Odmor između serija:</strong>{" "}
                {exercise.restBetweenSeries} s
              </p>
              <p>
                <strong>Odmor između ponavljanja:</strong>{" "}
                {exercise.restBetweenRepetitions} s
              </p>

              <h4>Trajanja:</h4>
              {exercise.durations && exercise.durations.length > 0 ? (
                exercise.durations.map((duration, dIdx) => (
                  <p key={dIdx}>
                    {duration.duration} {duration.unit}
                  </p>
                ))
              ) : (
                <p>Nema trajanja.</p>
              )}

              <h4>Intenziteti:</h4>
              {exercise.intensities && exercise.intensities.length > 0 ? (
                exercise.intensities.map((intensity, iIdx) => (
                  <p key={iIdx}>
                    <strong>Vrednost:</strong> {intensity.value},{" "}
                    <strong>Trajanje:</strong> {intensity.duration}{" "}
                    {exercise.unit}{" "}
                    {intensity.technique && (
                      <span>
                        (<strong>Tehnika:</strong> {intensity.technique})
                      </span>
                    )}
                  </p>
                ))
              ) : (
                <p>Nema intenziteta.</p>
              )}
            </ExerciseCard>
          ))
        ) : (
          <p>Nema vežbi u planu.</p>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default TrainingModal;
