import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./assets/pages/Home";
import MoviePage from "./assets/pages/Movie";
import ActorPage from "./assets/pages/Actor";
import RootLayout from "./assets/pages/Root";
import CSVDateParser from "./assets/components/CsvDateParser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <MoviePage /> },
      { path: "/actors", element: <ActorPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <CSVDateParser />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
