import { useState, useCallback } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { buildCalendarRows, getWeekDates } from "../../lib/calendarUtils";
import { groupByDate, WEEK_START, DAY_LABELS } from "../../lib/types";
import { CalendarRow } from "./CalendarRow";
import "./Calendar.scss";

const WEEK_DATES = getWeekDates();

// Format Dates to String ("2025-04-07" -> "7 April")
function formatDateLabel(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleDateString("en-GB", { month: "long", day: "numeric" });
}

// Format week label ("2025-04-07" -> "7 April – 13 Apr, 2025")
function formatWeekLabel(weekStart: string): string {
  const start = new Date(weekStart);
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);

  return `${start.toLocaleDateString("en-GB", { month: "long", day: "numeric" })} - ${end.toLocaleDateString("en-GB", { month: "short", day: "numeric" })}, ${end.getFullYear()}`;
}

export function Calendar() {
  const result = useAppointments();
  const [openCollapsedRanges, setOpenCollapsedRanges] = useState<Set<string>>(new Set());

  // Toggle whether a collapsed block of hours is open or closed
  const handleToggleCollapsed = useCallback((fromHour: number, toHour: number) => {
    const key = `${fromHour}-${toHour}`;
    setOpenCollapsedRanges((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Loading state
  if (result.status === "loading") {
    return (
      <div className="calendar-status">
        <div className="spinner" aria-label="Loading appointments" />
        <p>Loading...</p>
      </div>
    );
  }

  // Error state
  if (result.status === "error") {
    return (
      <div className="calendar-status calendar-status--error">
        <p>Error: Failed to load appointments: {result.message}</p>
      </div>
    );
  }

  const { appointments } = result;
  const appointmentsByDate = groupByDate(appointments);
  const rows = buildCalendarRows(appointments, openCollapsedRanges);

  return (
    <>
      <h2 className="calendar-title">{formatWeekLabel(WEEK_START)}</h2>
      <div className="calendar-scroll-wrapper">
        <div className="calendar">
          
          <div className="calendar-header">
            <div className="calendar-header__spacer" />
            {WEEK_DATES.map((date, i) => (
              <div key={date} className="calendar-header__day">
                <span className="calendar-header__day-name">{DAY_LABELS[i]}</span>
                <span className="calendar-header__day-date">{formatDateLabel(date)}</span>
              </div>
            ))}
          </div>

          <div className="calendar-body">
            {rows.map((row) => (
              <CalendarRow
                key={row.type === "hour" ? `hour-${row.hour}` : `collapsed-${row.fromHour}-${row.toHour}`}
                row={row}
                appointmentsByDate={appointmentsByDate}
                onToggleCollapsed={handleToggleCollapsed}
              />
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
}
