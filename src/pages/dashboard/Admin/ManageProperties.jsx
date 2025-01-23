import React from "react";
import Heading from "../../../shared/Heading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManagePropertyCard from "./components/ManagePropertyCard";
import { toast } from "react-toastify";

const ManageProperties = () => {
  const { axiosSecure } = useAxiosSecure();
  const {
    data: properties,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/properties/${id}`, {
        status: "rejected",
      });
      refetch();
    } catch (error) {
      toast.error("Unexpected error occured while rejecting");
    }
  };
  const handleVerify = async (id) => {
    try {
      const res = await axiosSecure.patch(`/properties/${id}`, {
        status: "verified",
      });
      refetch();
    } catch (error) {
      toast.error("Unexpected error occured while verifying");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!properties || properties.length === 0) {
    return <Heading largeHead={"No properties found"} />;
  }

  return (
    <>
      <Heading largeHead={"Manage Properties"} />
      <div className="overflow-x-auto mx-auto w-[90%]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Agent name</th>
              <th>Agent email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => {
              return (
                <ManagePropertyCard
                  handleVerify={() => handleVerify(property._id)}
                  handleReject={() => handleReject(property._id)}
                  key={property._id}
                  property={property}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageProperties;
