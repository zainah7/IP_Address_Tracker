import React from "react";
import "./SearchBar.css";
import { useState, useRef, useEffect } from "react";

const APIkey = "at_cq7NQCrvvtkIn9qdcUKOo1gZziUPc";

const SearchBar = ({ setOnSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchFormat, setSearchFormat] = useState("ipAddress");
  const [valid, setValid] = useState(true);
  const value = useRef();

  function handleSearch() {
    const inputVal = value.current.value;
    const checkResult = validateSearch(inputVal);

    if (checkResult.valid) {
      setSearchValue(inputVal);
      if (searchFormat !== checkResult.format)
        setSearchFormat(checkResult.format);
    } else {
      setValid(false);
    }
  }

  const getIPGeolocationData = async (searchFormat, searchValue) => {
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${APIkey}&${searchFormat}=${searchValue}`
      );

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(`${res.statusText}`);
      }
    } catch (err) {
      setValid(false);
    }
  };

  useEffect(() => {
    const getRequiredData = async () => {
      const data = await getIPGeolocationData(searchFormat, searchValue);

      const ipAddress = data.ip;
      const location = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
      const timeZone = `UTC${data.location.timezone}`;
      const isp = `${data.isp}`;
      const position = { lat: data.location.lat, lng: data.location.lng };

      setOnSearch((prev) => {
        return { ipAddress, location, timeZone, isp, position };
      });
    };

    getRequiredData();
  }, [searchValue]);

  return (
    <section className="flex-container">
      <div className="input-container">
        <input
          type="text"
          ref={value}
          placeholder="Search for any IP address or domain"
          onFocus={() => setValid(true)}
        />
        {valid !== true ? (
          <p className="error">
            Please enter a valid IP address or domain name
          </p>
        ) : null}
      </div>
      <button type="button" onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
          <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
        </svg>
      </button>
    </section>
  );
};

const validateSearch = (searchVal) => {
  const regExpIPAddress =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const regExpDomain = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;

  if (regExpIPAddress.test(searchVal)) {
    return { valid: true, format: "ipAddress" };
  } else if (regExpDomain.test(searchVal)) {
    return { valid: true, format: "domain" };
  } else {
    return false;
  }
};

export default SearchBar;
