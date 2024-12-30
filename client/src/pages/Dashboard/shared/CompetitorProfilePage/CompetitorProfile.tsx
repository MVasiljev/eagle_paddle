/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  useEffect(() => {
    if (selectedCompetitorId) {
      const foundCompetitor = users.find(
        (user) => user._id === selectedCompetitorId
      );
      if (foundCompetitor) {
        setCompetitor(foundCompetitor);
      } else {
        setCompetitor(null);
      }
    }
  }, [selectedCompetitorId, users]);

  if (!competitor) {
    return <p>Loading profile...</p>;
  }

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Performance",
        data: [10, 20, 15, 30, 25, 40],
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
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Avatar"
          style={{ borderRadius: "10px" }}
        />
        <h1>{`${competitor.firstName} ${competitor.lastName}`}</h1>
        {/* <p>{competitor.role?.name || "N/A"}</p> */}
      </ProfileHeader>
      <Calendar
        events={[]}
        onEventClick={function (): void {
          throw new Error("Function not implemented.");
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
          <Label>First Name:</Label>
          <Value>{competitor.firstName}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Last Name:</Label>
          <Value>{competitor.lastName}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Approved:</Label>
          <Value>{competitor.approved ? "Yes" : "No"}</Value>
        </DetailRow>
      </ProfileDetails>

      {/* Statistics Section */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#fff", marginBottom: "20px" }}>
          Performance Statistics
        </h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </ProfileContainer>
  );
};

export default CompetitorProfile;
