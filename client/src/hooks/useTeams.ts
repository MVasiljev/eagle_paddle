import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeams,
  createTeam,
  deleteTeam,
  resetTeams,
  updateTeam,
} from "../redux/slices/teamSlice";
import { AppDispatch, RootState } from "../redux/store";
import { ITeam } from "../types/types"; // Assuming ITeam is in types
import { useEffect } from "react";

export const useTeams = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { teams, edit, isLoading, error } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    if (!teams.length) {
      dispatch(fetchTeams());
    }
  }, [dispatch, teams.length]);

  const fetchAllTeams = () => {
    dispatch(fetchTeams());
  };

  const addNewTeam = (teamData: Parameters<typeof createTeam>[0]) => {
    console.log("Team Data: ", teamData);
    dispatch(createTeam(teamData));
  };

  const updateExistingTeam = (teamData: ITeam) => {
    dispatch(updateTeam(teamData));
  };

  const removeTeam = (teamId: string) => {
    dispatch(deleteTeam(teamId));
  };

  const resetTeamState = () => {
    dispatch(resetTeams());
  };

  return {
    teams,
    edit,
    isLoading,
    error,
    fetchAllTeams,
    addNewTeam,
    updateExistingTeam,
    removeTeam,
    resetTeamState,
  };
};
