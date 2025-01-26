import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../contexts/AuthContexts";
import Loading from "../shared/Loading";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user.role === "user") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default UserRoute;
