import "./App.css";
import Router from "./route/Router";
import { SessionProvider } from "./api/SessionProvider";

function App() {
  return (
    <SessionProvider>
      <Router />
    </SessionProvider>
  );
}

export default App;
