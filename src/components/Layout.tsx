import Header from "./Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="relative flex flex-col mt-20">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
