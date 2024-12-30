import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchBoats,
  createBoat,
  updateBoat,
  deleteBoat,
} from "../redux/slices/boatSlice";
import { Boat } from "../types/types";

export const useBoats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boats, isLoading, error, edit } = useSelector(
    (state: RootState) => state.boats
  );

  useEffect(() => {
    if (!boats.length) {
      dispatch(fetchBoats());
    }
  }, [dispatch, boats.length]);

  const getBoats = async () => {
    try {
      await dispatch(fetchBoats()).unwrap();
    } catch (err) {
      console.error("Failed to fetch boats:", err);
    }
  };

  const addBoat = async (boat: Omit<Boat, "_id">) => {
    try {
      await dispatch(createBoat(boat)).unwrap();
    } catch (err) {
      console.error("Failed to create boat:", err);
    }
  };

  const editBoat = async (id: string, updates: Partial<Boat>) => {
    try {
      await dispatch(updateBoat({ id, updates })).unwrap();
    } catch (err) {
      console.error("Failed to update boat:", err);
    }
  };

  const removeBoat = async (id: string) => {
    try {
      await dispatch(deleteBoat(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete boat:", err);
    }
  };

  return {
    boats,
    isLoading,
    error,
    edit,
    getBoats,
    addBoat,
    editBoat,
    removeBoat,
  };
};
