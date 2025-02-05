import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router";

const AllPropertiesCard = ({ property }) => {
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
 
        <div>
          <h1 className="text-sm font-semibold">Agent:</h1>
          <div className="flex flex-col items-center gap-4 my-2">
            <img
              src={property?.agent?.image}
              className="w-24 h-24 rounded-full object-cover"
              alt=""
            />
            <div className="text-sm font-semibold">
              <h3 className="text-base">{property?.agent?.name}</h3>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end gap-3">
          <Link
            to={`/details/${property._id}`}
            className="w-full py-3  rounded-lg text-center text-base hover:bg-btnhov transition-all font-bold bg-btncol text-white">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPropertiesCard;
