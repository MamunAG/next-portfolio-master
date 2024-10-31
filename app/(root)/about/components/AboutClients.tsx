"use client";
import { useState } from "react";
import { clientsData } from "../../data/clientsData";
import { clientsHeading } from "../../data/clientsData";
import AboutClientSingle from "./AboutClientSingle";

function AboutClients() {
  const [clients, setClients] = useState(clientsData);
  return (
    <div className="container mt-10 sm:mt-20">
      <p className=" font-bold text-2xl sm:text-3xl  text-center text-primary-dark dark:text-primary-light">
        {clientsHeading}
      </p>
      <div className="flex flex-wrap gap-5 mt-8">
        {clients.map((client) => (
          <AboutClientSingle
            title={client.title}
            items={client.items}
            key={client.id}
          />
        ))}
      </div>
    </div>
  );
}

export default AboutClients;
