# Appointment Calendar

React + Vite Calendar App | Appointment management with Mock API integration.

## Running the project

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── styles/
│   ├── _variables.scss       # Colors, typography, borders
│   ├── _reset.scss           # CSS reset
│   └── index.scss            # Global styles entry point
├── api/
│   └── mockApi.ts            # Appointment type and mock fetch function
├── lib/
│   ├── types.ts              # Shared types and constants
│   └── calendarUtils.ts      # Row building and empty hour detection
├── hooks/
│   └── useAppointments.ts    # Data fetching hook: loading / error / success states
├── components/
│   └── Calendar/
│       ├── Calendar.tsx      # Main calendar component: header, body, collapsed state
│       ├── CalendarRow.tsx   # Single row: hour slot or collapsed block
│       └── Calendar.scss     # Component styles
├── App.tsx
├── App.scss
└── main.tsx
```

## How it works

1. **Fetching** — `useAppointments` calls `fetchAppointments()` on mount and tracks loading, error, and success states.
2. **Row building** — `buildCalendarRows()` scans all appointments and builds a flat list of rows. Hours with no appointments across the whole week are grouped into a single collapsed block.
3. **Rendering** — `Calendar` maps over the row list and renders a `CalendarRow` for each item, passing down the appointments grouped by date.
4. **Expanding** — Collapsed blocks store their open/closed state as a `Set<string>` in `Calendar`. Toggling re-runs `buildCalendarRows`, which inserts the individual hour rows in place of the collapsed block.
5. **Multi-hour events** — An appointment is rendered once in its `startHour` row. Height is set via `--span-rows` CSS custom property, making it visually span multiple rows.

## Design decisions

- **`WEEK_START` is hardcoded** — the mock API is async, so the week start can't be derived from appointment data without a loading delay.
- **No overlap handling** — the spec guarantees no overlapping appointment events.
- **`--span-rows` height trick** — simple and effective, but assumes uniform row heights.
- **Collapsed state lives in `Calendar`** — it controls both the toggle button and which rows are rendered.
