import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./assets/pages/Home";
import MoviePage from "./assets/pages/Movie";
import ActorPage from "./assets/pages/Actor";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "movies", element: <MoviePage /> },
  { path: "actors", element: <ActorPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
