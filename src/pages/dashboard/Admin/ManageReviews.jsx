import React from "react";
import Heading from "../../../shared/Heading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading";
import ManageReviewsCard from "./components/ManageReviewsCard";
import { toast } from "react-toastify";

const ManageReviews = () => {
  const { axiosSecure } = useAxiosSecure();
  // const { user, loading } = useContext(AuthContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/all-reviews`);
      return response.data;
    },
  });
  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/review/${id}`);
      if (res.status === 200) {
        refetch();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.error("Unexpected error occured");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.length === 0) {
    return <Heading largeHead={"You have not bought anything"} />;
  }
  return (
    <div>
      <Heading largeHead={"Manage All reviews"} />
      <div className="container mx-auto px-8 grid grid-cols-1 xl:grid-cols-2  gap-4">
        {data.map((review) => {
          return (
            <ManageReviewsCard
              key={review._id}
              handleDelete={() => handleDelete(review._id)}
              review={review}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ManageReviews;
