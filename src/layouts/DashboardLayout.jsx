import { useState } from "react";
import { Outlet } from "react-router";
import DashboardNav from "../shared/dashboard/DashboardNav";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="min-h-screen relative flex">
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      <div
        className="absolute cursor-pointer top-[4%] left-[4%] z-50 md:hidden"
        onClick={toggleMenu}>
        <FaBars size={28} />
      </div>

      <div>
        <DashboardNav open={open} setOpen={setOpen} />
      </div>

      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
