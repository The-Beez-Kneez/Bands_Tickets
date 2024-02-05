// BandForm.js
import React, { useState } from "react";
import parse from "html-react-parser";

function BandForm({ band, updateTicketQuantities }) {
  const [ticketQuantities, setTicketQuantities] = useState({});

  const handleQuantityChange = (ticketType, quantity) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketType]: quantity,
    }));

    // Update ticket quantities in the App component
    if (updateTicketQuantities) {
      updateTicketQuantities({
        ...ticketQuantities,
        [ticketType]: quantity,
      });
    }
  };

  const renderTicketInputs = () => {
    if (!band || !band.ticketTypes) {
      return null;
    }

    return band.ticketTypes.map((ticket) => (
      <div key={ticket.type}>
        <label>
        {/* Convert cents to dollars in total calculation */}
          {ticket.name} - ${(ticket.cost / 100)}:
          <input
            type="number"
            value={ticketQuantities[ticket.type] || 0}
            min="0"
            onChange={(e) =>
              handleQuantityChange(ticket.type, parseInt(e.target.value, 10))
            }
          />
        </label>
      </div>
    ));
  };

  const calculateTotalCost = () => {
    if (!band || !band.ticketTypes) {
      return 0;
    }

    return band.ticketTypes.reduce((total, ticket) => {
      const quantity = ticketQuantities[ticket.type] || 0;
      // Convert cents to dollars in total calculation
      return total + quantity * (ticket.cost / 100); 
    }, 0);
  };

  return (
    <div>
      <h1>{band.name}</h1>
      <p>
        Date: {band.date ? new Date(band.date).toLocaleDateString() : "N/A"}
      </p>
      <p>Location: {band.location || "N/A"}</p>
      <img src={band.imgUrl} alt={band.name} />

      {band.description_blurb && <div>{parse(band.description_blurb)}</div>}

      <h2>Ticket Types</h2>
      {renderTicketInputs()}

      <h2>Total Cost: ${calculateTotalCost()}</h2>
    </div>
  );
}

export default BandForm;
