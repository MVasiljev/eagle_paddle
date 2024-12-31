import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Calendar from "../../../components/Calendar/Calendar";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { useTrainingSessions } from "../../../hooks/useTrainingSession";
import AssignCompetitorsToTraining from "../shared/TrainingPlanPage/AssignCompetitorsToTraining";

// Import styles
import {
  DashboardContainer,
  MainContent,
  CalendarWrapper,
} from "./CoachDashboard.styles";
import { SearchBarWrapper } from "../AdminDashboard/AdminDashboard.styles";
import { Views } from "../../../constants/views";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import CompetitorsPage from "../shared/CompetitorsPage/CompetitorsPage";
import CompetitorProfile from "../shared/CompetitorProfilePage/CompetitorProfile";
import TrainingPlan from "../shared/TrainingPlanPage/TrainingPlan";
import { setView } from "../../../redux/slices/viewSlice";
import TrainingEvent from "../shared/TrainingEvent/TrainingEvent";
import { MyTeam } from "./MyTeam/MyTeam";
import CreateTeam from "./CreateTeam/CreateTeam";

Modal.setAppElement("#root");

const CoachDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.dashboard.view);
  const { sessions, status } = useTrainingSessions();

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

  // Aggregate sessions by date and plan name
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

    setSelectedSession({ sessions: eventProps.sessions });

    // Switch views based on the number of sessions
    if (eventProps.sessions.length === 1) {
      dispatch(setView(Views.TRAINING_EDIT)); // Single session view
    } else {
      dispatch(setView(Views.TRAINING_RESULTS)); // Aggregated view for multiple sessions
    }

    console.log("Event clicked:", eventProps);
  };

  const handleDateClick = (dateData: DateClickArg) => {
    console.log("Date clicked:", dateData);
  };

  return (
    <DashboardContainer>
      <MainContent style={{ marginTop: "6rem" }}>
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
          <AssignCompetitorsToTraining role="coach" />
        ) : view === Views.COMPETITORS ? (
          <CompetitorsPage />
        ) : view === Views.PROFILE ? (
          <CompetitorProfile />
        ) : view === Views.MY_TEAM ? (
          <MyTeam />
        ) : view === Views.CREATE_TEAM ? (
          <CreateTeam />
        ) : view === Views.PLAN ? (
          <TrainingPlan />
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
        ) : null}
      </MainContent>
    </DashboardContainer>
  );
};

export default CoachDashboard;
