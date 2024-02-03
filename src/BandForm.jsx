// BandForm.js
import React from 'react';
import parse from 'html-react-parser';

function BandForm({ band }) {
  console.log('BandForm - band:', band);
  if (!band) {
    return <p>Select a band</p>;
  }

  const { name, date, location, imgUrl, description_blurb, ticketTypes } = band;

  return (
    <div>
      <h1>{name}</h1>
      <p>Date: {date ? new Date(date).toLocaleDateString() : 'N/A'}</p>
      <p>Location: {location || 'N/A'}</p>
      <img src={imgUrl} alt={name} />

      {description_blurb && <div>{parse(description_blurb)}</div>}

      <h2>Ticket Types</h2>
      {ticketTypes &&
        ticketTypes.map((ticket, index) => (
          <div key={index}>
            <p>{ticket.name} - {ticket.description}</p>
            <p>Cost: ${ticket.cost}</p>
          </div>
        ))}
    </div>
  );
}

export default BandForm;
