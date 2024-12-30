import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchTrainingTypes,
  createTrainingType,
  updateTrainingType,
  deleteTrainingType,
} from "../redux/slices/trainingTypeSlice";
import { TrainingType } from "../types/types";

export const useTrainingTypes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { types, isLoading, error } = useSelector(
    (state: RootState) => state.trainingTypes
  );

  useEffect(() => {
    if (!types.length) {
      dispatch(fetchTrainingTypes());
    }
  }, [dispatch, types.length]);

  const getTrainingTypes = async () => {
    try {
      await dispatch(fetchTrainingTypes()).unwrap();
    } catch (err) {
      console.error("Failed to fetch training types:", err);
    }
  };

  const addTrainingType = async (
    trainingType: Omit<TrainingType, "_id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await dispatch(createTrainingType(trainingType)).unwrap();
    } catch (err) {
      console.error("Failed to create training type:", err);
    }
  };

  const editTrainingType = async (
    id: string,
    updates: Partial<TrainingType>
  ) => {
    try {
      await dispatch(updateTrainingType({ id, updates })).unwrap();
    } catch (err) {
      console.error("Failed to update training type:", err);
    }
  };

  const removeTrainingType = async (id: string) => {
    try {
      await dispatch(deleteTrainingType(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete training type:", err);
    }
  };

  return {
    types,
    isLoading,
    error,
    getTrainingTypes,
    addTrainingType,
    editTrainingType,
    removeTrainingType,
  };
};
