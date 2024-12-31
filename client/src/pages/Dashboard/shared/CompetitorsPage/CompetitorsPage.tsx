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
  ExportButton,
} from "./CompetitorsPage.styles";
import { useUsers } from "../../../../hooks/useUsers";
import { Views } from "../../../../constants/views";
import { useRoles } from "../../../../hooks/useRoles";
import Papa from "papaparse";  // Import papaparse

const CompetitorsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { roles } = useRoles();
  const { users, isLoading: isUsersLoading, error: usersError } = useUsers();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const competitors = users.filter((user) => {
    const role = roles.find((role) => role._id === user.role?._id);
    return role?.name === "competitor";
  });

  const filteredCompetitors = competitors.filter((competitor) =>
    `${competitor.firstName} ${competitor.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleCompetitorClick = (competitorId: string) => {
    dispatch(setSelectedCompetitorId(competitorId)); 
    dispatch(setView(Views.PROFILE)); 
  };

  // Export to CSV Logic
  const exportToCSV = () => {
    const csvData = filteredCompetitors.map((competitor) => ({
      firstName: competitor.firstName,
      lastName: competitor.lastName,
      email: competitor.email,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "competitors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <CompetitorsContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBar
          onSearch={(query) => setSearchQuery(query)}
          placeholder="Pretražite takmičare..."
        />
        <ExportButton onClick={exportToCSV}>Export to CSV</ExportButton>
      </div>

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
