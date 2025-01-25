import React from "react";

const ManageReviewsCard = ({ review,handleDelete }) => {
  return (
    <div className="flex flex-col md:flex-row items-start bg-white border border-gray-200 shadow-md rounded-lg p-4 mb-4">
      {/* Reviewer Image */}
      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full border">
        <img
          src={review.user.image}
          alt="Reviewer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Review Details */}
      <div className="flex-1 md:ml-4 mt-3 md:mt-0">
        {/* Reviewer Name and Email */}
        <h3 className="text-lg font-semibold text-gray-800">
          {review.user.name}
        </h3>
        <p className="text-sm text-gray-600">{review.user.email}</p>

        {/* Review Content */}
        <p className="mt-2 text-gray-700">{review.review}</p>
      </div>

      {/* Delete Button */}
      <button onClick={handleDelete} className="mt-3 md:mt-0 md:ml-auto px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none">
        Delete
      </button>
    </div>
  );
};

export default ManageReviewsCard;
