import React from "react";
import Heading from "../../../../shared/Heading";
import FeaturedPropertiesCard from "./FeaturedPropertiesCard";
import Loading from "../../../../shared/Loading";
import useAxiosNormal from "../../../../hooks/useAxiosNormal";
import { useQuery } from "@tanstack/react-query";

const Advertisements = () => {
  const { axiosPublic } = useAxiosNormal();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["advertised-home"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-advertised");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data?.length === 0 || isError) {
    return <Heading largeHead={"No Properties Found"} />;
  }

  return (
    <div>
      <Heading largeHead={"Promoted Properties"} />
      <div className="container mx-auto grid gap-y-16 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((property) => {
          return (
            <FeaturedPropertiesCard key={property._id} property={property} />
          );
        })}
      </div>
    </div>
  );
};

export default Advertisements;
