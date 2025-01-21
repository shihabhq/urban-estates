import { Link } from "react-router";
import logo from "../../assets/home/logo.png";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdOutlineReviews, MdOutlineSell } from "react-icons/md";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { PiBuildingsBold } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { VscFeedback, VscGitPullRequestNewChanges } from "react-icons/vsc";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import DashboardBtn from "./DashboardBtn";

const DashboardNav = ({ open, setOpen }) => {
  return (
    <div
      className={`bg-gray-100 z-50 fixed md:static ${
        open ? "left-0" : "-left-full"
      } top-0 p-4 flex justify-start w-fit min-w-[15vw] h-full items-center flex-col gap-4 transition-all duration-300`}
    >
     
      <div className="self-end md:hidden">
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 hover:text-gray-900 p-2"
        >
          <IoMdClose size={28} />
        </button>
      </div>

      <Link to={"/"}>
        <img src={logo} className="w-32" alt="logo" />
      </Link>

      <div className="flex flex-col gap-1 w-full">
        <DashboardBtn
          icon={<FaRegUser />}
          name="Profile"
          to="/dashboard/profile"
        />
        <DashboardBtn
          icon={<FaRegHeart />}
          name="Wishlist"
          to="/dashboard/wishlist"
        />
        <DashboardBtn
          icon={<BiPurchaseTagAlt />}
          name="Properties Bought"
          to="/dashboard/bought"
        />
        <DashboardBtn
          icon={<MdOutlineReviews />}
          name="My Reviews"
          to="/dashboard/my-reviews"
        />
        <DashboardBtn
          icon={<PiBuildingsBold />}
          name="Manage Properties"
          to="/dashboard/manage-properties"
        />
        <DashboardBtn
          icon={<HiOutlineUsers />}
          name="Manage Users"
          to="/dashboard/manage-users"
        />
        <DashboardBtn
          icon={<VscFeedback />}
          name="Manage Reviews"
          to="/dashboard/manage-reviews"
        />
        <DashboardBtn
          icon={<PiBuildingsBold />}
          name="Add Property"
          to="/dashboard/add-property"
        />
        <DashboardBtn
          icon={<MdOutlineAddBusiness />}
          name="My Added Property"
          to="/dashboard/added-properties"
        />
        <DashboardBtn
          icon={<VscGitPullRequestNewChanges />}
          name="Requested Properties"
          to="/dashboard/requested-properties"
        />
        <DashboardBtn
          icon={<MdOutlineSell />}
          name="Sold Properties"
          to="/dashboard/sold-properties"
        />
      </div>
    </div>
  );
};

export default DashboardNav;
