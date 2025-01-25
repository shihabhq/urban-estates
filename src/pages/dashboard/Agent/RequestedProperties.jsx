import React, { useContext } from "react";
import Heading from "../../../shared/Heading";
import AuthContext from "../../../contexts/AuthContexts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import { useQuery } from "@tanstack/react-query";
import RequestRow from "./components/RequestRow";
import { toast } from "react-toastify";

const RequestedProperties = () => {
  const { user, loading } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["agent-offers"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/offers/agent/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleAccept = async (id,propertyId) => {
    try {
      const response = await axiosSecure.patch(`/offer-update/${id}`, {
        status: "accepted",
        email: user.email,
        propertyId: propertyId,
      });

      if (response.status === 200) {
        refetch();
        toast.success("Offer Accepted");
      }
    } catch (error) {
 
      toast.error("there was an error while updating role");
    }
  };
  const handleReject = async (id) => {
    try {
      const response = await axiosSecure.patch(`/offer-update/${id}`, {
        status: "rejected",
      });
      if (response.status === 200) {
        refetch();
        toast.error("Offer Rejected");
      }
    } catch (error) {
      toast.error("there was an error while updating role");
    }
  };

  if (loading || isLoading) {
    return <Loading />;
  }
  if (!data || data.length === 0) {
    return <Heading largeHead={"No offer has been made"} />;
  }
  return (
    <div>
      <Heading largeHead={"Requested Properties of you"} />
      <div className="overflow-x-auto w-[90%] mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th colSpan={2} className="text-center">
                Property
              </th>
              <th colSpan={2} className="text-center">
                Buyer
              </th>
              <th rowSpan={2} className="border-l-2 text-center">
                Offered Price
              </th>
              <th rowSpan={2} className="border-l-2 text-center">
                Actions
              </th>
            </tr>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((offer) => {
              return (
                <RequestRow
                  handleReject={() => handleReject(offer._id)}
                  handleAccept={() => handleAccept(offer._id,offer.property._id)}
                  key={offer._id}
                  amount={offer.offerAmount}
                  buyer={offer.buyer}
                  property={offer.property}
                  status={offer.status}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;
