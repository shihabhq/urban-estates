import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../contexts/AuthContexts";
import Loading from "../../../shared/Loading";
import { useNavigate, useParams } from "react-router";
import Heading from "../../../shared/Heading";
import { useQuery } from "@tanstack/react-query";

const MakeOffer = () => {
  const { user: buyer, loading } = useContext(AuthContext);
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const [offerAmount, setOfferAmount] = useState("");
  const [offerDate] = useState(new Date().toLocaleDateString());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["single-wish"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/wish/${id}`);
      return res.data;
    },
  });

  const navigate = useNavigate();

  const handleOfferSubmit = async () => {
    if (
      parseFloat(offerAmount) < parseFloat(data.propertyId.price.min) ||
      parseFloat(offerAmount) > parseFloat(data.propertyId.price.max)
    ) {
      return toast.error(
        `Offer must be between $${data.propertyId.price.min} and $${data.propertyId.price.max}`
      );
    }

    const offerObj = {
      property: data.propertyId._id,
      buyer: {
        name: buyer.displayName,
        email: buyer.email,
      },
      offerAmount: Number(offerAmount),
      agent: {
        name: data.propertyId.agent.name,
        email: data.propertyId.agent.email,
      },
      status: "pending",
      date: offerDate,
    };
    try {
      const response = await axiosSecure.post("/make-offer", offerObj);

      if (response.status === 201) {
        await axiosSecure.delete(`/wishlist/${id}`);
        console.log(id);
        toast.success("Made offer successfully");
        navigate("/dashboard/bought");
      }
    } catch (error) {
      toast.error("Unexpected error occured while making an offer");
    }
  };

  if (loading || isLoading) return <Loading />;
  if (isError) <Heading largeHead={"No Data Found"} />;

  return (
    <div className="container mx-auto p-6">
      <Heading largeHead={"Make an offer"} />
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-medium text-gray-700">Property Title</label>
            <input
              type="text"
              value={data.propertyId?.title || ""}
              readOnly
              className="mt-2 p-2 w-full bg-gray-100 border rounded-md cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Property Location
            </label>
            <input
              type="text"
              value={data.propertyId?.location || ""}
              readOnly
              className="mt-2 p-2 w-full bg-gray-100 border rounded-md cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-medium text-gray-700">Agent Name</label>
          <input
            type="text"
            value={data.propertyId?.agent?.name || ""}
            readOnly
            className="mt-2 p-2 w-full bg-gray-100 border rounded-md cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="font-medium text-gray-700">Offer Amount</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder={`Enter amount between $${data.propertyId?.price.min} and $${data.propertyId?.price.max}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-medium text-gray-700">Buyer Name</label>
            <input
              type="text"
              value={buyer?.displayName || ""}
              readOnly
              className="mt-2 p-2 w-full bg-gray-100 border rounded-md cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Buyer Email</label>
            <input
              type="email"
              value={buyer?.email || ""}
              readOnly
              className="mt-2 p-2 w-full bg-gray-100 border rounded-md cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Buying Date
          </label>
          <input
            type="text"
            value={offerDate}
            readOnly
            className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleOfferSubmit}
            className="bg-btncol text-white px-6 py-2 rounded-md hover:bg-inherit border border-btncol hover:text-btncol transition-all">
            Make Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeOffer;
