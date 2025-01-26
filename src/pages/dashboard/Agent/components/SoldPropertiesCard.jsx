import React from "react";

const SoldPropertiesCard = ({property,buyer,amount}) => {
  return (
    <tr>
      <td>{property.title}</td>
      <td>{property.location}</td>
      <td>{buyer.name}</td>
      <td>{buyer.email}</td>
      <td className=" text-sm font-bold">${amount}</td>
      <td>

      </td>
    </tr>
  );
};

export default SoldPropertiesCard;
