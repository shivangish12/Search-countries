import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    border: "10px",
  };

  // Filter countries based on the search query with substring match
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search by country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div style={containerStyle}>
        {filteredCountries.slice(0, 3).map((country) => (
          <div key={country.cca3} className="countryCard" style={cardStyle}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
        {filteredCountries.length === 0 && <p>No matching countries found.</p>}
      </div>
    </div>
  );
}

export default App;
