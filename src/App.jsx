import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import HomePage from "./assets/pages/Home";
import MoviePage from "./assets/pages/Movie";
import ActorPage from "./assets/pages/Actor";
import RootLayout from "./assets/pages/Root";
import MovieDetailsPage from "./assets/pages/MovieDetails";
import Context from "./assets/components/Context";
import { useState, useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <MoviePage /> },
      { path: "/movies/:movieId", element: <MovieDetailsPage /> },
      { path: "/actors", element: <ActorPage /> },
    ],
  },
]);

function App() {
  const userInfo = {
    name: "Jonny",
  };

  return (
    <>
      <Context.Provider value={userInfo}>
        <RouterProvider router={router} />
      </Context.Provider>
    </>
  );
}

export default App;
