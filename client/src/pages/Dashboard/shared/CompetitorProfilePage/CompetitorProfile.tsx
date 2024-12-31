import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileAvatar,
  ProfileDetails,
  DetailRow,
  Label,
  Value,
} from "./CompetitorProfile.styles";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useUsers } from "../../../../hooks/useUsers";
import Calendar from "../../../../components/Calendar/Calendar";
import { useTrainingSessions } from "../../../../hooks/useTrainingSession";
import { setView } from "../../../../redux/slices/viewSlice";
import { Views } from "../../../../constants/views";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface Competitor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: {
    name: string;
  };
  approved: boolean;
}

const CompetitorProfile: React.FC = () => {
  const { users } = useUsers();
  const selectedCompetitorId = useSelector(
    (state: RootState) => state.dashboard.selectedCompetitorId
  );

  const [competitor, setCompetitor] = useState<Competitor | null>(null);
  const { sessions } = useTrainingSessions();

  const [filteredSessions, setFilteredSessions] = useState<typeof sessions>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCompetitorId) {
      const foundCompetitor = users.find(
        (user) => user._id === selectedCompetitorId
      );
      setCompetitor(foundCompetitor || null);
    }
  }, [selectedCompetitorId, users]);

  // Filter sessions by competitor and date range
  useEffect(() => {
    if (sessions && selectedCompetitorId) {
      const filtered = sessions.filter(
        (session) =>
          typeof session.athlete !== "string" &&
          session.athlete?._id === selectedCompetitorId &&
          (!startDate || new Date(session.date) >= startDate) &&
          (!endDate || new Date(session.date) <= endDate)
      );
      setFilteredSessions(filtered);
    }
  }, [sessions, selectedCompetitorId, startDate, endDate]);

  // Total distance calculation
  const totalDistance = filteredSessions.reduce(
    (sum, session) => sum + (session.results?.distance || 0),
    0
  );

  // Populate chart with filtered sessions
  const chartData = {
    labels: filteredSessions.map((session) =>
      new Date(session.date).toLocaleDateString("sr-RS")
    ),
    datasets: [
      {
        label: "Distanca po treningu (km)",
        data: filteredSessions.map((session) => session.results?.distance),
        borderColor: "#6a5acd",
        backgroundColor: "rgba(106, 90, 205, 0.1)",
        pointBorderColor: "#6a5acd",
        pointBackgroundColor: "#6a5acd",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  if (!competitor) {
    return <p>Učitavanje profila...</p>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Avatar"
          style={{ borderRadius: "10px" }}
        />
        <h1>{`${competitor.firstName} ${competitor.lastName}`}</h1>
      </ProfileHeader>

      <Calendar
        events={filteredSessions.map((session) => ({
          id: session._id,
          title: session.plan.name,
          start: session.date,
          extendedProps: {
            status: session.status,
          },
        }))}
        onEventClick={function (): void {
          dispatch(setView(Views.TRAINING_RESULTS));
        }}
        onDateClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <ProfileDetails>
        <DetailRow>
          <Label>Email:</Label>
          <Value>{competitor.email}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Ime:</Label>
          <Value>{competitor.firstName}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Prezime:</Label>
          <Value>{competitor.lastName}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Odobren:</Label>
          <Value>{competitor.approved ? "Da" : "Ne"}</Value>
        </DetailRow>
      </ProfileDetails>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#fff" }}>Ukupno preveslano: {totalDistance} km</h3>

        <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
          <div>
            <label style={{ color: "#fff" }}>Od: </label>
            <input
              type="date"
              onChange={(e) => setStartDate(new Date(e.target.value))}
              style={{ padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <div>
            <label style={{ color: "#fff" }}>Do: </label>
            <input
              type="date"
              onChange={(e) => setEndDate(new Date(e.target.value))}
              style={{ padding: "8px", borderRadius: "5px" }}
            />
          </div>
        </div>

        <Line data={chartData} options={chartOptions} />

        <table
          style={{
            width: "100%",
            marginTop: "30px",
            color: "#fff",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px 15px" }}>Datum</th>
              <th style={{ textAlign: "left", padding: "12px 15px" }}>Plan</th>
              <th style={{ textAlign: "left", padding: "12px 15px" }}>
                Distanca (km)
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr key={session._id}>
                <td style={{ padding: "12px 15px" }}>
                  {new Date(session.date).toLocaleDateString("sr-RS")}
                </td>
                <td style={{ padding: "12px 15px" }}>{session.plan.name}</td>
                <td style={{ padding: "12px 15px" }}>
                  {session.results?.distance} km
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProfileContainer>
  );
};

export default CompetitorProfile;
