import type { Appointment } from "../../api/mockApi";
import type { CalendarRowData } from "../../lib/types";
import { getWeekDates } from "../../lib/calendarUtils";

interface CalendarRowProps {
  row: CalendarRowData;
  appointmentsByDate: Record<string, Appointment[]>;
  onToggleCollapsed: (fromHour: number, toHour: number) => void;
}

// Format hour number (e.g. 8) to "08:00"
function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

// Get the appointment that starts at the given hour (If any)
function getAppointmentAt(
  appointments: Appointment[],
  hour: number
): Appointment | undefined {
  return appointments.find((a) => a.startHour === hour);
}

// Static: week dates never change during the app's lifetime
const WEEK_DATES = getWeekDates();

export function CalendarRow({ row, appointmentsByDate, onToggleCollapsed }: CalendarRowProps) {
  if (row.type === "collapsed") {
    return (
      <div className="calendar-row calendar-row--collapsed">
        <div className="calendar-row__label">
          <button
            className="collapse-toggle"
            onClick={() => onToggleCollapsed(row.fromHour, row.toHour)}
          >
            {row.isOpen ? "Close" : "Open"}
          </button>
        </div>
        {WEEK_DATES.map((date) => (
          <div key={date} className="calendar-cell calendar-cell--collapsed" />
        ))}
      </div>
    );
  }

  const { hour } = row;

  return (
    <div className="calendar-row">
      <div className="calendar-row__label">{formatHour(hour)}</div>
      {WEEK_DATES.map((date) => {
        const dayAppointments = appointmentsByDate[date] ?? [];
        const appt = getAppointmentAt(dayAppointments, hour);
        const spanRows = appt ? appt.endHour - appt.startHour : 1;

        return (
          <div key={date} className="calendar-cell">
            {appt && (
              <div
                className="appointment"
                style={{ "--span-rows": spanRows } as React.CSSProperties}
                title={appt.title}
              >
                <span className="appointment__title">{appt.title}</span>
                <span className="appointment__time">
                  {formatHour(appt.startHour)}-{formatHour(appt.endHour)}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
