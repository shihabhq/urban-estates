import React, { useContext } from "react";
import AuthContext from "../../../contexts/AuthContexts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../shared/Heading";
import Loading from "../../../shared/Loading";
import { useQuery } from "@tanstack/react-query";
import SoldPropertiesCard from "./components/SoldPropertiesCard";

const SoldProperties = () => {
  const { user, loading } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["agent-sells"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/sold/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || loading) {
    return <Loading />;
  }
  if (!data || data?.length === 0) {
    return <Heading largeHead={"No Properties sold yet!"} />;
  }
  const totalSoldAmount = data.reduce((total, property) => {
    return total + property.offerAmount;
  }, 0);

  return (
    <>
      <div>
        <Heading largeHead={"Your Added Products"} />
      </div>
      <div className="w-[90%] mx-auto my-4 p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-xl font-bold">Total Amount Sold:</h2>
        <p className="text-lg text-btnsuccess font-semibold">
          ${totalSoldAmount.toFixed(2)}
        </p>
      </div>

      <div className="overflow-x-auto w-[90%] mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Property Title</th>
              <th>Location</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((property) => {
              return (
                <SoldPropertiesCard
                  key={property._id}
                  property={property.property}
                  amount={property.offerAmount}
                  buyer={property.buyer}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SoldProperties;
