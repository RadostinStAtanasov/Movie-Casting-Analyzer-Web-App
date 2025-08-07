import { Outlet } from "react-router-dom";
import MainNavigation from "../MainNavigation/MainNavigation";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
