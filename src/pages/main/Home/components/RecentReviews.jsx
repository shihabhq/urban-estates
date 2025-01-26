import React from "react";
import Heading from "../../../../shared/Heading";
import useAxiosNormal from "../../../../hooks/useAxiosNormal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../shared/Loading";
import ManageReviewsCard from "../../../dashboard/Admin/components/ManageReviewsCard";

const RecentReviewCard = ({ review }) => {
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center p-4">
        {/* Reviewer Image */}
        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border border-gray-300">
          <img
            src={review.user.image}
            alt="Reviewer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Reviewer Info */}
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {review.user.name}
          </h3>
          <p className="text-sm text-gray-600">
            Property: {review.propertyId.title}
          </p>
        </div>
      </div>

      {/* Review Description */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-700">{review.review}</p>
      </div>
    </div>
  );
};

const RecentReviews = () => {
  const { axiosPublic } = useAxiosNormal();
  const { data, isLoading } = useQuery({
    queryKey: ["/recent-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recent-reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <Heading largeHead={"Recent Reviews"} />
        <Loading />
      </>
    );
  }
  if (!data || data?.length === 0) {
    return (
      <>
        <Heading largeHead={"Recent Reviews"} />
        <Heading largeHead={"No Recent Reviews found!"} />;
      </>
    );
  }
  return (
    <div className="mt-32">
      <Heading largeHead={"Recent Reviews"} />
      <div className="container mx-auto grid gap-y-16 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((review) => {
          return <RecentReviewCard key={review._id} review={review} />;
        })}
      </div>
    </div>
  );
};

export default RecentReviews;
