import React, { useEffect, useState } from "react";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Calendar from "../../../components/Calendar/Calendar";
import SearchBar from "../../../components/SearchBar/SearchBar";
import TrainingResultsForm from "./components/TrainingResultsForm";
import MentalHealthForm from "./components/MentalHealthForm";
import {
  DashboardContainer,
  MainContent,
  SearchBarWrapper,
  CalendarWrapper,
  ContentCenter,
} from "./CompetitorDashboard.styles";
import { Views } from "../../../constants/views";
import { setView } from "../../../redux/slices/viewSlice";
import MyMentalHealthList from "./components/MyMentalHealthList";
import { useTrainingSessions } from "../../../hooks/useTrainingSession";
import TrainingReport from "../shared/TrainingReport/TrainingReport";
import { TrainingResultsFormData } from "../../../types/types";
import MyProfile from "./components/MyProfile/MyProfile";

const CompetitorDashboard: React.FC = () => {
  const {
    sessions,
    updateResults,
    getMySessions, // Fetch sessions again to refresh list
  } = useTrainingSessions();

  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const selectedSession = sessions.find(
    (session) => session._id === selectedSessionId
  );
  const view = useSelector((state: RootState) => state.dashboard.view);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth); // Get logged-in user

  // Fetch sessions on mount
  useEffect(() => {
    getMySessions();
  }, []);

  // Format sessions to FullCalendar events
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const formattedEvents = sessions.map((session) => ({
        id: session._id,
        title: session.plan?.name || "Unnamed Plan",
        start: session.date,
        extendedProps: {
          results: session.results || {},
          status: session.status || "unknown",
        },
      }));
      setEvents(formattedEvents);
    }
  }, [sessions]);

  const handleEventClick = (eventData: EventClickArg) => {
    const eventStatus = eventData.event.extendedProps.status;

    if (eventStatus === "completed") {
      dispatch(setView(Views.TRAINING_RESULTS)); // New view for completed results
    } else {
      dispatch(setView(Views.TRAINING_RESULTS_EDIT)); // Edit for upcoming
    }

    setSelectedSessionId(eventData.event.id);
  };

  const handleDateClick = (dateData: DateClickArg) => {
    console.log("Date clicked:", dateData);
  };

  const handleSubmitResults = async (results: TrainingResultsFormData) => {
    if (!selectedSessionId) return;

    try {
      // Update results using hook
      await updateResults(
        selectedSessionId,
        results as unknown as Record<string, unknown>
      );

      // Update the calendar to reflect completed status
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedSessionId
            ? {
                ...event,
                extendedProps: {
                  ...event.extendedProps,
                  status: "completed",
                  results,
                },
              }
            : event
        )
      );

      alert("Results successfully submitted!");
      dispatch(setView(Views.CALENDAR));
      setSelectedSessionId(null);
    } catch (error) {
      console.error("Error submitting results:", error);
      alert("Failed to submit results.");
    }
  };

  return (
    <DashboardContainer>
      <MainContent>
        {view === Views.CALENDAR || !view ? (
          <ContentCenter>
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
          </ContentCenter>
        ) : view === Views.MENTAL_HEALTH_CREATE ? (
          <MentalHealthForm />
        ) : view === Views.MY_MENTAL_HEALTH_HISTORY ? (
          <MyMentalHealthList />
        ) : view === Views.TRAINING_RESULTS ? (
          <TrainingReport session={selectedSession} user={user} />
        ) : view === Views.MY_PROFILE ? (
          <MyProfile />
        ) : view === Views.TRAINING_RESULTS_EDIT ? (
          <TrainingResultsForm
            onSubmit={handleSubmitResults}
            onBack={() => {
              setSelectedSessionId(null);
              dispatch(setView(Views.CALENDAR));
            }}
          />
        ) : null}
      </MainContent>
    </DashboardContainer>
  );
};

export default CompetitorDashboard;
