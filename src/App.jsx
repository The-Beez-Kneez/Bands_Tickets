// App.js
import React, { useState, useEffect } from 'react';
import BandForm from './BandForm';
import PaymentForm from './PaymentForm';
import './App.css'


function App() {
  const [selectedBand, setSelectedBand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    creditCard: '',
    expirationDate: '',
    cvv: '',
  });
  const [ticketQuantities, setTicketQuantities] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePurchase = (ticketQuantities) => {
    // Log the purchase details
    console.log('App - Purchase triggered');
    console.log('Band', selectedBand.name);
    console.log('Ticket Types and Quantities:', ticketQuantities);
  };

  const updateTicketQuantities = (newQuantities) => {
    setTicketQuantities(newQuantities);
  };

  useEffect(() => {
    if (selectedBand) {
      import(`./band-json/${selectedBand}.json`)
        .then(({ default: band }) => {
          console.log('App - selectedBand:', band);
          setSelectedBand(band);
        })
        .catch((error) => console.error(`Error loading selected band: ${selectedBand}`, error));
    }
  }, [selectedBand]);

  return (
    <div className="App">
      <select onChange={(e) => setSelectedBand(e.target.value)}>
        {/* Options are based on the available JSON files in the directory */}
        <option value="ska-band">The Flaming Potatoes</option>
        <option value="kpop-band">BTESS</option>
        <option value="punk-band">Cindy and The Scintillators</option>
      </select>
      {selectedBand ? (
        <div className="content-container">
          <div className="band-column">
            <BandForm band={selectedBand} updateTicketQuantities={updateTicketQuantities} />
          </div>
          <div className="payment-column">
            <h2>Personal Information</h2>
            <PaymentForm formData={formData} onInputChange={handleInputChange} onPurchase={() => handlePurchase(ticketQuantities)} />
          </div>
        </div>
      ) : (
        <p>Select a band</p>
      )}
    </div>
  );
}

export default App;
