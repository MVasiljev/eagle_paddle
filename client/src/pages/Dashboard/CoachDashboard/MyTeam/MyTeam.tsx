import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useTeams } from "../../../../hooks/useTeams";
import { ITeam } from "../../../../types/types";
import {
  FormWrapper,
  Heading,
  Button,
  MemberTable,
  TableRow,
  TableCell,
  TableHeader,
} from "./MyTeam.styles";
import { setEditTeam } from "../../../../redux/slices/teamSlice";
import { setView } from "../../../../redux/slices/viewSlice";
import { Views } from "../../../../constants/views";
import { useEffect } from "react";
import { ButtonContainer } from "../../shared/TrainingPlanPage/TrainingPlan.styles";
import { RootState } from "../../../../redux/store";

export const MyTeam = () => {
  const dispatch = useDispatch();
  const { fetchAllTeams, teams, removeTeam } = useTeams();
  const { user } = useSelector((state: RootState) => state.auth); // Get the current user

  // Fetch teams when component mounts
  useEffect(() => {
    if (!teams.length) {
      fetchAllTeams();
    }
  }, [fetchAllTeams, teams.length]);

  // Filter to get the team that belongs to the logged-in user
  const team = teams.find((t) => {
    const coach = t.coach as { _id: string } | null;
    return coach?._id === user?._id;
  });

  const handleEdit = (team: ITeam) => {
    dispatch(setEditTeam(team)); // Set the team for editing
    dispatch(setView(Views.CREATE_TEAM)); // Navigate to edit form
  };

  const handleCreate = () => {
    dispatch(setView(Views.CREATE_TEAM)); // Navigate to create form
  };

  const handleDelete = (teamId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team? This action cannot be undone."
    );
    if (confirmDelete) {
      removeTeam(teamId);
      dispatch(setView(Views.CREATE_TEAM));
    }
  };

  return (
    <FormWrapper>
      <Heading>{team ? team.name : "No Team Yet"}</Heading>
      {team ? (
        <div>
          <h3 style={{ color: "#a8a8a8", marginBottom: "15px" }}>
            Team Members
          </h3>
          {team.members.length > 0 ? (
            <MemberTable>
              <thead>
                <TableRow>
                  <TableHeader>#</TableHeader>
                  <TableHeader>First Name</TableHeader>
                  <TableHeader>Last Name</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {team.members.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {typeof member !== "string" ? member.firstName : "-"}
                    </TableCell>
                    <TableCell>
                      {typeof member !== "string" ? member.lastName : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </MemberTable>
          ) : (
            <p style={{ color: "#a8a8a8" }}>No members added yet.</p>
          )}

          {/* Edit and Delete Buttons */}
          <ButtonContainer>
            <Button onClick={() => handleEdit(team)}>
              <FaEdit style={{ marginRight: "8px" }} />
              Edit Team
            </Button>
            <Button
              onClick={() => handleDelete(team._id!)}
              style={{
                backgroundColor: "#d9534f",
              }}
            >
              <FaTrash style={{ marginRight: "8px" }} />
              Delete Team
            </Button>
          </ButtonContainer>
        </div>
      ) : (
        // Create Team Button if no team exists
        <Button onClick={handleCreate}>
          <FaPlus style={{ marginRight: "8px" }} />
          Create Team
        </Button>
      )}
    </FormWrapper>
  );
};
