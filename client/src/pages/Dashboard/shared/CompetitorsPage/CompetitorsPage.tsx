import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setView,
  setSelectedCompetitorId,
} from "../../../../redux/slices/viewSlice";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import {
  CompetitorsContainer,
  CompetitorsList,
  CompetitorCard,
  CompetitorAvatar,
  CompetitorName,
} from "./CompetitorsPage.styles";
import { useUsers } from "../../../../hooks/useUsers";
import { Views } from "../../../../constants/views";

const CompetitorsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { users, isLoading: isUsersLoading, error: usersError } = useUsers();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCompetitors = users.filter((competitor) =>
    `${competitor.firstName} ${competitor.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleCompetitorClick = (competitorId: string) => {
    dispatch(setSelectedCompetitorId(competitorId)); // Set selected competitor ID
    dispatch(setView(Views.PROFILE)); // Change view to PROFILE
  };

  return (
    <CompetitorsContainer>
      <SearchBar
        onSearch={(query) => setSearchQuery(query)}
        placeholder="Pretražite takmičare..."
      />
      {isUsersLoading ? (
        <p>Loading competitors...</p>
      ) : usersError ? (
        <p className="error">{usersError}</p>
      ) : (
        <CompetitorsList>
          {filteredCompetitors.map((competitor, index) => (
            <CompetitorCard
              key={competitor._id}
              onClick={() => handleCompetitorClick(competitor._id)}
            >
              <CompetitorAvatar
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt={`${competitor.firstName}`}
              />
              <CompetitorName>{competitor.firstName}</CompetitorName>
            </CompetitorCard>
          ))}
        </CompetitorsList>
      )}
    </CompetitorsContainer>
  );
};

export default CompetitorsPage;
