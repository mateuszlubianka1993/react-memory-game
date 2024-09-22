import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layouts";
import { HomePage, GamePage, ResultsPage, ErrorPage, AboutPage } from "./pages";
import { ROUTER_PATHS } from "./config/router";
import "./App.scss"

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.ROOT,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTER_PATHS.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTER_PATHS.NEW_GAME,
        element: <GamePage />,
      },
      {
        path: ROUTER_PATHS.BEST_RESULTS,
        element: <ResultsPage />,
      },
      {
        path: ROUTER_PATHS.ABOUT,
        element: <AboutPage />,
      },
    ],
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
