import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchApprovedUsers,
  fetchUnapprovedUsers,
  fetchCurrentUser,
  fetchUserById,
  updateUserDetails,
  approveUser,
  deleteUser,
  resetUser,
} from "../redux/slices/userSlice";
import { UpdateUserData } from "../types/types";

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    users,
    unapprovedUsers,
    user, // singular user
    isLoading,
    error,
  } = useSelector((state: RootState) => state.user);

  // Automatic fetching on instantiation
  useEffect(() => {
    if (!users.length) {
      dispatch(fetchApprovedUsers());
    }
    if (!unapprovedUsers.length) {
      dispatch(fetchUnapprovedUsers());
    }
  }, [dispatch, users.length, unapprovedUsers.length]);

  const getApprovedUsers = async () => {
    try {
      await dispatch(fetchApprovedUsers()).unwrap();
    } catch (err) {
      console.error("Failed to fetch approved competitors:", err);
    }
  };

  const getCurrentUser = async () => {
    try {
      await dispatch(fetchCurrentUser()).unwrap();
    } catch (err) {
      console.error("Failed to fetch current user:", err);
    }
  };

  const getUserById = async (id: string) => {
    try {
      await dispatch(fetchUserById(id)).unwrap();
    } catch (err) {
      console.error("Failed to fetch user by ID:", err);
    }
  };

  const updateUser = async (id: string, updates: UpdateUserData) => {
    try {
      await dispatch(updateUserDetails({ id, updates })).unwrap();
    } catch (err) {
      console.error("Failed to update user details:", err);
    }
  };

  const approveUserById = async (
    id: string,
    approved: boolean,
    roleId: string
  ) => {
    try {
      await dispatch(approveUser({ id, approved, roleId })).unwrap();
    } catch (err) {
      console.error("Failed to approve user:", err);
    }
  };

  const deleteUserById = async (id: string) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const resetUserState = () => {
    dispatch(resetUser());
  };

  return {
    users,
    unapprovedUsers,
    user,
    isLoading,
    error,
    getCurrentUser,
    getApprovedUsers,
    getUserById,
    updateUser,
    approveUserById,
    deleteUserById,
    resetUserState,
  };
};
