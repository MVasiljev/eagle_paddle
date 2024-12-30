/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import {
  CalendarContainer,
  EventModal,
  StyledFullCalendar,
} from "./Calendar.styles";

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
    <CalendarContainer>
      <StyledFullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        eventClassNames={(eventInfo) => {
          return eventInfo.event.extendedProps.status === "completed"
            ? "completed-event"
            : "upcoming-event";
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

      {selectedEvent && (
        <EventModal>
          <h2>Event Details</h2>
          <div>
            <strong>{selectedEvent.event.title}</strong>
            <p>Status: {selectedEvent.event.extendedProps.status}</p>
          </div>
        </EventModal>
      )}
    </CalendarContainer>
  );
};

export default Calendar;
