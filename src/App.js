import { UserProvider } from "./api/UserContext";
import "./App.css";
import Router from "./route/Router";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
