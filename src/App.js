import "./App.css";
import Router from "./route/Router";
import { SessionProvider } from "./user/SessionProvider";

function App() {
  return (
    <SessionProvider>
      <Router />
    </SessionProvider>
  );
}

export default App;
