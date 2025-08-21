import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./assets/pages/Home";
import MoviePage from "./assets/pages/movie/Movie";
import ActorPage from "./assets/pages/actor/Actor";
import RootLayout from "./assets/pages/Root";
import MovieDetailsPage from "./assets/pages/movie/MovieDetails";
import ActorDetailsPage from "./assets/pages/actor/ActorDetails";
import ActorUpdatePage from "./assets/pages/actor/ActorUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <MoviePage /> },
      { path: "/movies/:movieId", element: <MovieDetailsPage /> },
      { path: "/actors", element: <ActorPage /> },
      { path: "/actors/:actorId", element: <ActorDetailsPage /> },
      { path: "actors/update/:actorId", element: <ActorUpdatePage /> },
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
