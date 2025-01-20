import { Outlet } from "react-router";
import DashboardNav from "../shared/DashboardNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex gap-8">
      <DashboardNav />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
