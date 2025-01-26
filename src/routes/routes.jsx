import { Routes, Route } from "react-router";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import AllProperties from "../pages/main/AllProperties/AllProperties";
import Login from "../pages/main/auth/Login";
import Register from "../pages/main/auth/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/main/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Notfound from "../pages/Notfound";
import Profile from "../pages/dashboard/Profile";
import WishList from "../pages/dashboard/User/WishList";
import PropertiesBought from "../pages/dashboard/User/PropertiesBought";
import MyReviews from "../pages/dashboard/User/MyReviews";
import ManageProperties from "../pages/dashboard/Admin/ManageProperties";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import ManageReviews from "../pages/dashboard/Admin/ManageReviews";
import AddProperty from "../pages/dashboard/Agent/AddProperty";
import AddedProperties from "../pages/dashboard/Agent/AddedProperties";
import RequestedProperties from "../pages/dashboard/Agent/RequestedProperties";
import SoldProperties from "../pages/dashboard/Agent/SoldProperties";
import UpdateProperty from "../pages/dashboard/Agent/UpdateProperty";
import PropertyDetails from "../pages/main/propertydetails/PropertyDetails";
import MakeOffer from "../pages/dashboard/User/MakeOffer";
import PaymentPage from "../pages/dashboard/User/PaymentPage";

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
        <Route
          path="/details/:id"
          element={
            <PrivateRoute>
              <PropertyDetails />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="wishlist" element={<WishList />} />
        <Route path="bought" element={<PropertiesBought />} />
        <Route path="my-reviews" element={<MyReviews />} />
        <Route path="manage-properties" element={<ManageProperties />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-reviews" element={<ManageReviews />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="added-properties" element={<AddedProperties />} />
        <Route path="requested-properties" element={<RequestedProperties />} />
        <Route path="sold-properties" element={<SoldProperties />} />
        <Route path="update/:id" element={<UpdateProperty />} />
        <Route path="offer/:id" element={<MakeOffer />} />
        <Route
          path="payment"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
