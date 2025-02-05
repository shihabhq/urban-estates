import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ReviewModal = ({ isOpen, onClose, propertyId, user, refetch }) => {
  const [review, setReview] = useState("");
  const { axiosSecure } = useAxiosSecure();

  // Handle form submission (you can adjust this based on your needs)
  const handleSubmit = async () => {
    setReview("");
    if (!review) {
      toast.error("Pleas give a valid review");
    }
    try {
      const reveiwsData = {
        propertyId: propertyId,
        user: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
        review: review,
      };
      const res = await axiosSecure.post("/reviews", reveiwsData);
      if (res.data) {
        toast.success("Review added successfully");
      }
    } catch (error) {
      toast.error("failed to add review");
    }
    onClose();
    refetch();
  };

  // Don't render the modal if isOpen is false
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 md:w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Your Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <div className="mt-2">
            <label
              htmlFor="review"
              className="block text-sm font-bold text-gray-700">
              Review:
            </label>
            <textarea
              id="review"
              name="review"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-2 w-full p-2 border border-btncol focus:border-btncol rounded-md"
              placeholder="Write your review here..."
              required
            />
          </div>

          {/* Modal Footer: Submit Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-btncol text-white py-2 px-4 rounded-lg hover:bg-[#ed8a34]">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
