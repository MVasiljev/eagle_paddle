/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedCompetitorId,
  setView,
} from "../../../../redux/slices/viewSlice";
import { Views } from "../../../../constants/views";
import {
  TrainingEventContainer,
  TrainingTitle,
  ButtonGroup,
  CompetitorList,
  CompetitorCard,
  CompetitorAvatar,
  CompetitorName,
  EditIcon,
  ShowIcon,
} from "./TrainingEvent.styles";
import TrainingModal from "../../../../components/TrainingModal/TrainingModal";

interface Competitor {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  completed: boolean;
}

interface TrainingEventProps {
  competitors: Competitor[];
  title: string;
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any; // Session data passed to modal
}

const TrainingEvent: React.FC<TrainingEventProps> = ({
  competitors,
  title,
  date,
  session,
}) => {
  console.log("TrainingEvent", session);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const completedCompetitors = competitors.filter((c) => c.completed);
  const notCompletedCompetitors = competitors.filter((c) => !c.completed);

  const handleShowTraining = () => {
    setIsModalOpen(true); // Open modal on click
  };

  const handleEditTraining = () => {
    // dispatch(setView(Views.TRAINING_EDIT)); // Switch to edit view
    console.log("Edit training");
  };

  return (
    <TrainingEventContainer>
      <TrainingTitle>
        {title} - {new Date(date).toLocaleDateString("sr-RS")}
      </TrainingTitle>

      <ButtonGroup>
        <ShowIcon onClick={handleShowTraining}>👁️ Prikaži trening</ShowIcon>
        <EditIcon onClick={handleEditTraining}>✏️ Izmeni Trening</EditIcon>
      </ButtonGroup>

      {/* Completed Competitors */}
      <h3>Kompletirali trening:</h3>
      <CompetitorList>
        {completedCompetitors.length > 0 ? (
          completedCompetitors.map((competitor) => (
            <CompetitorCard
              key={competitor._id}
              onClick={() => {
                dispatch(setSelectedCompetitorId(competitor._id)); // Set selected competitor ID
                dispatch(setView(Views.PROFILE)); // Change view to PROFILE
              }}
            >
              <CompetitorAvatar
                src={
                  competitor.avatar ||
                  `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"`
                }
                // alt={`${competitor.firstName} ${competitor.lastName}`}
              />
              <CompetitorName>
                {competitor.firstName} {competitor.lastName}
              </CompetitorName>
            </CompetitorCard>
          ))
        ) : (
          <p>Nema takmičara koji su završili trening.</p>
        )}
      </CompetitorList>

      {/* Not Completed Competitors */}
      <h3>Nisu kompletirali trening:</h3>
      <CompetitorList>
        {notCompletedCompetitors.length > 0 ? (
          notCompletedCompetitors.map((competitor) => (
            <CompetitorCard
              key={competitor._id}
              onClick={() => {
                dispatch(setSelectedCompetitorId(competitor._id)); // Set selected competitor ID
                dispatch(setView(Views.PROFILE)); // Change view to PROFILE
              }}
            >
              <CompetitorAvatar
                src={
                  competitor.avatar ||
                  `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"`
                }
                // alt={`${competitor.firstName} ${competitor.lastName}`}
              />
              <CompetitorName>
                {competitor.firstName} {competitor.lastName}
              </CompetitorName>
            </CompetitorCard>
          ))
        ) : (
          <p>Svi takmičari su završili trening.</p>
        )}
      </CompetitorList>

      {/* Modal for Detailed Session View */}
      <TrainingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={session}
      />
    </TrainingEventContainer>
  );
};

export default TrainingEvent;
