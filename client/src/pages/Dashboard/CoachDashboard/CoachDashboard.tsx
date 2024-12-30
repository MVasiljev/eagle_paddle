import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
// import "./AdminDashboard.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Calendar from "../../../components/Calendar/Calendar";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { useTrainingSessions } from "../../../hooks/useTrainingSession";
import { useUsers } from "../../../hooks/useUsers"; // Custom hook to fetch competitors

Modal.setAppElement("#root"); // Required for accessibility

const CoachDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { sessions, status } = useTrainingSessions();
  const { users: competitors } = useUsers(); // Assuming a hook to fetch competitors

  const [events, setEvents] = useState<EventInput[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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
    navigate("/dashboard/coach/assign-training");
  };

  const handleCreateTeam = () => {
    console.log("Creating team with users:", selectedUsers);
    setIsModalOpen(false);

    // Implement team creation API call here
    // Example:
    // createTeam({ name: "New Team", coach: loggedInCoachId, members: selectedUsers });
  };

  const handleUserSelection = (userId: string) => {
    setSelectedUsers(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // Remove user if already selected
          : [...prev, userId] // Add user if not selected
    );
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
            marginRight: "10px",
          }}
        >
          Assign Training Plans
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Team
        </button>
      </div>

      {/* Welcome Text */}
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Welcome, Coach! This is your dashboard.
      </p>

      {/* Modal for Selecting Users */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Team"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            borderRadius: "10px",
            zIndex: 1050, // Higher than the calendar's z-index
          },
          overlay: {
            zIndex: 1040, // Ensure overlay is behind modal content
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Dim background
          },
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Team</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {competitors.map((user) => (
            <li key={user._id} style={{ margin: "10px 0" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserSelection(user._id)}
                  style={{ marginRight: "10px" }}
                />
                {user.firstName} {user.lastName}
              </label>
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleCreateTeam}
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
            Confirm
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "10px",
              zIndex: 1050,
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CoachDashboard;
