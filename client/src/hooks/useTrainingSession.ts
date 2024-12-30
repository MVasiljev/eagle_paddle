import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchTrainingSessions,
  createTrainingSession,
  updateTrainingSession,
  deleteTrainingSession,
  assignPlanToCompetitors,
  updateTrainingSessionResults,
  fetchMyTrainingSessions,
} from "../redux/slices/trainingSessionSlice";
import { TrainingSession } from "../types/types";

export const useTrainingSessions = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors to access Redux state
  const {
    list: sessions,
    status,
    error,
  } = useSelector((state: RootState) => state.trainingSession);

  // Automatic fetching on instantiation
  useEffect(() => {
    if (sessions.length === 0) {
      dispatch(fetchTrainingSessions());
    }
  }, [dispatch, sessions.length]);

  // Fetch all training sessions
  const getAllSessions = async () => {
    try {
      await dispatch(fetchTrainingSessions()).unwrap();
    } catch (err) {
      console.error("Error fetching training sessions:", err);
    }
  };

  // Create a new training session
  const addNewSession = async (session: TrainingSession) => {
    try {
      await dispatch(createTrainingSession(session)).unwrap();
    } catch (err) {
      console.error("Error creating training session:", err);
    }
  };

  // Update an existing training session
  const updateSession = async (
    id: string,
    updates: Partial<TrainingSession>
  ) => {
    try {
      await dispatch(updateTrainingSession({ id, updates })).unwrap();
    } catch (err) {
      console.error(`Error updating session with ID ${id}:`, err);
    }
  };

  // Delete a training session
  const removeSession = async (id: string) => {
    try {
      await dispatch(deleteTrainingSession(id)).unwrap();
    } catch (err) {
      console.error(`Error deleting session with ID ${id}:`, err);
    }
  };

  // Assign a plan to multiple competitors
  const assignPlan = async (data: {
    planId: string;
    competitorIds: string[];
    date: string;
    iteration: number;
  }) => {
    try {
      const result = await dispatch(assignPlanToCompetitors(data)).unwrap();
      console.log("Assigned Plan Response:", result);
      return result;
    } catch (err) {
      console.error("Error assigning plan to competitors:", err);
    }
  };

  // Update session results
  const updateResults = async (
    id: string,
    results: Record<string, unknown>
  ) => {
    try {
      await dispatch(updateTrainingSessionResults({ id, results })).unwrap();
    } catch (err) {
      console.error(`Error updating results for session ID ${id}:`, err);
    }
  };

  const getMySessions = async () => {
    try {
      await dispatch(fetchMyTrainingSessions()).unwrap();
    } catch (err) {
      console.error("Error fetching my training sessions:", err);
    }
  };

  return {
    sessions,
    status,
    error,
    getAllSessions,
    addNewSession,
    updateSession,
    removeSession,
    assignPlan,
    updateResults,
    getMySessions,
  };
};
