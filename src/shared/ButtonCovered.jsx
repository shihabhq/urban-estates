import { Link } from "react-router";

const ButtonCovered = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-lg flex text-white items-center justify-center gap-3 font-poppins font-semibold bg-btncol hover:bg-btnhov px-3 py-3 rounded-md transition-all duration-200">
      {children}
    </Link>
  );
};

export default ButtonCovered;
