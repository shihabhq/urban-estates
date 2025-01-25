

const MyReviewsCard = ({ review,handleDelete }) => {
  const date = new Date(review.createdAt);
  return (
    <div className="min-w-full max-w-md mx-auto flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {review.propertyId.title}
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          Agent: {review.propertyId.agent.name}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Reviewed on:{" "}
          {`${date.getUTCFullYear()}-${
            date.getUTCMonth() + 1
          }-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}`}
        </p>

        <p className="mt-2 text-gray-700 text-sm">{review.review}</p>

        {/* Add mt-auto here */}
        <div className="mt-auto flex justify-end" onClick={handleDelete} >
          <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyReviewsCard;
