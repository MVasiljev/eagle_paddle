import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  role: string; // Required role for the route
  component: React.ReactElement; // Component to render
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, component }) => {
  const { token } = useSelector((state: RootState) => state.auth); // Assuming token is in `auth` slice
  const { user } = useSelector((state: RootState) => state.user); // Accessing user from `userSlice`

  // If not logged in, redirect to the homepage
  if (!token) {
    return <Navigate to="/" />;
  }

  // If the user's role doesn't match, redirect to their dashboard
  if (user?.role !== role) {
    return <Navigate to={`/dashboard/${user?.role}`} />;
  }

  // Render the component if the user is authorized
  return component;
};

export default ProtectedRoute;
