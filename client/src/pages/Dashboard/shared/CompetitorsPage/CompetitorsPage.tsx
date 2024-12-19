import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CompetitorsPage.css";
import { useUsers } from "../../../../hooks/useUsers";
import { useRoles } from "../../../../hooks/useRoles";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const CompetitorsPage: React.FC = () => {
  const { users, isLoading: isUsersLoading, error: usersError } = useUsers();
  const { roles, isLoading: isRolesLoading, error: rolesError } = useRoles();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Default avatar URL
  const defaultAvatarUrl =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Filter competitors by matching role name
  const allCompetitors = users.filter((user) => {
    const role = roles.find((role) => role._id === user.role?._id);
    return role?.name === "competitor";
  });

  // Filter competitors based on the search query
  const filteredCompetitors = allCompetitors.filter((competitor) => {
    const fullName =
      `${competitor.firstName} ${competitor.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      competitor.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query state
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Approved Competitors</h2>
      <SearchBar onSearch={handleSearch} placeholder="Search competitors..." />

      {isUsersLoading || isRolesLoading ? (
        <p>Loading competitors...</p>
      ) : usersError || rolesError ? (
        <p className="error">{usersError || rolesError}</p>
      ) : filteredCompetitors.length === 0 ? (
        <p>No competitors found matching your search.</p>
      ) : (
        <div className="competitors-list">
          {filteredCompetitors.map((competitor) => (
            <Link
              to={`/dashboard/competitor/${competitor._id}`}
              key={competitor._id}
              className="competitor-card"
            >
              <img
                src={defaultAvatarUrl}
                alt={`${competitor.firstName} ${competitor.lastName}`}
                className="competitor-avatar"
              />
              <div className="competitor-info">
                <h3 className="competitor-name">
                  {competitor.firstName} {competitor.lastName}
                </h3>
                <p className="competitor-email">{competitor.email}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitorsPage;
