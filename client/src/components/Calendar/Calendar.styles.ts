import styled from "@emotion/styled";
import FullCalendar from "@fullcalendar/react";

export const CalendarContainer = styled.div`
  background-color: #121212; /* Match FormWrapper background */
  border-radius: 8px; /* Same border radius */
  max-width: 900px; /* Set a reasonable max width for the calendar */
  margin: 0 auto; /* Center the calendar */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Same subtle shadow */
  padding: ${({ theme }) => theme.spacing.medium}; /* Add padding for content */
  color: ${({ theme }) => theme.colors.white}; /* White text */
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1); /* Subtle light shadow */
`;

export const StyledFullCalendar = styled(FullCalendar)`
  .fc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    color: ${({ theme }) => theme.colors.white};
  }

  .fc-toolbar-title {
    font-size: ${({ theme }) => theme.typography.sizes.title};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }

  .fc-button {
    background: linear-gradient(135deg, #6a5acd, #483d8b); /* Purple gradient */
    border: none;
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.default};
    padding: 10px 15px; /* Button padding */
    font-size: ${({ theme }) => theme.typography.sizes.body};
    cursor: pointer;

    &:hover {
      background: linear-gradient(135deg, #483d8b, #6a5acd);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 3px ${({ theme }) => theme.colors.primaryBlue};
    }
  }

  .fc-daygrid-day {
    background: ${({ theme }) =>
      theme.colors.darkGray}; /* Dark gray for days */
    border: 1px solid #444444; /* Match FormWrapper borders */
    color: ${({ theme }) => theme.colors.white}; /* White text */
  }

  .fc-daygrid-day:hover {
    background: ${({ theme }) => theme.colors.secondaryBlue};
  }

  /* Completed events - greenish color with higher specificity */
  .fc-event.completed-event {
    background-color: #4caf50 !important; /* Light green */
    color: ${({ theme }) => theme.colors.white} !important;
  }

  /* Upcoming events - blue color with higher specificity */
  .fc-event.upcoming-event {
    background-color: #2196f3 !important; /* Blue */
    color: ${({ theme }) => theme.colors.white} !important;
  }

  .fc-event-title {
    font-size: 0.9rem; /* Make event titles smaller */
  }
`;

export const EventModal = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.darkBlue}; /* Dark blue modal */
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const GradientButton = styled.button`
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.default};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #6a5acd, #483d8b); /* Purple gradient */
  color: #ffffff;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: ${({ theme }) => theme.radius.default};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(
      135deg,
      #483d8b,
      #6a5acd
    ); /* Reverse gradient */
  }
`;
