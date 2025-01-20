import { Link } from "react-router";

const ButtonOutlined = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="font-arial font-semibold flex items-center justify-center gap-3 px-3 py-2 hover:bg-btncol hover:text-white text-btncol border border-btncol rounded-md text-lg transition-all duration-200 ">
      {children}
    </Link>
  );
};

export default ButtonOutlined;
