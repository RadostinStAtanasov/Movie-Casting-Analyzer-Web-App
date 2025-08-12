import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./assets/pages/Home";
import MoviePage from "./assets/pages/Movie";
import ActorPage from "./assets/pages/Actor";
import RootLayout from "./assets/pages/Root";
import MovieDetailsPage from "./assets/pages/MovieDetails";
import ActorDetailsPage from "./assets/pages/ActorDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <MoviePage /> },
      { path: "/actors", element: <ActorPage /> },
      { path: "/movies/:movieId", element: <MovieDetailsPage /> },
      { path: "/actors/:actorId", element: <ActorDetailsPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
