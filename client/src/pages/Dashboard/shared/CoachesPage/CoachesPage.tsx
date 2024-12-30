import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setView,
  setSelectedCoachId,
} from "../../../../redux/slices/viewSlice";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import {
  CoachesContainer,
  CoachesList,
  CoachCard,
  CoachAvatar,
  CoachName,
} from "./CoachesPage.styles";
import { useUsers } from "../../../../hooks/useUsers";
import { useRoles } from "../../../../hooks/useRoles";
import { Views } from "../../../../constants/views";

const CoachesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { users, isLoading: isUsersLoading, error: usersError } = useUsers();
  const { roles, isLoading: isRolesLoading, error: rolesError } = useRoles();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allCoaches = users.filter((user) => {
    const role = roles.find((role) => role._id === user.role?._id);
    return role?.name === "coach";
  });

  const filteredCoaches = allCoaches.filter((coach) => {
    const fullName = `${coach.firstName} ${coach.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCoachClick = (coachId: string) => {
    dispatch(setSelectedCoachId(coachId)); // Set selected coach ID
    dispatch(setView(Views.COACH_PROFILE)); // Change view to PROFILE
  };

  return (
    <CoachesContainer>
      <SearchBar
        onSearch={(query) => setSearchQuery(query)}
        placeholder="Search coaches..."
      />
      {isUsersLoading || isRolesLoading ? (
        <p>Loading coaches...</p>
      ) : usersError || rolesError ? (
        <p className="error">{usersError || rolesError}</p>
      ) : filteredCoaches.length === 0 ? (
        <p>No coaches found matching your search.</p>
      ) : (
        <CoachesList>
          {filteredCoaches.map((coach, index) => (
            <CoachCard
              key={coach._id}
              onClick={() => handleCoachClick(coach._id)}
            >
              <CoachAvatar
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt={`${coach.firstName}`}
              />
              <CoachName>{coach.firstName}</CoachName>
            </CoachCard>
          ))}
        </CoachesList>
      )}
    </CoachesContainer>
  );
};

export default CoachesPage;
