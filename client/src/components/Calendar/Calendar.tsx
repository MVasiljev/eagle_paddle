// src/components/Calendar.tsx
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import "./Calendar.css"; // Import custom styles

interface CalendarProps {
  events: EventInput[]; // Array of event objects
  onEventClick: (eventData: EventClickArg) => void; // Function to handle event clicks
  onDateClick: (dateData: DateClickArg) => void; // Function to handle date clicks
}

const Calendar: React.FC<CalendarProps> = ({
  events,
  onEventClick,
  onDateClick,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(
    null
  );

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo);
    onEventClick(clickInfo);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    onDateClick(dateInfo);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        eventClassNames={(eventInfo) => {
          // Add a class based on the event status
          if (eventInfo.event.extendedProps.status === "completed") {
            return "completed-event";
          } else {
            return "upcoming-event";
          }
        }}
        eventContent={(eventInfo) => (
          <div>
            <b>{eventInfo.event.title}</b>
            <br />
            <i>
              {eventInfo.event.extendedProps.status === "completed"
                ? "Završeno"
                : "Predstojeće"}
            </i>
          </div>
        )}
      />

      {/* Event Modal (You can modify it as per your needs) */}
      {selectedEvent && (
        <div className="event-modal">
          <h2>Event Details</h2>
          <div>
            <strong>{selectedEvent.event.title}</strong>
            <p>Status: {selectedEvent.event.extendedProps.status}</p>
            {/* You can add more event details here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
