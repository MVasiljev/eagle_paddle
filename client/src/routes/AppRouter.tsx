import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Home from "../pages/Home/Home";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import CoachDashboard from "../pages/Dashboard/CoachDashboard/CoachDashboard";
import CompetitorDashboard from "../pages/Dashboard/CompetitorDashboard/CompetitorDashboard";
import Header from "../components/Header/Header";
import AdminRequestForApproval from "../pages/Dashboard/AdminDashboard/pages/AdminRequestForApproval/AdminRequestForApproval";
import AssignCompetitorsToTraining from "../pages/Dashboard/shared/TrainingPlanPage/AssignCompetitorsToTraining";
import TrainingPlan from "../pages/Dashboard/shared/TrainingPlanPage/TrainingPlan";
import CompetitorsPage from "../pages/Dashboard/shared/CompetitorsPage/CompetitorsPage";
import CoachesPage from "../pages/Dashboard/shared/CoachesPage/CoachesPage";
import AdminProfile from "../pages/Dashboard/AdminDashboard/pages/AdminProfile/AdminProfile";
import CompetitorProfile from "../pages/Dashboard/shared/CompetitorProfilePage/CompetitorProfile";

const AppRouter: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Role-based redirection */}
        {token && user && (
          <>
            {user.role.name === "admin" && (
              <>
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route
                  path="/dashboard/admin/requests"
                  element={<AdminRequestForApproval />}
                />
                <Route
                  path="/dashboard/admin/assign-training"
                  element={<AssignCompetitorsToTraining role={"admin"} />}
                />
                <Route
                  path="/dashboard/admin/training-plan"
                  element={<TrainingPlan />}
                />
                <Route
                  path="/dashboard/admin/competitors"
                  element={<CompetitorsPage />}
                />
                <Route
                  path="/dashboard/admin/coaches"
                  element={<CoachesPage />}
                />
                <Route
                  path="/dashboard/admin/profile"
                  element={<AdminProfile />}
                />
                <Route
                  path="/dashboard/competitor/:userId"
                  element={<CompetitorProfile />}
                />
                ;
              </>
            )}
            {user.role.name === "coach" && (
              <>
                <Route path="/dashboard/coach" element={<CoachDashboard />} />
                <Route
                  path="/dashboard/coach/training-plan"
                  element={<TrainingPlan />}
                />
                <Route
                  path="/dashboard/coach/assign-training"
                  element={<AssignCompetitorsToTraining role={"coach"} />}
                />
                <Route
                  path="/dashboard/coach/competitors"
                  element={<CompetitorsPage />}
                />
                <Route
                  path="/dashboard/coach/coaches"
                  element={<CoachesPage />}
                />
              </>
            )}
            {user.role.name === "competitor" && (
              <>
                <Route
                  path="/dashboard/competitor"
                  element={<CompetitorDashboard />}
                />
                <Route
                  path="/dashboard/competitor/:userId"
                  element={<CompetitorProfile />}
                />
              </>
            )}

            {/* Redirect to appropriate dashboard if authenticated */}
            <Route
              path="*"
              element={<Navigate to={`/dashboard/${user.role.name}`} replace />}
            />
          </>
        )}

        {/* Default fallback for unauthenticated users */}
        {!token && <Route path="*" element={<Navigate to="/" replace />} />}
      </Routes>
    </Router>
  );
};

export default AppRouter;
