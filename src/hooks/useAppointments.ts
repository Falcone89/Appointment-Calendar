import { useEffect, useState } from "react";
import { fetchAppointments, type Appointment } from "../api/mockApi";

type UseAppointmentsResult =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; appointments: Appointment[] };

export function useAppointments(): UseAppointmentsResult {
  const [result, setResult] = useState<UseAppointmentsResult>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    // Fetch appointments from the mock API
    fetchAppointments()
      .then((appointments) => {
        if (!cancelled) setResult({ status: "success", appointments });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Unknown error";
          setResult({ status: "error", message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return result;
}
