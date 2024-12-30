/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useUsers } from "../../../../hooks/useUsers";
import {
  DetailRow,
  Label,
  ProfileAvatar,
  ProfileContainer,
  ProfileDetails,
  ProfileHeader,
  Value,
} from "./CoachProfile.styles";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: {
    name: string;
  };
  approved: boolean;
}

const CoachProfile: React.FC = () => {
  const { users } = useUsers();
  const selectedCoachId = useSelector(
    (state: RootState) => state.dashboard.selectedCoachId
  );

  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    if (selectedCoachId) {
      const foundCoach = users.find((user) => user._id === selectedCoachId);
      if (foundCoach) {
        setCoach(foundCoach);
      } else {
        setCoach(null);
      }
    }
  }, [selectedCoachId, users]);

  if (!coach) {
    return <p>Loading profile...</p>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Avatar"
        />
        <h1>{`${coach.firstName} ${coach.lastName}`}</h1>
      </ProfileHeader>
      <ProfileDetails>
        <DetailRow>
          <Label>Email:</Label>
          <Value>{coach.email}</Value>
        </DetailRow>
        <DetailRow>
          <Label>First Name:</Label>
          <Value>{coach.firstName}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Last Name:</Label>
          <Value>{coach.lastName}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Approved:</Label>
          <Value>{coach.approved ? "Yes" : "No"}</Value>
        </DetailRow>
      </ProfileDetails>

      {/* Statistics Section */}
    </ProfileContainer>
  );
};

export default CoachProfile;
