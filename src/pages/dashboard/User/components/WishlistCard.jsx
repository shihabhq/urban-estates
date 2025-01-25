import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router";

const WishlistCard = ({ property, handleDelete,id }) => {
  return (
    <div className="card card-compact mx-auto w-full bg-base-100 max-w-96 shadow-xl">
      <figure>
        <img
          className="w-full h-48 object-center object-cover
        "
          src={property?.image}
          alt={property?.title}
        />
      </figure>
      <div className="card-body flex-grow">
        <h2 className="card-title flex-grow">{property?.title}</h2>
        <p className="text-base font-bold flex items-center ">
          <MdOutlineLocationOn /> {property?.location}
        </p>
        <p className="text-base font-bold">
          Price Range: ${property?.price.min} - ${property?.price.max}
        </p>
        <p className="text-sm font-bold">
          Verification Status:{" "}
          <span
            className={`px-2 py-1 rounded-full font-medium border ${
              property?.status === "verified"
                ? "border-green-500 text-green-500"
                : property?.status === "pending"
                ? "border-yellow-500 text-yellow-500"
                : "border-red-500 text-red-500"
            }`}>
            {property?.status}
          </span>
        </p>
        <div>
          <h1 className="text-sm font-semibold">Agent:</h1>
          <div className="flex justify-center flex-col items-center gap-4 my-4">
            <img
              src={property?.agent?.image}
              className="w-24 h-24 rounded-full object-cover"
              alt=""
            />
            <div className="text-sm font-semibold">
              <h3>{property?.agent?.name}</h3>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end gap-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md text-red-500 text-sm font-semibold cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white transition-all">
            Remove
          </button>

          <Link
            to={`/dashboard/offer/${id}`}
            className="px-4 py-2 rounded-md text-btnsuccess text-sm font-semibold cursor-pointer border border-btnsuccess hover:bg-btnsuccess hover:text-white transition-all">
            Make an Offer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
