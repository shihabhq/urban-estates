import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../shared/Heading";
import Loading from "../../../shared/Loading";
import AllPropertiesCard from "./AllPropertiesCard";

const AllProperties = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-featured");
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
      <Heading largeHead={"All Properties"} />
      <div className="container mx-auto grid gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((property) => {
          return <AllPropertiesCard key={property._id} property={property} />;
        })}
      </div>
    </div>
  );
};

export default AllProperties;
