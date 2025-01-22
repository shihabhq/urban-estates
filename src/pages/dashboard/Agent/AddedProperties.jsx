import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../contexts/AuthContexts";
import Loading from "../../../shared/Loading";
import Heading from "../../../shared/Heading";
import AddedPropertyCard from "./components/AddedPropertyCard";
import { toast } from "react-toastify";

const AddedProperties = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  console.log(user?.email);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${user.email}`); //user takes some time to come and for this the user.email is undefined or null at first. and the returned data is empty but I want the user email to be there for the query
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/properties/${id}`);
      refetch();
      toast.success("Property deleted successfully");
    } catch (e) {
      toast.error("Unexpected error occured while deleting");
    }
  };

  if (isLoading || loading) {
    return <Loading />;
  }
  if (!data || data?.length === 0) {
    return <Heading largeHead={"You have not added any properties yet!"} />;
  }
  return (
    <>
      <div>
        <Heading largeHead={"Your Added Products"} />
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.map((property) => {
          return (
            <AddedPropertyCard
              handleDelete={() => handleDelete(property._id)}
              property={property}
              key={property._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default AddedProperties;
