import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import "./Modal.css"; // Add this for modal styling
import SearchBar from "../../../components/SearchBar/SearchBar";
import Calendar from "../../../components/Calendar/Calendar";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { useTrainingSessions } from "../../../hooks/useTrainingSession";
import { TrainingSession } from "../../../types/types"; // Import your types

const CompetitorDashboard: React.FC = () => {
  const { sessions, status, updateSession } = useTrainingSessions();

  const [events, setEvents] = useState<EventInput[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<TrainingSession | null>(null);
  const [showDetails, setShowDetails] = useState(true); // Toggle between details and completion form
  const [results, setResults] = useState({
    HRrest: "",
    duration: "",
    distance: "",
    RPE: "",
    HRavg: "",
    HRmax: "",
  });

  // Transform sessions into FullCalendar-compatible events
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
    const session = sessions.find((s) => s._id === eventData.event.id);
    if (session) {
      setSelectedSession(session);
      setShowDetails(true); // Default to showing plan details
      setIsModalOpen(true);
    }
  };

  const handleCompleteSession = async () => {
    if (!selectedSession) return;

    try {
      await updateSession(selectedSession._id || "", {
        results: { ...results, timeInZones: [] },
        status: "completed",
      });
      setIsModalOpen(false);
      setSelectedSession(null);
      setResults({
        HRrest: "",
        duration: "",
        distance: "",
        RPE: "",
        HRavg: "",
        HRmax: "",
      });
    } catch (error) {
      console.error("Error completing session:", error);
    }
  };

  const handleDateClick = (dateData: DateClickArg) => {
    console.log("Date clicked:", dateData);
  };
  const renderJson = (
    data: Record<string, any>,
    level: number = 0
  ): JSX.Element[] | JSX.Element => {
    return Object.entries(data)
      .filter(([key]) => key !== "_id") // Exclude keys with "_id"
      .map(([key, value]) => (
        <div
          key={`${key}-${level}`}
          className="json-row"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <span className="json-key">{key}:</span>
          {typeof value === "object" && value !== null ? (
            Array.isArray(value) ? (
              <span className="json-value">
                [
                {value.map((item, index) => (
                  <div key={`${key}-${index}`} className="json-array-item">
                    {renderJson(item, level + 1)}
                  </div>
                ))}
                ]
              </span>
            ) : (
              <div className="json-value">{renderJson(value, level + 1)}</div>
            )
          ) : (
            <span className="json-value">{value?.toString()}</span>
          )}
        </div>
      ));
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

      {/* Modal */}
      {isModalOpen && selectedSession && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedSession.plan?.name || "Session Details"}</h2>
            <p>Date: {new Date(selectedSession.date).toLocaleDateString()}</p>
            <p>Status: {selectedSession.status}</p>

            {selectedSession.status === "completed" ? (
              <div className="modal-body">
                <p>
                  <strong>HR Rest:</strong>{" "}
                  {selectedSession.results?.HRrest as string}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {selectedSession.results?.duration as string} minutes
                </p>
                <p>
                  <strong>Distance:</strong>{" "}
                  {selectedSession.results?.distance as string} meters
                </p>
                <p>
                  <strong>RPE:</strong> {selectedSession.results?.RPE as string}
                </p>
                <p>
                  <strong>HR Avg:</strong>{" "}
                  {selectedSession.results?.HRavg as string}
                </p>
                <p>
                  <strong>HR Max:</strong>{" "}
                  {selectedSession.results?.HRmax as string}
                </p>
              </div>
            ) : (
              <div className="modal-body">
                {showDetails ? (
                  <div>
                    <h3>Plan Details</h3>
                    <p>Plan Name: {selectedSession.plan?.name}</p>
                    <div className="json-display">
                      {renderJson(selectedSession.plan || {})}
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="HR Rest"
                      value={results.HRrest}
                      onChange={(e) =>
                        setResults((prev) => ({
                          ...prev,
                          HRrest: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Duration (min)"
                      value={results.duration}
                      onChange={(e) =>
                        setResults((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Distance (m)"
                      value={results.distance}
                      onChange={(e) =>
                        setResults((prev) => ({
                          ...prev,
                          distance: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="RPE (1-10)"
                      value={results.RPE}
                      onChange={(e) =>
                        setResults((prev) => ({ ...prev, RPE: e.target.value }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="HR Avg"
                      value={results.HRavg}
                      onChange={(e) =>
                        setResults((prev) => ({
                          ...prev,
                          HRavg: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="HR Max"
                      value={results.HRmax}
                      onChange={(e) =>
                        setResults((prev) => ({
                          ...prev,
                          HRmax: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            )}

            <div className="modal-footer">
              {selectedSession.status === "completed" ? (
                <button onClick={() => setIsModalOpen(false)}>Close</button>
              ) : (
                <>
                  {showDetails ? (
                    <button onClick={() => setShowDetails(false)}>
                      Populate Results
                    </button>
                  ) : (
                    <button onClick={() => setShowDetails(true)}>
                      View Plan Details
                    </button>
                  )}
                  {!showDetails && (
                    <button onClick={handleCompleteSession}>
                      Complete Training
                    </button>
                  )}
                  <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitorDashboard;
