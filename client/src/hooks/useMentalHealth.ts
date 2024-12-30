import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchMentalHealthEntries,
  fetchMyMentalHealthEntries,
  createMentalHealthEntry,
  updateMentalHealthEntry,
  setEditMentalHealth,
  clearEditMentalHealth,
  deleteMentalHealthEntry,
} from "../redux/slices/mentalHealthSlice";
import { MentalHealthEntry } from "../types/types";

export const useMentalHealth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entries, myEntries, isLoading, error, edit } = useSelector(
    (state: RootState) => state.mentalHealth
  );

  useEffect(() => {
    dispatch(fetchMentalHealthEntries());
    dispatch(fetchMyMentalHealthEntries());
  }, [dispatch]);

  const getMentalHealthEntries = async () => {
    await dispatch(fetchMentalHealthEntries());
  };

  const getMyMentalHealthEntries = async () => {
    await dispatch(fetchMyMentalHealthEntries());
  };

  const addMentalHealthEntry = async (entry: Partial<MentalHealthEntry>) => {
    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Check if an entry for today already exists
    const existingEntry = myEntries.find(
      (item) => item.date?.split("T")[0] === today
    );

    // If entry exists, update instead of creating a new one
    if (existingEntry) {
      await dispatch(
        updateMentalHealthEntry({
          id: existingEntry._id,
          updates: entry,
        })
      );
    } else {
      await dispatch(createMentalHealthEntry(entry));
    }
  };

  const editMentalHealthEntry = async (
    id: string,
    updates: Partial<MentalHealthEntry>
  ) => {
    await dispatch(updateMentalHealthEntry({ id, updates }));
  };

  const startEditing = (entry: MentalHealthEntry) => {
    dispatch(setEditMentalHealth(entry));
  };

  const cancelEditing = () => {
    dispatch(clearEditMentalHealth());
  };

  const removeMentalHealthEntry = async (id: string) => {
    await dispatch(deleteMentalHealthEntry(id));
  };

  return {
    entries,
    myEntries,
    isLoading,
    error,
    edit,
    getMentalHealthEntries,
    getMyMentalHealthEntries,
    addMentalHealthEntry,
    editMentalHealthEntry,
    startEditing,
    cancelEditing,
    removeMentalHealthEntry,
  };
};
