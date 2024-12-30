import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchDisciplines,
  createDiscipline,
  deleteDiscipline,
  updateDiscipline,
  setEditDiscipline,
} from "../redux/slices/disciplineSlice";
import { Discipline } from "../types/types";

export const useDisciplines = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { disciplines, edit, isLoading, error } = useSelector(
    (state: RootState) => state.disciplines
  );

  useEffect(() => {
    dispatch(fetchDisciplines());
  }, [dispatch]);

  const getDisciplines = () => {
    dispatch(fetchDisciplines());
  };

  const addDiscipline = async (discipline: {
    distance: number;
    unit: "m" | "km";
  }) => {
    try {
      await dispatch(createDiscipline(discipline)).unwrap();
    } catch (error) {
      console.error("Failed to create discipline", error);
    }
  };

  const editDiscipline = async (id: string, updates: Partial<Discipline>) => {
    try {
      await dispatch(updateDiscipline({ id, updates })).unwrap();
    } catch (error) {
      console.error("Failed to update discipline", error);
    }
  };

  const setEditingDiscipline = (discipline: Discipline) => {
    dispatch(setEditDiscipline(discipline));
  };

  const removeDiscipline = async (id: string) => {
    try {
      await dispatch(deleteDiscipline(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete discipline", error);
    }
  };

  return {
    disciplines,
    edit,
    isLoading,
    error,
    getDisciplines,
    addDiscipline,
    editDiscipline,
    setEditingDiscipline,
    removeDiscipline,
  };
};
