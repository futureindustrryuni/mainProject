import { useRoutes } from "react-router-dom";
import routes from "./routes";
import './App.css'
import { IsLoginProvider } from "./context/IsLoginContext";

function App() {
  let routers = useRoutes(routes);

  return <IsLoginProvider>{routers}</IsLoginProvider>;
}

export default App;
