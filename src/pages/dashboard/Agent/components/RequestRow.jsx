import React from "react";

const RequestRow = ({
  property,
  buyer,
  amount,
  status,
  handleReject,
  handleAccept,
}) => {
  return (
    <tr>
      <td>{property.title}</td>
      <td>{property.location}</td>
      <td>{buyer.name}</td>
      <td>{buyer.email}</td>
      <td className="text-center">${amount}</td>
      <td>
        {status === "pending" ? (
          <div className="flex gap-3 items-center justify-center">
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-md text-sm font-semibold cursor-pointer border border-red-700 bg-red-700 hover:bg-red-800 text-white transition-all">
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer border border-btnsuccess hover:bg-green-600 bg-btnsuccess  hover:text-white transition-all">
              Accept
            </button>
          </div>
        ) : status === "rejected" ? (
          <h1 className="text-center text-lg font-semibold text-red-500">
            Rejected
          </h1>
        ) : (
          <h1 className="text-center text-lg font-semibold text-btnsuccess">
            Accepted
          </h1>
        )}
      </td>
    </tr>
  );
};

export default RequestRow;
