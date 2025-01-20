import { Routes, Route } from "react-router";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import AllProperties from "../pages/main/AllProperties/AllProperties";
import Login from "../pages/main/auth/Login";
import Register from "../pages/main/auth/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/main/Home/Home";

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" index element={<Home />} />
        <Route
          path="all-properties"
          element={
            <PrivateRoute>
              <AllProperties />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
