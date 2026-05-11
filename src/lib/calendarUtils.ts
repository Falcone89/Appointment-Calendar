// Utility functions for calendar data processing

import type { Appointment } from "../api/mockApi";
import {
  HOUR_START, // The first hour shown in the calendar
  HOUR_END, // The last hour shown in the calendar
  getDayDate, // Returns the date string for the given day index (0=Mon, 6=Sun)
  type CalendarRowData,
} from "./types";

// Returns a set of hours that have at least one appointment across the whole week
function getOccupiedHours(appointments: Appointment[]): Set<number> {
  const occupied = new Set<number>();
  for (const appt of appointments) {
    for (let h = appt.startHour; h < appt.endHour; h++) {
      occupied.add(h);
    }
  }
  return occupied;
}

// Build the list of rows to render in the calendar, including collapsed blocks of empty hours
export function buildCalendarRows(
  appointments: Appointment[],
  openCollapsedRanges: Set<string>
): CalendarRowData[] {
  const occupied = getOccupiedHours(appointments);
  const rows: CalendarRowData[] = [];

  let h = HOUR_START;
  while (h < HOUR_END) {
    if (occupied.has(h)) {
      rows.push({ type: "hour", hour: h });
      h++;
    } else {
      // Find the next occupied hour to determine the range of empty hours
      const rangeStart = h;
      while (h < HOUR_END && !occupied.has(h)) {
        h++;
      }
      const rangeEnd = h; // exclusive

      const key = `${rangeStart}-${rangeEnd}`;
      const isOpen = openCollapsedRanges.has(key);

      if (isOpen) {
        // Expand: add individual hour rows
        for (let i = rangeStart; i < rangeEnd; i++) {
          rows.push({ type: "hour", hour: i });
        }
        // Still track the collapsed row so the toggle button is visible
        rows.push({ type: "collapsed", fromHour: rangeStart, toHour: rangeEnd, isOpen: true });
      } else {
        rows.push({ type: "collapsed", fromHour: rangeStart, toHour: rangeEnd, isOpen: false });
      }
    }
  }

  return rows;
}

// Returns all day date strings for the week (Mon–Sun)
export function getWeekDates(): string[] {
  return Array.from({ length: 7 }, (_, i) => getDayDate(i));
}
