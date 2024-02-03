import React, { useState, useEffect } from 'react';
import BandForm from './BandForm';

function App() {
  const [selectedBand, setSelectedBand] = useState(null);

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
      {selectedBand ? <BandForm band={selectedBand} /> : <p>Select a band</p>}
    </div>
  );
}

export default App;
