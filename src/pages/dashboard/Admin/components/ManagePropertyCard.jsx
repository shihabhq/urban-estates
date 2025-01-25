import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router";

const ManagePropertyCard = ({ property, handleReject, handleVerify }) => {

  return (
    <tr>
      <td>{property?.title}</td>
      <td>{property?.location}</td>
      <td>{property?.agent?.name}</td>
      <td>{property?.agent?.email}</td>
      <td>
        {property?.status === "pending" ? (
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-md text-sm font-semibold cursor-pointer border border-red-700 bg-red-700 hover:bg-red-800 text-white transition-all">
              Reject
            </button>
            <button
              onClick={handleVerify}
              className="px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer border border-btnsuccess hover:bg-green-600 bg-btnsuccess  hover:text-white transition-all">
              Verify
            </button>
          </div>
        ) : property?.status === "verified" ? (
          <p className="text-sm font-semibold text-btnsuccess">Verified</p>
        ) : (
          <p className="text-sm font-semibold text-red-600">Rejected</p>
        )}
      </td>
    </tr>
  );
};

export default ManagePropertyCard;
