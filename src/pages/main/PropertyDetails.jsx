import React, { useContext } from "react";
import { useParams } from "react-router";
import Loading from "../../shared/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Heading from "../../shared/Heading";
import AuthContext from "../../contexts/AuthContexts";
import { FaSearchLocation } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

const PropertyDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["single-property"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
  });

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

            <div className="flex items-center mb-2 text-sm font-semibold">
              Verification Status:
              <span className="border px-1 rounded-full ml-1 border-green-500 text-green-500">
                {" "}
                {data?.status}
              </span>
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

            <button className="btn btn-primary text-white tex-lg">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
