import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchClubs,
  createClub,
  updateClub,
  deleteClub,
} from "../redux/slices/clubSlice";
import { IClub } from "../types/types";

export const useClubs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clubs, isLoading, error } = useSelector(
    (state: RootState) => state.clubs
  );

  useEffect(() => {
    if (!clubs.length) {
      dispatch(fetchClubs());
    }
  }, [dispatch, clubs.length]);

  const getClubs = async () => {
    try {
      await dispatch(fetchClubs()).unwrap();
    } catch (err) {
      console.error("Failed to fetch clubs:", err);
    }
  };

  const addClub = async (club: Partial<IClub>) => {
    if (club.name && club.location) {
      await dispatch(
        createClub(club as Omit<IClub, "_id" | "createdAt" | "updatedAt">)
      ).unwrap();
    } else {
      console.error("Club name and location are required.");
    }
  };

  const editClub = async (id: string, club: Partial<IClub>) => {
    try {
      await dispatch(updateClub({ id, updates: club })).unwrap();
    } catch (err) {
      console.error("Failed to update club:", err);
    }
  };

  const removeClub = async (id: string) => {
    try {
      await dispatch(deleteClub(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete club:", err);
    }
  };

  return {
    clubs,
    isLoading,
    error,
    getClubs,
    addClub,
    editClub,
    removeClub,
  };
};
