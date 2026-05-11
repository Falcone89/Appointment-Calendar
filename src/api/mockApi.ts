export type Appointment = {
  id: string;
  title: string;
  date: string; // ISO date string, e.g. "2025-04-02"
  startHour: number; // inclusive, e.g. 9 for 09:00
  endHour: number; // exclusive, e.g. 10 for 09:00–10:00
};

const MOCK_APPOINTMENTS: Appointment[] = [
  // Monday 2025-04-07
  { id: "a1", title: "Team standup", date: "2025-04-07", startHour: 9, endHour: 10 },
  { id: "a2", title: "Sprint planning", date: "2025-04-07", startHour: 10, endHour: 11 },
  { id: "a3", title: "1-on-1 with Alex", date: "2025-04-07", startHour: 14, endHour: 15 },
  { id: "a4", title: "Code review session", date: "2025-04-07", startHour: 15, endHour: 16 },

  // Tuesday 2025-04-08
  { id: "b1", title: "Client onboarding", date: "2025-04-08", startHour: 9, endHour: 10 },
  { id: "b2", title: "Design review", date: "2025-04-08", startHour: 10, endHour: 11 },
  { id: "b3", title: "Lunch & learn", date: "2025-04-08", startHour: 11, endHour: 12 },
  { id: "b4", title: "QA sync", date: "2025-04-08", startHour: 14, endHour: 15 },
  { id: "b5", title: "Backlog grooming", date: "2025-04-08", startHour: 16, endHour: 17 },

  // Wednesday 2025-04-09
  { id: "c1", title: "Architecture discussion", date: "2025-04-09", startHour: 9, endHour: 11 },
  { id: "c2", title: "Investor call", date: "2025-04-09", startHour: 11, endHour: 12 },
  { id: "c3", title: "HR interview", date: "2025-04-09", startHour: 14, endHour: 15 },
  { id: "c4", title: "Team retro", date: "2025-04-09", startHour: 15, endHour: 16 },
  { id: "c5", title: "Office hours", date: "2025-04-09", startHour: 16, endHour: 17 },

  // Thursday 2025-04-10
  { id: "d1", title: "Product demo prep", date: "2025-04-10", startHour: 9, endHour: 10 },
  { id: "d2", title: "Product demo", date: "2025-04-10", startHour: 10, endHour: 12 },
  { id: "d3", title: "Post-demo debrief", date: "2025-04-10", startHour: 14, endHour: 15 },
  { id: "d4", title: "Mentoring session", date: "2025-04-10", startHour: 15, endHour: 16 },
  { id: "d5", title: "Weekly metrics review", date: "2025-04-10", startHour: 16, endHour: 17 },

  // Friday 2025-04-11
  { id: "e1", title: "Team standup", date: "2025-04-11", startHour: 9, endHour: 10 },
  { id: "e2", title: "Release planning", date: "2025-04-11", startHour: 10, endHour: 11 },
  { id: "e3", title: "Stakeholder update", date: "2025-04-11", startHour: 11, endHour: 12 },
  { id: "e4", title: "Deployment window", date: "2025-04-11", startHour: 14, endHour: 16 },

  // Saturday 2025-04-12
  { id: "f1", title: "On-call check-in", date: "2025-04-12", startHour: 10, endHour: 11 },
  { id: "f2", title: "Incident review", date: "2025-04-12", startHour: 11, endHour: 12 },

  // Sunday 2025-04-13
  { id: "g1", title: "Weekly planning", date: "2025-04-13", startHour: 15, endHour: 16 },
];

const SIMULATED_DELAY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAppointments(): Promise<Appointment[]> {
  await delay(SIMULATED_DELAY_MS);
  return structuredClone(MOCK_APPOINTMENTS);
}
