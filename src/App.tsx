import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import { ROUTER_PATHS } from "./config/router";
import "./App.scss"

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTER_PATHS.NEW_GAME,
    element: <GamePage />,
  },
]);

function App() {

  return (
    <main className="appContainer">
      <RouterProvider router={router} />
    </main>
  )
}

export default App
