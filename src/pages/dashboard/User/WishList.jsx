import React, { useContext, useEffect } from "react";
import Heading from "../../../shared/Heading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../contexts/AuthContexts";
import Loading from "../../../shared/Loading";
import WishlistCard from "./components/WishlistCard";
import { toast } from "react-toastify";

const WishList = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/wishlist/${id}`);
      refetch();
      toast.success("Deleted successfully");
    } catch (e) {
      toast.error("Unexpected error occured while deleting");
    }
  };
  if (loading || isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Heading largeHead={"My Wishlists"} />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((wishlist) => {
          return (
            <WishlistCard
              handleDelete={() => handleRemove(wishlist._id)}
              property={wishlist.propertyId}
              key={wishlist._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
