import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeams,
  createTeam,
  deleteTeam,
  resetTeams,
} from "../redux/slices/teamSlice";
import { AppDispatch, RootState } from "../redux/store";

export const useTeams = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { teams, isLoading, error } = useSelector(
    (state: RootState) => state.teams
  );

  const fetchAllTeams = () => {
    dispatch(fetchTeams());
  };

  const addNewTeam = (teamData: Parameters<typeof createTeam>[0]) => {
    dispatch(createTeam(teamData));
  };

  const removeTeam = (teamId: string) => {
    dispatch(deleteTeam(teamId));
  };

  const resetTeamState = () => {
    dispatch(resetTeams());
  };

  return {
    teams,
    isLoading,
    error,
    fetchAllTeams,
    addNewTeam,
    removeTeam,
    resetTeamState,
  };
};
