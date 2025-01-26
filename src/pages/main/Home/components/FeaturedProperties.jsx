import { useQuery } from "@tanstack/react-query";
import useAxiosNormal from "../../../../hooks/useAxiosNormal";
import Loading from "../../../../shared/Loading";
import Heading from "../../../../shared/Heading";
import FeaturedPropertiesCard from "./FeaturedPropertiesCard";

const FeaturedProperties = () => {
  const { axiosPublic } = useAxiosNormal();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-home"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-featured", {
        params: { limit: 8 },
      });
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
    <div className="mt-40">
      <Heading largeHead={"Featured Properties"} />
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

export default FeaturedProperties;
