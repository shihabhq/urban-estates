import { Routes, Route } from "react-router";
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
import Adverstise from "../pages/dashboard/Admin/Adverstise";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import Career from "../pages/main/careers/Career";
import Developers from "../pages/main/developers/Developers";
import Contact from "../pages/main/Contact/Contact";

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" index element={<Home />} />
        <Route path="all-properties" element={<AllProperties />} />
        <Route path="careers" element={<Career />} />
        <Route path="developers" element={<Developers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="details/:id" element={<PropertyDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="wishlist"
          element={
            <UserRoute>
              <WishList />
            </UserRoute>
          }
        />
        <Route
          path="bought"
          element={
            <UserRoute>
              <PropertiesBought />
            </UserRoute>
          }
        />
        <Route
          path="my-reviews"
          element={
            <UserRoute>
              <MyReviews />
            </UserRoute>
          }
        />
        <Route
          path="manage-properties"
          element={
            <AdminRoute>
              <ManageProperties />
            </AdminRoute>
          }
        />
        <Route
          path="manage-users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
        <Route
          path="manage-reviews"
          element={
            <AdminRoute>
              <ManageReviews />
            </AdminRoute>
          }
        />
        <Route
          path="advertise-properties"
          element={
            <AdminRoute>
              <Adverstise />
            </AdminRoute>
          }
        />
        <Route
          path="add-property"
          element={
            <AgentRoute>
              <AddProperty />
            </AgentRoute>
          }
        />
        <Route
          path="added-properties"
          element={
            <AgentRoute>
              <AddedProperties />
            </AgentRoute>
          }
        />
        <Route
          path="requested-properties"
          element={
            <AgentRoute>
              <RequestedProperties />
            </AgentRoute>
          }
        />
        <Route
          path="sold-properties"
          element={
            <AgentRoute>
              <SoldProperties />
            </AgentRoute>
          }
        />
        <Route
          path="update/:id"
          element={
            <AgentRoute>
              <UpdateProperty />
            </AgentRoute>
          }
        />
        <Route
          path="offer/:id"
          element={
            <UserRoute>
              <MakeOffer />
            </UserRoute>
          }
        />
        <Route
          path="payment"
          element={
            <UserRoute>
              <PaymentPage />
            </UserRoute>
          }
        />

        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
