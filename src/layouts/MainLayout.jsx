import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full mx-auto">
        <Outlet />
        
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
