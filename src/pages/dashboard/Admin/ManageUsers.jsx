import React from "react";
import Heading from "../../../shared/Heading";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import UserRow from "./components/UserRow";

const ManageUsers = () => {
  const { axiosSecure } = useAxiosSecure();

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

  if (isLoading) {
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
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Role Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return <UserRow key={user._id} user={user} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
