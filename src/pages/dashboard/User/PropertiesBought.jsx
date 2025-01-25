import React, { useContext } from "react";
import Heading from "../../../shared/Heading";
import { useQueries, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../contexts/AuthContexts";
import Loading from "../../../shared/Loading";
import PropertiesBoughtCard from "./components/PropertiesBoughtCard";

const PropertiesBought = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/offers/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });


  if (loading || isLoading) {
    return <Loading />;
  }
  if (!data || data.length === 0) {
    return <Heading largeHead={"You have not bought anything"} />;
  }

  return (
    <div>
      <Heading largeHead={"Properties Bought/Offered by you"} />
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((item) => {
          return (
            <PropertiesBoughtCard
              key={item._id}
              agent={item.agent}
              property={item.property}
              amount={item.offerAmount}
              date={item.date}
              status={item.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PropertiesBought;
