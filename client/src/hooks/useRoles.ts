import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchRoles, resetRoles } from "../redux/slices/roleSlice";

export const useRoles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { roles, isLoading, error } = useSelector(
    (state: RootState) => state.role
  );

  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [roles.length, dispatch]);

  const reset = () => {
    dispatch(resetRoles());
  };

  return {
    roles,
    isLoading,
    error,
    reset,
  };
};
