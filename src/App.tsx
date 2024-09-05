import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ROUTER_PATHS } from "./config/router";
import "./App.scss"

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <HomePage />,
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
