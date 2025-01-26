import React from "react";

const AdvertiseRow = ({
  image,
  price,
  title,
  agent,
  id,
  handleAdvertise,
  advertised,
}) => {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="mask h-full w-16 my-auto">
            <img src={image} alt={title} />
          </div>
        </div>
      </td>
      <td>{title}</td>
      <td>
        ${price.min} - ${price.max}
      </td>
      <td>{agent}</td>
      <td>
        {advertised ? (
          <p className="text-sm font-semibold text-btnsuccess">Advertised</p>
        ) : (
          <button
            onClick={handleAdvertise}
            className="text-btnsuccess border border-btnsuccess px-3 py-2 rounded-lg text-sm font-semibold hover:text-white transition-all hover:bg-btnsuccess">
            Advertise
          </button>
        )}
      </td>
    </tr>
  );
};

export default AdvertiseRow;
