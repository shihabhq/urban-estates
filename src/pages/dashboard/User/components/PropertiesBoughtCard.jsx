import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router";

const PropertiesBoughtCard = ({ property, agent, status, date, amount }) => {
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
        <p className="text-base font-bold">Offered Amount: {amount}</p>
        <p className="text-sm font-bold">
          Status:{" "}
          <span
            className={`px-2 py-1 rounded-full font-medium border ${
              status === "rejected"
                ? " border-red-500 text-red-500"
                : status === "pending"
                ? "border-yellow-500 text-yellow-500"
                : "border-green-500 text-green-500"
            }`}>
            {status}
          </span>
        </p>
        <div>
          <h1 className="text-sm font-semibold">Agent: {agent.name}</h1>
        </div>
        <div className="card-actions justify-end gap-3">
          {status === "accepted" && (
            <Link className="px-4 py-2 rounded-md text-btnsuccess text-sm font-semibold cursor-pointer border border-btnsuccess hover:bg-btnsuccess hover:text-white transition-all">
              Pay
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesBoughtCard;
