import { useContext } from "react";
import Heading from "../../../shared/Heading";
import Loading from "../../../shared/Loading";
import AuthContext from "../../../contexts/AuthContexts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyReviewsCard from "./components/MyReviewsCard";
import { toast } from "react-toastify";

const MyReviews = () => {
  const { axiosSecure } = useAxiosSecure();

  const { user, loading } = useContext(AuthContext);
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["user-reviews"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/reviews/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
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
  if (loading || isLoading) {
    return <Loading />;
  }
  if (!data || data.length === 0) {
    return <Heading largeHead={"No Reviews Yet"} />;
  }

  return (
    <div>
      <Heading largeHead={"My Reviews"} />
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {data.map((item) => {
          return (
            <MyReviewsCard
              key={item._id}
              handleDelete={() => handleDelete(item._id)}
              review={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyReviews;
