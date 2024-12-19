import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Calendar from "../../../components/Calendar/Calendar";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { useTrainingSessions } from "../../../hooks/useTrainingSession";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { sessions, status } = useTrainingSessions();

  const [events, setEvents] = useState<EventInput[]>([]);

  // Transform sessions into FullCalendar-compatible events
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const formattedEvents = sessions.map((session) => ({
        id: session._id,
        title: session.plan?.name || "Unnamed Plan", // Use plan name or fallback
        start: session.date,
        status: session.status || "unknown", // Use the status from backend
        extendedProps: {
          results: session.results || {}, // Pass results if needed
          status: session.status || "unknown", // Use backend status
        },
      }));
      setEvents(formattedEvents);
    }
  }, [sessions]);

  const handleEventClick = (eventData: EventClickArg) => {
    const { extendedProps } = eventData.event;
    console.log("Event clicked:", {
      status: extendedProps.status, // Correctly reflects the backend status
      results: extendedProps.results, // Additional debugging info
    });
  };

  const handleDateClick = (dateData: DateClickArg) => {
    console.log("Date clicked:", dateData);
  };

  const handleAssignButtonClick = () => {
    navigate("/dashboard/admin/assign-training");
  };

  return (
    <div className="dashboard-container">
      {/* Search Bar */}
      <SearchBar onSearch={(query) => console.log(query)} />

      {/* Calendar */}
      {status === "loading" ? (
        <p>Loading sessions...</p>
      ) : (
        <Calendar
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
          events={events}
        />
      )}

      {/* Assign Training Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleAssignButtonClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Assign Training Plans
        </button>
      </div>

      {/* Welcome Text */}
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Welcome, Admin! This is your dashboard.
      </p>
    </div>
  );
};

export default AdminDashboard;
