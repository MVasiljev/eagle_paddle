import React from "react";
import { TrainingSession, TrainingPlan } from "../../types/types";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
  cursor: pointer;
  color: white;

  &:hover {
    color: #d32f2f;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ExerciseCard = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #2a2a2e;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TrainingSession | TrainingPlan | undefined;
}

// Type Guard to Check if Data is a TrainingSession
const isSession = (
  data: TrainingSession | TrainingPlan
): data is TrainingSession => {
  return (data as TrainingSession).plan !== undefined;
};

const TrainingModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const renderPlanDetails = (plan: TrainingPlan) => (
    <>
      <ModalTitle>{plan.name || "Detalji Plana"}</ModalTitle>
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
              <strong>Serije:</strong> {exercise.series}
            </p>
            <p>
              <strong>Ponavljanja:</strong> {exercise.repetitions}
            </p>
          </ExerciseCard>
        ))
      ) : (
        <p>Nema vežbi u planu.</p>
      )}
    </>
  );

  const renderSessionDetails = (session: TrainingSession) => {
    const plan = session.plan as TrainingPlan;
    return (
      <>
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
            : "N/A"}
        </p>
        {renderPlanDetails(plan)}
      </>
    );
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {isSession(data) ? renderSessionDetails(data) : renderPlanDetails(data)}
      </ModalContent>
    </ModalOverlay>
  );
};

export default TrainingModal;
