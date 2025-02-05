import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Heading from "../../../shared/Heading";
import AdvertiseRow from "./components/AdvertiseRow";

const Adverstise = () => {
  const { axiosSecure } = useAxiosSecure();
  const {
    data: properties,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/verified-properties");
      return res.data;
    },
  });

  const handleAdvertise = async (id) => {
    try {
      const res = await axiosSecure.patch(`/advertise-property/${id}`, {
        advertised: true,
      });
      refetch();
      toast.success("Advertised Successfully");
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
    <div>
      <Heading largeHead={"Advertise Properties"} />
      <div className="overflow-x-auto mx-auto px-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Property</th>
              <th>Price Range</th>
              <th>Agent Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => {
              return (
                <AdvertiseRow
                  key={property._id}
                  agent={property.agent.name}
                  id={property._id}
                  image={property.image}
                  handleAdvertise={() => handleAdvertise(property._id)}
                  price={property.price}
                  title={property.title}
                  advertised={property?.advertised}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adverstise;
