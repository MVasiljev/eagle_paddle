import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { RegisterUserData } from "../types/types";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (error) {
      console.error("Login failed:", error); // Error already handled in Redux
    }
  };

  const register = async (userData: RegisterUserData) => {
    try {
      await dispatch(registerUser(userData)).unwrap();
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error };
    }
  };

  const performLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isLoading,
    error, // Expose action-specific error
    login,
    register,
    logout: performLogout,
  };
};
