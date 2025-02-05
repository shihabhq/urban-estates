import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../../shared/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../shared/Heading";
import AuthContext from "../../../contexts/AuthContexts";
import { FaSearchLocation } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import ButtonCovered from "../../../shared/ButtonCovered";
import ReviewModal from "./ReviewModal";
import { toast } from "react-toastify";

const PropertyDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["single-property"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
  });
  const openModal = () => {
    if (hasReviewed) {
      return toast.error("You have already reviewd this property");
    }
    setOpen(true);
  };

  const handleAddToWishlist = async () => {
    setUpdating(true);
    try {
      const wishlistObj = {
        user: user?.email,
        propertyId: data._id,
      };

      const response = await axiosSecure.post("/wishlist", wishlistObj);
      if (response.status === 201) {
        toast.success("Added to wishlist successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Failed to add to wishlist!");
      }
    } finally {
      setUpdating(false);
    }
  };

  const hasReviewed = data?.reviews.some(
    (review) => review.user.email === user?.email && review.propertyId === id
  );

  const closeModal = () => {
    setOpen(false);
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  if (isError || !data || Object.keys(data).length === 0) {
    return <Heading largeHead={"No Data Found"} />;
  }

  return (
    <div className="container mx-auto mt-8 text-black">
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 h-96 md:h-auto">
            <img
              src={data?.image}
              alt={data?.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-2 sm:p-8">
            <h2 className="text-3xl font-bold mb-4">{data?.title}</h2>
            <p className="text-btnsuccess text-lg font-medium mb-4 flex gap-1 items-center">
              {" "}
              <MdOutlineLocationOn size={24} /> {data?.location}
            </p>
            <p className="text-xl font-semibold mb-2">
              Price Range: ${data?.price.min} - ${data?.price.max}
            </p>

            <div>
              <h1 className="text-lg font-semibold">Description:</h1>
              <p className="text-gray-700 text-sm font-medium mb-3">
                {data?.description}
              </p>
            </div>


            <div>
              <h1 className="text-sm font-semibold">Agent:</h1>
              <div className="flex justify-start flex-col sm:flex-row items-center gap-4 my-4">
                <img
                  src={data?.agent?.image}
                  className="w-24 h-24 rounded-full object-cover"
                  alt=""
                />
                <div className="text-sm font-semibold">
                  <h3>{data?.agent?.name}</h3>
                  <p>{data?.agent?.email}</p>
                </div>
              </div>
            </div>

            {user?.role === "user" ? (
              <div className="flex gap-2 items-center justify-end">
                <div onClick={handleAddToWishlist} aria-disabled={updating}>
                  <ButtonCovered>
                    {updating ? "Adding..." : "Add to Wishlist"}t
                  </ButtonCovered>
                </div>
                <div onClick={openModal}>
                  <ButtonCovered>Add a Review</ButtonCovered>
                </div>
              </div>
            ) : (
              <p className="text-sm font-bold text-red-500 text-end">
                Only loggedIn Users Can purchase
              </p>
            )}
          </div>
          <ReviewModal
            propertyId={data._id}
            user={user}
            isOpen={open}
            onClose={closeModal}
            refetch={refetch}
          />
        </div>
      </div>
      <div className="p-8 min-h-40 border border-gray-200 mt-12 rounded-lg">
        <h1 className="text-2xl font-medium">Reviews:</h1>
        {data?.reviews.length === 0 ? (
          <h1 className="my-4 text-4xl font-poppins text-center">
            No reviews Yet
          </h1>
        ) : (
          <div className="space-y-4 mt-4">
            {data?.reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded-lg shadow-md flex items-start gap-4">
                <img
                  src={review.user.image}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{review.user.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{review.review}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
