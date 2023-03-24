
import React, { useEffect } from "react";
import { MapContainer, useMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "./Location.css";
import iconLocation from "../assets/icon-location.svg";

export const MyComponent = ({ center }) => {
  const map = useMap();

  const customMarkerIcon = L.icon({
    iconUrl: iconLocation,
    iconSize: [30, 40],
    iconAnchor: [20, 55],
  });

  useEffect(() => {
    map.setView(center);
  }, [center]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={customMarkerIcon} />
    </>
  );
};

const Location = ({ position }) => {
  const { lat, lng } = position;

  return (
    <>
      <section className="location-container">
        {position !== "" ? (
          <MapContainer
            center={[lat, lng]}
            zoom={13}
            zoomControl={false}
            scrollWheelZoom={true}
          >
            <MyComponent center={position} />
          </MapContainer>
        ) : null}
      </section>
    </>
  );
};

export default Location;
