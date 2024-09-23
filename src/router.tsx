import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts";
import { ROUTER_PATHS } from "./config/router";

import HomePage from "./pages/HomePage";
const GamePage = lazy(() => import("./pages/GamePage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.ROOT,
    element: <MainLayout />,
    errorElement: <Suspense fallback={<p>Loading</p>}><ErrorPage /></Suspense>,
    children: [
      {
        path: ROUTER_PATHS.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTER_PATHS.NEW_GAME,
        element: <Suspense fallback={<p>Loading</p>}><GamePage /></Suspense>,
      },
      {
        path: ROUTER_PATHS.BEST_RESULTS,
        element: <Suspense fallback={<p>Loading</p>}><ResultsPage /></Suspense>,
      },
      {
        path: ROUTER_PATHS.ABOUT,
        element: <Suspense fallback={<p>Loading</p>}><AboutPage /></Suspense>,
      },
    ],
  },
]);

export default router;
