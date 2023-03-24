import React from "react";
import SearchBar from "./components/SearchBar";
import ResultDisplay from "./components/ResultDisplay";
import Location from "./components/Location";
import { TailSpin } from "react-loading-icons";
import { useState } from "react"; 
// import { AiFillAudio } from" react-icons"



import "./App.css";

function App() {
  const [ipGeoInfo, setIpGeoInfo] = useState({
    ipAddress: "",
    location: "",
    timeZone: "",
    isp: "",
    position: "",
  });

  return (
    <div className="app-container">
      <div className="background-container padding-top-100 padding-bottom-800">
        <h1 className="heading">IP Address Tracker</h1>
        <SearchBar setOnSearch={setIpGeoInfo} />
      </div>
      <ResultDisplay
        ipAddress={ipGeoInfo.ipAddress}
        location={ipGeoInfo.location}
        timeZone={ipGeoInfo.timeZone}
        isp={ipGeoInfo.isp}
      />
      {ipGeoInfo.position === "" ? (
        <div className="loading">
          <TailSpin stroke="#4d51aa" strokeWidth="4" height="4em" />
          <p style={{ color: "#4d51aa" }}>Loading...</p>
        </div>
      ) : (
        <Location position={ipGeoInfo.position} />
      )}
    </div>
  );
}

export default App;
