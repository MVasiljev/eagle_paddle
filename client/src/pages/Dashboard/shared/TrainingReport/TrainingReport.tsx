import React, { useState } from "react";
import { FaClock, FaHeartbeat, FaRunning, FaChartLine } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  TrainingReportContainer,
  TrainingTitle,
  CompetitorInfo,
  CompetitorAvatar,
  CompetitorName,
  ButtonGroup,
  ShowIcon,
  DataGroup,
  DataItem,
  DescriptionText,
  ChartContainer,
} from "./TrainingReport.style";
import {
  TrainingPlan,
  TrainingSession,
  TrainingSessionResults,
  User,
} from "../../../../types/types";
import TrainingModal from "../../../../components/TrainingModal/TrainingModal";

// Import the existing modal component

interface TrainingReportProps {
  session: TrainingSession | undefined;
  user: User | null;
}

const TrainingReport: React.FC<TrainingReportProps> = ({ session, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!session) return <p>No session data available.</p>;

  const results = session.results || ({} as TrainingSessionResults);
  const athlete =
    typeof session.athlete === "object" ? session.athlete : ({} as User);
  const plan = session.plan || ({} as TrainingPlan);

  const competitorName =
    athlete && typeof athlete !== "string"
      ? `${athlete.firstName} ${athlete.lastName || "User"}`
      : "Unknown Competitor";

  const formattedDate = session.date
    ? new Date(session.date).toLocaleDateString()
    : "N/A";

  const timeInZonesData = {
    labels: ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"],
    datasets: [
      {
        label: "Time in Zones",
        data: results.timeInZones || [0, 0, 0, 0, 0],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  return (
    <>
      <TrainingReportContainer>
        <TrainingTitle>{plan.name || "Training Report"}</TrainingTitle>

        <CompetitorInfo>
          <CompetitorAvatar
            src={
              user?.avatar ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
          />
          <CompetitorName>{competitorName}</CompetitorName>
        </CompetitorInfo>

        <DataGroup>
          <DataItem>
            <FaHeartbeat />
            <span>{String(results.HRrest) || "N/A"} bpm</span>
            <p>Puls u mirovanju</p>
          </DataItem>
          <DataItem>
            <FaClock />
            <span>{String(results.duration) || "N/A"} min</span>
            <p>Trajanje</p>
          </DataItem>
          <DataItem>
            <FaRunning />
            <span>{String(results.distance) || "N/A"} km</span>
            <p>Razdaljina</p>
          </DataItem>
          <DataItem>
            <FaChartLine />
            <span>{String(results.RPE) || "N/A"}</span>
            <p>RPE</p>
          </DataItem>
        </DataGroup>

        <DescriptionText>
          <strong>Plan Detalji:</strong>
          <p>
            <strong>Tip Plana:</strong> {plan.type || "Unknown"} <br />
            <strong>Datum Treninga:</strong> {formattedDate} <br />
            <strong>Status:</strong> {session.status || "N/A"}
          </p>
        </DescriptionText>

        {plan.exercises && plan.exercises.length > 0 && (
          <>
            <h3>Vežbe u Planu:</h3>
            {plan.exercises.map((exercise, index) => (
              <DescriptionText key={index}>
                <p>
                  <strong>{exercise.name}</strong> - {exercise.type} (
                  {exercise.category})
                </p>
              </DescriptionText>
            ))}
          </>
        )}

        {results.timeInZones && results.timeInZones.length > 0 && (
          <ChartContainer>
            <h3>Grafikon: Vreme u Zonama</h3>
            <Line data={timeInZonesData} />
          </ChartContainer>
        )}

        <ButtonGroup>
          <ShowIcon onClick={() => setIsModalOpen(true)}>
            👁️ Prikaži trening
          </ShowIcon>
        </ButtonGroup>
      </TrainingReportContainer>

      {/* Modal to Show Full Training Details */}
      {isModalOpen && (
        <TrainingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          session={session}
        />
      )}
    </>
  );
};

export default TrainingReport;
