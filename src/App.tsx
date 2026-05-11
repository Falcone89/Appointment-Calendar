import { Calendar } from "./components/Calendar/Calendar";
import "./App.scss";

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1 className="app-header__title">Calendar</h1>
        <p className="app-header__description">
          React calendar app with appointments fetched from a mock API. Empty hours are collapsed by default, but you can expand them to see the full schedule.
        </p>
      </header>
      <Calendar />
    </main>
  );
}
