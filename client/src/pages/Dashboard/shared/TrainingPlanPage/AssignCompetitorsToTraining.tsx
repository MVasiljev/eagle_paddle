import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTrainingPlans } from "../../../../redux/slices/trainingPlanSlice";
import {
  assignPlanToCompetitors,
  fetchTrainingSessions,
} from "../../../../redux/slices/trainingSessionSlice";
import { fetchApprovedUsers } from "../../../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useRoles } from "../../../../hooks/useRoles";
import { TrainingPlan, User } from "../../../../types/types";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";
import { useAuth } from "../../../../hooks/useAuth";
import {
  Container,
  FormGroup,
  Select,
  Input,
  PlanSummary,
  CompetitorsContainer,
  CompetitorItem,
  Button,
  FormActions,
  ListContainer,
  ListTitle,
  AddButton,
} from "./AssignCompetitorsToTraining.styles";
import CustomToast from "../../../../components/CustomToast/CustomToast";
import { useTeams } from "../../../../hooks/useTeams";
import { setView } from "../../../../redux/slices/viewSlice";
import { Views } from "../../../../constants/views";

interface Props {
  role: "admin" | "coach";
}

const AssignCompetitorsToTraining: React.FC<Props> = ({ role }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchAllTeams, teams } = useTeams();
  const { roles } = useRoles();

  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [selectedPlanDetails, setSelectedPlanDetails] =
    useState<TrainingPlan | null>(null);

  useEffect(() => {
    if (!teams.length) {
      fetchAllTeams();
    }
  }, [fetchAllTeams, teams.length]);

  useEffect(() => {
    dispatch(fetchApprovedUsers());
    dispatch(fetchTrainingPlans());
  }, [dispatch]);

  const users = useSelector((state: RootState) => state.user.users || []);
  const usersLoading = useSelector((state: RootState) => state.user.isLoading);
  const trainingPlans = useSelector(
    (state: RootState) => state.trainingPlan.plans || []
  );
  const plansLoading = useSelector(
    (state: RootState) => state.trainingPlan.loading
  );

  const competitors = users.filter((user) => {
    const role = roles.find((role) => role._id === user.role?._id);
    return role?.name === "competitor";
  });

  const team = teams.find((t) => {
    const coach = t.coach as { _id?: string } | null; // Handle null or missing coach
    return coach && coach._id === user?._id;
  }) ?? { members: competitors }; // Fallback to competitors if no team

  const handleAssignPlan = async () => {
    const schema = Yup.object().shape({
      selectedPlan: Yup.string().required(
        "Molimo vas da izaberete plan treninga."
      ),
      date: Yup.string().required("Molimo vas da izaberete datum."),
      selectedCompetitors: Yup.array()
        .min(1, "Molimo vas da izaberete barem jednog takmičara.")
        .required(),
      selectedCoach:
        role === "admin"
          ? Yup.string().required("Molimo vas da izaberete trenera.")
          : Yup.mixed().nullable(),
    });

    const formData = { selectedPlan, date, selectedCompetitors, selectedCoach };

    try {
      await schema.validate(formData, { abortEarly: false });

      const payload = {
        planId: selectedPlan,
        competitorIds: selectedCompetitors,
        coachId: role === "admin" ? selectedCoach : user?._id,
        date,
        iteration: 1,
      };

      await dispatch(assignPlanToCompetitors(payload)).unwrap();
      <CustomToast
        text="Plan treninga je uspešno dodeljen"
        heading={"Dodavanje plana"}
        buttonName={""}
        onButtonClick={function (): void {
          throw new Error("Funkcija nije implementirana.");
        }}
      />;
      dispatch(fetchTrainingSessions());
      dispatch(setView(Views.CALENDAR));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert("Validacija nije uspela. Proverite unose.");
      } else {
        console.error("Došlo je do neočekivane greške:", error);
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

  // const competitors = users.filter((user) => {
  //   const role = roles.find((role) => role._id === user.role?._id);
  //   return role?.name === "competitor";
  // });

  const coaches = users.filter((coach) => {
    const role = roles.find((role) => role._id === coach.role?._id);
    return (
      role?.name === "coach" &&
      (user?.role.name !== "coach" || user._id !== coach._id)
    );
  });

  return (
    <Container>
      <FormGroup>
        <label>Plan treninga:</label>
        <Select
          value={selectedPlan}
          onChange={(e) => handlePlanSelection(e.target.value)}
        >
          <option value="">-- Izaberite plan treninga --</option>
          {plansLoading ? (
            <option disabled>Učitavanje planova...</option>
          ) : (
            trainingPlans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name}
              </option>
            ))
          )}
        </Select>
      </FormGroup>

      {selectedPlanDetails && (
        <PlanSummary>
          <h4>Izabrani plan - Pregled:</h4>
          <div>
            <p>
              <strong>Naziv Plana:</strong> {selectedPlanDetails.name || "N/A"}
            </p>

            <h3>Vežbe u Planu:</h3>
            {selectedPlanDetails.exercises &&
            selectedPlanDetails.exercises.length > 0 ? (
              selectedPlanDetails.exercises.map((exercise, idx) => (
                <div
                  key={idx}
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    backgroundColor: "#2a2a2e",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                    color: "white",
                  }}
                >
                  <p>
                    <strong>Ime:</strong> {exercise.name || "N/A"}
                  </p>
                  <p>
                    <strong>Tip:</strong> {exercise.type || "N/A"}
                  </p>
                  <p>
                    <strong>Kategorija:</strong> {exercise.category || "N/A"}
                  </p>
                  <p>
                    <strong>Varijanta:</strong> {exercise.variant || "N/A"}
                  </p>
                  <p>
                    <strong>Serije:</strong> {exercise.series || "N/A"}
                  </p>
                  <p>
                    <strong>Ponavljanja:</strong>{" "}
                    {exercise.repetitions || "N/A"}
                  </p>
                  <p>
                    <strong>Odmor između serija:</strong>{" "}
                    {exercise.restBetweenSeries || 0} s
                  </p>
                  <p>
                    <strong>Odmor između ponavljanja:</strong>{" "}
                    {exercise.restBetweenRepetitions || 0} s
                  </p>

                  <h4>Trajanja:</h4>
                  {exercise.durations && exercise.durations.length > 0 ? (
                    exercise.durations.map((duration, dIdx) => (
                      <p key={dIdx}>
                        {duration.duration} {duration.unit}
                      </p>
                    ))
                  ) : (
                    <p>Nema trajanja.</p>
                  )}

                  <h4>Intenziteti:</h4>
                  {exercise.intensities && exercise.intensities.length > 0 ? (
                    exercise.intensities.map((intensity, iIdx) => (
                      <p key={iIdx}>
                        <strong>Vrednost:</strong> {intensity.value || "N/A"},{" "}
                        <strong>Trajanje:</strong> {intensity.duration || "N/A"}{" "}
                        {exercise.unit || "N/A"}{" "}
                        {intensity.technique && (
                          <span>
                            (<strong>Tehnika:</strong> {intensity.technique})
                          </span>
                        )}
                      </p>
                    ))
                  ) : (
                    <p>Nema intenziteta.</p>
                  )}
                </div>
              ))
            ) : (
              <p>Nema vežbi u planu.</p>
            )}
          </div>
        </PlanSummary>
      )}

      <FormGroup>
        <label>Datum:</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormGroup>

      <CompetitorsContainer>
        <ListContainer>
          <ListTitle>Dostupni takmičari:</ListTitle>
          {usersLoading ? (
            <p>Učitavanje takmičara...</p>
          ) : (
            (team?.members ?? competitors)
              .filter((comp): comp is User => typeof comp !== "string")
              .filter(
                (competitor) =>
                  !selectedCompetitors.includes((competitor as User)._id)
              )
              .map((competitor) => (
                <CompetitorItem key={(competitor as User)._id}>
                  <AddButton
                    onClick={() =>
                      handleAddCompetitor((competitor as User)._id)
                    }
                  >
                    <AiOutlinePlus />
                  </AddButton>
                  <span>{`${(competitor as User).firstName} ${
                    (competitor as User).lastName
                  }`}</span>
                </CompetitorItem>
              ))
          )}
        </ListContainer>

        <ListContainer>
          <ListTitle>Izabrani takmičari:</ListTitle>
          {selectedCompetitors.map((id) => (
            <CompetitorItem key={id}>
              <AddButton onClick={() => handleRemoveCompetitor(id)}>
                -
              </AddButton>
              <span>{users.find((user) => user._id === id)?.firstName}</span>
            </CompetitorItem>
          ))}
        </ListContainer>
      </CompetitorsContainer>

      {role === "admin" && (
        <CompetitorsContainer>
          <ListContainer>
            <ListTitle>Dostupni treneri:</ListTitle>
            {coaches.map((coach) => (
              <CompetitorItem key={coach._id}>
                <AddButton
                  onClick={() => handleAddCoach(coach._id)}
                  disabled={!!selectedCoach}
                >
                  <AiOutlinePlus />
                </AddButton>
                <span>{`${coach.firstName} ${coach.lastName}`}</span>
              </CompetitorItem>
            ))}
          </ListContainer>

          <ListContainer>
            <ListTitle>Izabrani trener:</ListTitle>
            {selectedCoach && (
              <CompetitorItem>
                <AddButton onClick={handleRemoveCoach}>-</AddButton>
                <span>
                  {users.find((user) => user._id === selectedCoach)?.firstName}
                </span>
              </CompetitorItem>
            )}
          </ListContainer>
        </CompetitorsContainer>
      )}

      <FormActions>
        <Button onClick={handleAssignPlan}>Dodeli plan</Button>
        <Button style={{ marginLeft: "1rem" }} onClick={() => navigate("/")}>
          Otkaži
        </Button>
      </FormActions>
    </Container>
  );
};

export default AssignCompetitorsToTraining;
