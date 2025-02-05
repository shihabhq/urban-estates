import React, { useContext } from "react";
import Heading from "../../../shared/Heading";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AuthContext from "../../../contexts/AuthContexts";
import { getAuth, deleteUser } from "firebase/auth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import UserRow from "./components/UserRow";
import axios from "axios";

const ManageUsers = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user: currentUser, loading, setLoading } = useContext(AuthContext);

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });
  const makeRoleChange = async (email, role) => {
    try {
      await axiosSecure.patch(`/user/${email}`, { role: role });
      refetch();
    } catch (error) {
      toast.error("there was an error while updating role");
    }
  };

  if (isLoading || loading) {
    return <Loading />;
  }
  if (!users || users.length === 0) {
    return <Heading largeHead={"No users found"} />;
  }
  return (
    <>
      <div>
        <Heading largeHead={"Manage Users"} />
      </div>
      <div className="overflow-x-auto w-[90%] mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th className="w-fit">Role</th>
              <th className="text-center">Role Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <UserRow
            
                  key={user._id}
                  currentUser={currentUser}
                  user={user}
                  makeRoleChange={makeRoleChange}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
