import { Link, NavLink } from "react-router";
import logoImg from "../assets/home/logo.png";
import ButtonOutlined from "./ButtonOutlined";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContexts";

const NavBtn = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-arial font-semibold text-base hover:bg-inherit focus:bg-inherit active:bg-transparent shadow-none px-0 py-0 rounded-none duration-200 transition-[color] mx-4 hover:text-btncol ${
          isActive ? "active-nav" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <>
      <div className="shadow-md fixed w-full bg-base-100 z-[1000]">
        <div className="container mx-auto navbar bg-base-100 py-0 max-w-[1280px]">
          {/* Navbar Start */}
          <div className="navbar-start lg:w-auto flex items-center mr-8">
            {/* Mobile Dropdown */}
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 flex flex-col gap-2 py-4 rounded-box z-[999] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavBtn to={"/"}>Home</NavBtn>
                </li>
                <li>
                  <NavBtn to={"/all-properties"}>All Properties</NavBtn>
                </li>
                <li>
                  <NavBtn to={"/developers"}>Developers</NavBtn>
                </li>
                <li>
                  <NavBtn to={"/careers"}>Careers</NavBtn>
                </li>
                <li>
                  <NavBtn to={"/contact"}>Contact Us</NavBtn>
                </li>
                {user ? (
                  <>
                    <li className="inline-block sm:hidden">
                      <ButtonOutlined to={"/dashboard"}>
                        Dashboard
                      </ButtonOutlined>
                    </li>
                      <div onClick={logOut}>
                    <li className="inline-block sm:hidden w-full">
                        <ButtonOutlined>LogOut</ButtonOutlined>
                    </li>
                      </div>
                  </>
                ) : (
                  <>
                    <li className="inline-block sm:hidden">
                      <ButtonOutlined to={"/login"}>Login</ButtonOutlined>
                    </li>
                    <li className="inline-block sm:hidden">
                      <ButtonOutlined to={"/register"}>Register</ButtonOutlined>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img className="max-w-24" src={logoImg} alt="Logo" />
            </Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavBtn to={"/"}>Home</NavBtn>
              </li>
              <li>
                <NavBtn to={"/all-properties"}>All Properties</NavBtn>
              </li>
              <li>
                <NavBtn to={"/developers"}>Developers</NavBtn>
              </li>
              <li>
                <NavBtn to={"/careers"}>Careers</NavBtn>
              </li>
              <li>
                <NavBtn to={"/contact"}>Contact Us</NavBtn>
              </li>
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end hidden sm:flex items-end justify-end gap-4">
            {user ? (
              <>
                <div onClick={logOut}>
                  <ButtonOutlined>Log Out</ButtonOutlined>
                </div>
                <ButtonOutlined to={"/dashboard/profile"}>
                  Dashboard
                </ButtonOutlined>
              </>
            ) : (
              <>
                <ButtonOutlined to={"/login"}>Login</ButtonOutlined>
                <ButtonOutlined to={"/register"}>Register</ButtonOutlined>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Spacer to Avoid Overlap */}
      <div className="mt-24"></div>
    </>
  );
};

export default Navbar;
