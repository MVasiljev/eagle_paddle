import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchTrainingPlans,
  fetchTrainingPlanById,
  saveTrainingPlan,
  updateTrainingPlan,
  deleteTrainingPlan,
} from "../redux/slices/trainingPlanSlice";
import { TrainingPlan } from "../types/types";

export const useTrainingPlans = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors to access Redux state
  const { plans, loading, error } = useSelector(
    (state: RootState) => state.trainingPlan
  );

  // Fetch all plans
  const getAllPlans = async () => {
    try {
      await dispatch(fetchTrainingPlans()).unwrap();
    } catch (err) {
      console.error("Error fetching training plans:", err);
    }
  };

  // Fetch a plan by ID
  const getPlanById = async (id: string) => {
    try {
      await dispatch(fetchTrainingPlanById(id)).unwrap();
    } catch (err) {
      console.error(`Error fetching plan with ID ${id}:`, err);
    }
  };

  // Save a new training plan
  const addNewPlan = async (plan: TrainingPlan) => {
    try {
      await dispatch(saveTrainingPlan(plan)).unwrap();
    } catch (err) {
      console.error("Error saving training plan:", err);
    }
  };

  // Update an existing plan
  const updatePlan = async (id: string, updates: Partial<TrainingPlan>) => {
    try {
      await dispatch(updateTrainingPlan({ id, updates })).unwrap();
    } catch (err) {
      console.error(`Error updating plan with ID ${id}:`, err);
    }
  };

  // Delete a plan
  const removePlan = async (id: string) => {
    try {
      await dispatch(deleteTrainingPlan(id)).unwrap();
    } catch (err) {
      console.error(`Error deleting plan with ID ${id}:`, err);
    }
  };

  return {
    plans,
    loading,
    error,
    getAllPlans,
    getPlanById,
    addNewPlan,
    updatePlan,
    removePlan,
  };
};
