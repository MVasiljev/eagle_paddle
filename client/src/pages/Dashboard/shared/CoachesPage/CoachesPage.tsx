import React, { useState } from "react";
import "./CoachesPage.css";
import { useUsers } from "../../../../hooks/useUsers";
import { useRoles } from "../../../../hooks/useRoles";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const CoachesPage: React.FC = () => {
  const { users, isLoading: isUsersLoading, error: usersError } = useUsers();
  const { roles, isLoading: isRolesLoading, error: rolesError } = useRoles();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Default avatar URL
  const defaultAvatarUrl =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Filter coaches by matching role name
  const allCoaches = users.filter((user) => {
    const role = roles.find((role) => role._id === user.role?._id);
    return role?.name === "coach";
  });

  // Filter coaches based on the search query
  const filteredCoaches = allCoaches.filter((coach) => {
    const fullName = `${coach.firstName} ${coach.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query state
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Approved Coaches</h2>
      <SearchBar onSearch={handleSearch} placeholder="Search coaches..." />

      {isUsersLoading || isRolesLoading ? (
        <p>Loading coaches...</p>
      ) : usersError || rolesError ? (
        <p className="error">{usersError || rolesError}</p>
      ) : filteredCoaches.length === 0 ? (
        <p>No coaches found matching your search.</p>
      ) : (
        <div className="coaches-list">
          {filteredCoaches.map((coach) => (
            <div key={coach._id} className="coach-card">
              <img
                src={defaultAvatarUrl}
                alt={`${coach.firstName} ${coach.lastName}`}
                className="coach-avatar"
              />
              <div className="coach-info">
                <h3 className="coach-name">
                  {coach.firstName} {coach.lastName}
                </h3>
                <p className="coach-email">{coach.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachesPage;
