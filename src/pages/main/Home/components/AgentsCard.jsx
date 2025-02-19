import React from "react";
import Heading from "../../../../shared/Heading";
import agent1 from "../../../../assets/agents/Hasib.png";
import agent2 from "../../../../assets/agents/Adnan.png";
import agent3 from "../../../../assets/agents/Miraz.png";
import agent4 from "../../../../assets/agents/Zabir.png";

const AgentCard = ({ name, title, src }) => {
  return (
    <div className="card bg-base-100 max-w-96 font-poppins mx-auto shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-4xl font-Roboto">{name}</h2>
        <p>{title}</p>
      </div>
      <figure>
        <img className="w-full" src={src} alt="Chef" />
      </figure>
    </div>
  );
};

const Agents = () => {
  return (
    <div className="mt-40">
      <Heading largeHead={"Our Trusted Agents"} />
      <div className="container mx-auto my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AgentCard name="Hasib Omor" title="2nd Class Broker" src={agent1} />
        <AgentCard name="Adnan Kibria" title="1st Class Agent" src={agent2} />
        <AgentCard name="Miraz Hasan" title="Master Agent" src={agent3} />
        <AgentCard name="Zabir Minhaz" title="Master Agent" src={agent4} />
      </div>
    </div>
  );
};

export default Agents;
