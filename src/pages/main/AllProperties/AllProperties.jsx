import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../shared/Heading";
import Loading from "../../../shared/Loading";
import AllPropertiesCard from "./AllPropertiesCard";
import { useState } from "react";

const AllProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
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

  const filteredProperties = data
    .filter((property) =>
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "low-to-high") {
        return a.price.min - b.price.min;
      }
      if (sortOption === "high-to-low") {
        return b.price.min - a.price.min;
      }
      return 0;
    });

  return (
    <div>
      <Heading largeHead={"All Properties"} />

      <div className="container mx-auto flex gap-4 mb-8">
        <div className="mx-auto flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search by location"
            className="border rounded-md px-4 w-full py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-btncol text-sm w-full sm:text-lg bg-inherit font-semibold rounded-md px-4 py-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto grid gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => {
            return <AllPropertiesCard key={property._id} property={property} />;
          })
        ) : (
          <div className="col-span-4">
            <Heading largeHead={"No properties found"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
