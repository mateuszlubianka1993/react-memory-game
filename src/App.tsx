import {
  RouterProvider,
} from "react-router-dom";
import router from "./router";
import "./App.scss"

function App() {
  return (
    <main className="appContainer">
      <RouterProvider router={router} />
    </main>
  )
}

export default App
