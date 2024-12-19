import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "../../../../hooks/useUsers";
import "./CompetitorProfile.css";

const CompetitorProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users } = useUsers();
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

  const [competitor, setCompetitor] = useState<Competitor | null>(null);

  useEffect(() => {
    if (userId) {
      const foundCompetitor = users.find((user) => user._id === userId);
      if (foundCompetitor) {
        setCompetitor(foundCompetitor);
      }
    }
  }, [userId, users]);

  if (!competitor) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Avatar"
          className="profile-avatar"
        />
        <h1>{`${competitor.firstName} ${competitor.lastName}`}</h1>
        <p className="profile-role">{competitor.role?.name || "N/A"}</p>
      </div>
      <div className="profile-details">
        <div className="detail-row">
          <label>Email:</label>
          <span>{competitor.email}</span>
        </div>
        <div className="detail-row">
          <label>First Name:</label>
          <span>{competitor.firstName}</span>
        </div>
        <div className="detail-row">
          <label>Last Name:</label>
          <span>{competitor.lastName}</span>
        </div>
        <div className="detail-row">
          <label>Approved:</label>
          <span>{competitor.approved ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
};

export default CompetitorProfile;
