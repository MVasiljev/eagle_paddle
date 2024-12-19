import React from "react";
import "./CoachProfile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const CoachProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const avatarUrl =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"; // Default avatar image

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={avatarUrl} alt="Avatar" className="profile-avatar" />
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <p className="profile-role">{user.role?.name || "Coach"}</p>
      </div>
      <div className="profile-details">
        <div className="detail-row">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        <div className="detail-row">
          <label>First Name:</label>
          <span>{user.firstName}</span>
        </div>
        <div className="detail-row">
          <label>Last Name:</label>
          <span>{user.lastName}</span>
        </div>
        <div className="detail-row">
          <label>Approved:</label>
          <span>{user.approved ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
