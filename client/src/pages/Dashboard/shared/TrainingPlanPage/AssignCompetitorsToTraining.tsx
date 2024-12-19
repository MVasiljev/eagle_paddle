import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTrainingPlans } from "../../../../redux/slices/trainingPlanSlice";
import { assignPlanToCompetitors } from "../../../../redux/slices/trainingSessionSlice";
import { fetchApprovedUsers } from "../../../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useRoles } from "../../../../hooks/useRoles";
import { TrainingPlan } from "../../../../types/types";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";
import { useAuth } from "../../../../hooks/useAuth"; // Import useAuth for current user
import "./AssignCompetitorsToTraining.css";
import { fetchTeams } from "../../../../redux/slices/teamSlice";

interface Props {
  role: "admin" | "coach";
}

const AssignCompetitorsToTraining: React.FC<Props> = ({ role }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current logged-in user

  const { roles } = useRoles();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [selectedPlanDetails, setSelectedPlanDetails] =
    useState<TrainingPlan | null>(null);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchTrainingPlans());
  }, [dispatch]);

  // Selectors
  const users = useSelector((state: RootState) => state.user.users || []);
  const usersLoading = useSelector((state: RootState) => state.user.isLoading);
  const trainingPlans = useSelector(
    (state: RootState) => state.trainingPlan.plans || []
  );
  const plansLoading = useSelector(
    (state: RootState) => state.trainingPlan.loading
  );

  const handleAssignPlan = async () => {
    const schema = Yup.object().shape({
      selectedPlan: Yup.string().required("Please select a training plan."),
      date: Yup.string().required("Please select a date."),
      selectedCompetitors: Yup.array()
        .min(1, "Please select at least one competitor.")
        .required(),
      selectedCoach:
        role === "admin"
          ? Yup.string().required("Please select a coach.")
          : Yup.mixed().nullable(), // Skip validation for coach if role is "coach"
    });

    const formData = {
      selectedPlan,
      date,
      selectedCompetitors,
      selectedCoach,
    };

    try {
      await schema.validate(formData, { abortEarly: false });

      const payload = {
        planId: selectedPlan,
        competitorIds: selectedCompetitors,
        coachId: role === "admin" ? selectedCoach : user?._id, // If coach, use current user's ID
        date,
        iteration: 1, // Default iteration value
      };

      console.log("Payload being sent:", payload);

      await dispatch(assignPlanToCompetitors(payload)).unwrap();
      alert("Training plan assigned successfully!");
      navigate("/"); // Navigate to home
    } catch (error: unknown) {
      if (error.inner) {
        error.inner.forEach((err: Yup.ValidationError) =>
          console.error(err.message)
        );
        alert("Validation failed. Please check your inputs.");
      } else {
        console.error("Error assigning plan:", error);
        alert("Failed to assign the training plan.");
      }
    }
  };

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    const planDetails = trainingPlans.find((plan) => plan._id === planId);
    setSelectedPlanDetails(planDetails || null);
  };

  const handleAddCompetitor = (id: string) => {
    if (!selectedCompetitors.includes(id)) {
      setSelectedCompetitors((prev) => [...prev, id]);
    }
  };

  const handleRemoveCompetitor = (id: string) => {
    setSelectedCompetitors((prev) => prev.filter((compId) => compId !== id));
  };

  const handleAddCoach = (id: string) => {
    setSelectedCoach(id);
  };

  const handleRemoveCoach = () => {
    setSelectedCoach(null);
  };

  // Filter competitors and coaches
  const competitors = users.filter((user) => {
    const role = roles.find((role) => role._id === user.role?._id);
    return role?.name === "competitor";
  });

  // Filter coaches but exclude self if the user is a coach
  const coaches = users.filter((coach) => {
    const role = roles.find((role) => role._id === coach.role?._id);
    return (
      role?.name === "coach" &&
      (user?.role.name !== "coach" || user._id !== coach._id)
    );
  });

  return (
    <div className="assign-container">
      <h2>Assign Training Plan to Competitors</h2>

      {/* Plan Selection */}
      <div className="form-group">
        <label>Training Plan:</label>
        <select
          value={selectedPlan}
          onChange={(e) => handlePlanSelection(e.target.value)}
        >
          <option value="">-- Select a Training Plan --</option>
          {plansLoading ? (
            <option disabled>Loading plans...</option>
          ) : trainingPlans.length > 0 ? (
            trainingPlans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name}
              </option>
            ))
          ) : (
            <option disabled>No plans available</option>
          )}
        </select>
      </div>

      {/* Plan Summary */}
      {selectedPlanDetails && (
        <div className="plan-summary">
          <h4>Selected Plan Summary:</h4>
          <pre>{JSON.stringify(selectedPlanDetails, null, 2)}</pre>
        </div>
      )}

      {/* Date Input */}
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Competitors Selection */}
      <div className="competitors-container">
        <div className="competitors-list">
          <h4>Available Competitors:</h4>
          {usersLoading ? (
            <p>Loading competitors...</p>
          ) : competitors.length > 0 ? (
            competitors
              .filter((comp) => !selectedCompetitors.includes(comp._id))
              .map((competitor) => (
                <div key={competitor._id} className="competitor-item">
                  <button
                    onClick={() => handleAddCompetitor(competitor._id)}
                    className="add-button"
                  >
                    <AiOutlinePlus size={16} />
                  </button>
                  <span>{`${competitor.firstName} ${competitor.lastName}`}</span>
                </div>
              ))
          ) : (
            <p>No competitors available</p>
          )}
        </div>

        <div className="selected-competitors-list">
          <h4>Selected Competitors:</h4>
          {selectedCompetitors.map((id) => {
            const competitor = users.find((user) => user._id === id);
            return (
              <div key={id} className="competitor-item">
                <button
                  onClick={() => handleRemoveCompetitor(id)}
                  className="remove-button"
                >
                  -
                </button>
                <span>
                  {competitor
                    ? `${competitor.firstName} ${competitor.lastName}`
                    : "Unknown Competitor"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coaches Selection (only for admin) */}
      {role === "admin" && (
        <div className="coaches-container">
          <div className="coaches-list">
            <h4>Available Coaches:</h4>
            {usersLoading ? (
              <p>Loading coaches...</p>
            ) : coaches.length > 0 ? (
              coaches.map((coach) => (
                <div key={coach._id} className="competitor-item">
                  <button
                    onClick={() => handleAddCoach(coach._id)}
                    className="add-button"
                    disabled={!!selectedCoach}
                  >
                    <AiOutlinePlus size={16} />
                  </button>
                  <span>{`${coach.firstName} ${coach.lastName}`}</span>
                </div>
              ))
            ) : (
              <p>No coaches available</p>
            )}
          </div>

          <div className="selected-coach-list">
            <h4>Selected Coach:</h4>
            {selectedCoach ? (
              <div className="competitor-item">
                <button onClick={handleRemoveCoach} className="remove-button">
                  -
                </button>
                <span>
                  {users.find((user) => user._id === selectedCoach)
                    ?.firstName ?? "Unknown Coach"}
                </span>
              </div>
            ) : (
              <p>No coach selected</p>
            )}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="form-actions">
        <button onClick={handleAssignPlan} className="btn-assign">
          Assign Plan
        </button>
        <button onClick={() => navigate("/")} className="btn-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignCompetitorsToTraining;
