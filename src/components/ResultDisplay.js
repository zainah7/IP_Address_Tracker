import React from "react";
import "./ResultDisplay.css";

const ResultDisplay = ({ ipAddress, location, timeZone, isp }) => {
  return (
    <section className="display-container">
      <article className="grid-container">
        <h2 className="secondary-heading">IP ADDRESS</h2>
        <p className="info">{ipAddress}</p>
      </article>
      <article className="grid-container">
        <h2 className="secondary-heading">LOCATION</h2>
        <p className="info">{location}</p>
      </article>
      <article className="grid-container">
        <h2 className="secondary-heading">TIMEZONE</h2>
        <p className="info">{timeZone}</p>
      </article>
      <article className="grid-container">
        <h2 className="secondary-heading">ISP</h2>
        <p className="info">{isp}</p>
      </article>
    </section>
  );
};

export default ResultDisplay;
