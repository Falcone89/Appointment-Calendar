import type { Appointment } from "../api/mockApi";

export const WEEK_START = "2025-04-07";
export const HOUR_START = 8;
export const HOUR_END = 20;

export const DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Returns the ISO date string for a given day index (0 = Monday)
export function getDayDate(dayIndex: number): string {
  const date = new Date(WEEK_START);
  date.setDate(date.getDate() + dayIndex);
  return date.toISOString().slice(0, 10);
}

// A visible row in the calendar is either a regular hour or a collapsed block
export type CalendarRowData =
  | { type: "hour"; hour: number }
  | { type: "collapsed"; fromHour: number; toHour: number; isOpen: boolean };

// Get the list of visible rows in the calendar, including collapsed blocks
export type AppointmentsByDay = Record<string, Appointment[]>;

// Group appointments by date
export function groupByDate(appointments: Appointment[]): AppointmentsByDay {
  return appointments.reduce<AppointmentsByDay>((acc, appt) => {
    if (!acc[appt.date]) acc[appt.date] = [];
    acc[appt.date].push(appt);
    return acc;
  }, {});
}
