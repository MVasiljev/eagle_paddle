import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Calendar from "../../../components/Calendar/Calendar";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { useTrainingSessions } from "../../../hooks/useTrainingSession";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setView } from "../../../redux/slices/viewSlice";
import { Views } from "../../../constants/views";
import {
  DashboardContainer,
  Sidebar,
  SidebarLink,
  MainContent,
  SearchBarWrapper,
  CalendarWrapper,
} from "./AdminDashboard.styles";
import AssignCompetitorsToTraining from "../shared/TrainingPlanPage/AssignCompetitorsToTraining";
import TrainingPlan from "../shared/TrainingPlanPage/TrainingPlan";
import CompetitorsPage from "../shared/CompetitorsPage/CompetitorsPage";
import CompetitorProfile from "../shared/CompetitorProfilePage/CompetitorProfile";
import AdminRequestForApproval from "./pages/AdminRequestForApproval/AdminRequestForApproval";
import CoachesPage from "../shared/CoachesPage/CoachesPage";
import CoachProfile from "../shared/CoachProfilePage/CoachProfile";
import TypeCategoryCreator from "./pages/TypeCategoryCreator/TypeCategoryCreator";
import TrainingTypeList from "./pages/TrainingTypeList/TrainingTypeList";
import ClubList from "./pages/ClubList/ClubList";
import ClubForm from "./pages/ClubForm/ClubForm";
import BoatCreator from "./pages/BoatCreator/BoatCreator";
import BoatList from "./pages/BoatList/BoatList";
import DisciplineList from "./pages/DisciplineList/DisciplineList";
import DisciplineForm from "./pages/DisciplineForm/DisciplineForm";
import MentalHealthList from "./pages/MentalHealthList/MentalHealthList";
// import TrainingReport from "../shared/TrainingReport/TrainingReport";
import TrainingEvent from "../shared/TrainingEvent/TrainingEvent";
import TrainingPlanList from "./pages/TrainingPlanList/TrainingPlanList";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { sessions, status } = useTrainingSessions();
  const view = useSelector((state: RootState) => state.dashboard.view);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedSession, setSelectedSession] = useState<{
    sessions: Array<{
      athlete?: {
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string;
      };
      coach?: {
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string;
      };
      status: string;
      plan?: { name: string };
      date?: string;
    }>;
  } | null>(null);
  // const [selectedUser, setSelectedUser] = useState<any>(null);

  // Transform sessions into FullCalendar-compatible events
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const aggregatedEvents: { [key: string]: EventInput } = {};

      sessions.forEach((session) => {
        const planName = session.plan?.name ?? "Unnamed Plan";
        const date = session.date
          ? new Date(session.date).toISOString().split("T")[0]
          : "Unknown Date";
        const key = `${planName}-${date}`;

        if (aggregatedEvents[key]) {
          aggregatedEvents[key].title = `${planName} (${
            (aggregatedEvents[key].extendedProps?.count ?? 0) + 1
          })`;
          if (aggregatedEvents[key].extendedProps) {
            aggregatedEvents[key].extendedProps.count += 1;
          }
          if (aggregatedEvents[key].extendedProps) {
            aggregatedEvents[key].extendedProps.sessions.push(session);
          }
        } else {
          aggregatedEvents[key] = {
            id: key,
            title: `${planName} (1)`,
            start: session.date || new Date().toISOString(),
            extendedProps: {
              count: 1,
              sessions: [session],
            },
          };
        }
      });

      setEvents(Object.values(aggregatedEvents));
    }
  }, [sessions]);

  const handleEventClick = (eventData: EventClickArg) => {
    const eventProps = eventData.event.extendedProps;
    setSelectedSession({ sessions: eventProps.sessions }); // Save session data
    dispatch(setView(Views.TRAINING_RESULTS)); // Navigate to TrainingEvent
  };

  const handleDateClick = (dateData: DateClickArg) => {
    console.log("Date clicked:", dateData);
  };

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarLink onClick={() => dispatch(setView(Views.TRAINING_LIST))}>
          Lista treninga
        </SidebarLink>
        <SidebarLink onClick={() => dispatch(setView(Views.PLAN))}>
          Kreiraj trening
        </SidebarLink>

        <SidebarLink
          onClick={() => dispatch(setView(Views.TYPE_CATEGORY_CREATE))}
        >
          Kreiraj tip treninga
        </SidebarLink>
        <SidebarLink
          onClick={() => dispatch(setView(Views.TRAINING_TYPE_LIST))}
        >
          Tipovi treninga
        </SidebarLink>

        <SidebarLink onClick={() => dispatch(setView(Views.CLUB_LIST))}>
          Klubovi
        </SidebarLink>
        <SidebarLink onClick={() => dispatch(setView(Views.CLUB_CREATE))}>
          Kreiraj klub
        </SidebarLink>

        <SidebarLink onClick={() => dispatch(setView(Views.BOAT_LIST))}>
          Čamci
        </SidebarLink>
        <SidebarLink onClick={() => dispatch(setView(Views.BOAT_CREATE))}>
          Kreiraj čamac
        </SidebarLink>

        <SidebarLink onClick={() => dispatch(setView(Views.DISCIPLINE_LIST))}>
          Discipline
        </SidebarLink>
        <SidebarLink onClick={() => dispatch(setView(Views.DISCIPLINE_CREATE))}>
          Kreiraj disciplinu
        </SidebarLink>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {view === Views.CALENDAR ? (
          status === "loading" ? (
            <p>Loading sessions...</p>
          ) : (
            <>
              <SearchBarWrapper>
                <SearchBar onSearch={(query) => console.log(query)} />
              </SearchBarWrapper>
              <CalendarWrapper>
                <Calendar
                  onEventClick={handleEventClick}
                  onDateClick={handleDateClick}
                  events={events}
                />
              </CalendarWrapper>
            </>
          )
        ) : view === Views.ASSIGN ? (
          <AssignCompetitorsToTraining role="admin" />
        ) : view === Views.COMPETITORS ? (
          <CompetitorsPage />
        ) : view === Views.COACHES ? (
          <CoachesPage />
        ) : view === Views.PROFILE ? (
          <CompetitorProfile />
        ) : view === Views.COACH_PROFILE ? (
          <CoachProfile />
        ) : view === Views.TYPE_CATEGORY_CREATE ? (
          <TypeCategoryCreator />
        ) : view === Views.TRAINING_TYPE_LIST ? (
          <TrainingTypeList />
        ) : view === Views.CLUB_LIST ? (
          <ClubList />
        ) : view === Views.CLUB_CREATE ? (
          <ClubForm />
        ) : view === Views.BOAT_CREATE ? (
          <BoatCreator />
        ) : view === Views.BOAT_LIST ? (
          <BoatList />
        ) : view === Views.DISCIPLINE_LIST ? (
          <DisciplineList />
        ) : view === Views.DISCIPLINE_CREATE ? (
          <DisciplineForm />
        ) : view === Views.REQUESTS ? (
          <AdminRequestForApproval />
        ) : view === Views.PLAN ? (
          <TrainingPlan />
        ) : view === Views.TRAINING_LIST ? (
          <TrainingPlanList />
        ) : view === Views.TRAINING_RESULTS && selectedSession ? (
          <TrainingEvent
            competitors={selectedSession.sessions.map(
              (s: {
                athlete?: {
                  _id: string;
                  firstName: string;
                  lastName: string;
                  avatar: string;
                };
                coach?: {
                  _id: string;
                  firstName: string;
                  lastName: string;
                  avatar: string;
                };
                status: string;
                plan?: { name: string };
                date?: string;
              }) => ({
                _id: s.athlete?._id || s.coach?._id || "unknown",
                firstName:
                  s.athlete?.firstName || s.coach?.firstName || "Nepoznat",
                lastName: s.athlete?.lastName || s.coach?.lastName || "",
                avatar: s.athlete?.avatar || s.coach?.avatar || "",
                completed: s.status === "completed",
              })
            )}
            title={selectedSession.sessions[0]?.plan?.name || "Trening"}
            date={selectedSession.sessions[0]?.date || new Date().toISOString()}
            session={selectedSession.sessions[0]}
          />
        ) : view === Views.MENTAL_HEALTH_HISTORY ? (
          <MentalHealthList />
        ) : null}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
