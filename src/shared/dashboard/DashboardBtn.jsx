import React, { act } from "react";
import { Link, NavLink } from "react-router";

const DashboardBtn = ({ icon, name, to }) => {
  return (
    <NavLink
      className={({isActive}) =>
        `text-xl flex items-center justify-start gap-4 font-semibold hover:bg-btnhov p-2 rounded-md transition-all duration-150 hover:text-white ${isActive ? 'active-dash':''}`
      }
      to={to}>
      {icon} {name}
    </NavLink>
  );
};

export default DashboardBtn;
