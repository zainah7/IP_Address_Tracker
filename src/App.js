import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from "axios";

import imgUrl from "./img/pattern-bg.png";
import MapView from "./components/MapView";
import Button from "./components/Button";
import Arrow from "./components/Arrow";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [ip, setIp] = useState("");
  const [ipData, setIpData] = useState({
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      city: "Mountain View",
      lat: 37.40599,
      lng: -122.078514,
      postalCode: "94043",
      
      timezone: "-07:00",
    },
    isp: "Google LLC",
  });

  useEffect(() => {
    const consultaAPI = async () => {
      const consulta = await axios(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_QJn9cjiNJdsmoDMPk83wQwC8ymMqG&ipAddress=${ip}`
      );
      setIpData(consulta.data);
      setIpData({
        ip: consulta.data.ip,
        location: {
          country: consulta.data.location.country,
          region: consulta.data.location.region,
          city: consulta.data.location.city,
          lat: consulta.data.location.lat,
          lng: consulta.data.location.lng,

          timezone: consulta.data.location.timezone,
        },
        domains: consulta.data.domains,
        as: consulta.data.as,
        isp: consulta.data.isp,
      });
    };
    consultaAPI();
  }, [ip]);

  function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIp(inputValue);
  };

  return (
    <>
      <Main>
        <Search>
          <Title>IP Address Tracker</Title>
          <FormWrapper>
            <Form onSubmit={handleSubmit} id="searchForm">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for any IP address or domain"
              />
            </Form>
            <Button onClick={handleSubmit} form="searchForm">
              <Arrow />
            </Button>
          </FormWrapper>
          <Details>
            <ContentDetails>
              <h2>Ip Address</h2>
              {isObjEmpty(ipData) ? "-- --" : <p>{ipData.ip}</p>}
            </ContentDetails>
            <ContentDetails>
              <h2>Location</h2>
              {isObjEmpty(ipData) ? (
                "-- --"
              ) : (
                <p>{`${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`}</p>
              )}
            </ContentDetails>
            <ContentDetails>
              <h2>Timezone</h2>
              {isObjEmpty(ipData) ? (
                "-- --"
              ) : (
                <p>{`UTC ${ipData.location.timezone}`}</p>
              )}
            </ContentDetails>
            <ContentDetails>
              <h2>ISP</h2>
              {isObjEmpty(ipData) ? "-- --" : <p>{ipData.isp}</p>}
            </ContentDetails>
          </Details>
        </Search>

        <div id="map">
          {
            /* <Map /> */
            isObjEmpty(ipData) ? (
              <h3>Chargin...</h3>
            ) : (
              <MapView
                lng={`${ipData.location.lng}`}
                lat={`${ipData.location.lat}`}
                data1={`${ipData.ip}`}
                data2={`${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`}
              />
            )
          }
        </div>
      </Main>

      <div className="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="/">Héctor Manuel Perdomo Vargas</a>.
      </div>
    </>
  );
}

export default App;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Search = styled.section`
  height: 300px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  background-image: url(${imgUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 1400px) {
    padding: 0 165px;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-weight: 500;
  font-size: 26px;
  margin-top: 180px;

  @media (min-width: 1400px) {
    font-size: 32px;
    line-height: 30px;
    margin-top: 33px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 29px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  input {
    max-width: 500px;
    width: 100%;
    height: 58px;
    border: none;
    border-radius: 15px 0 0 15px;
    margin-left: 24px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    outline: none;
    color: #2c2c2c;
  }

  @media (min-width: 1400px) {
    width: 555px;
  }
`;

const Form = styled.form`
  width: 500px;
  height: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  align-items: center;
  border-radius: 15px;
  padding: 24px;
  height: auto;
  width: 100%;
  background: #fff;
  position: relative;
  bottom: -25px;
  z-index: 9999;

  & h2 {
    font-family: Rubik;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    /* identical to box height */

    /* text-align: center; */
    letter-spacing: 1.45833px;
    text-transform: uppercase;
    opacity: 50%;

    @media (min-width: 1400) {
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 1.75px;
    }
  }

  & p {
    color: var(--veryDarkGray);
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    text-align: center;
    letter-spacing: -0.178571px;
    @media (min-width: 1400px) {
      justify-content: space-around;
      font-size: 26px;
      text-align: start;
    }
  }

  @media (min-width: 1400px) {
    flex-direction: row;
    gap: 65px;
    padding: 32px 37px;
    bottom: -55px;
  }
`;

const ContentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: center;
  align-items: center;

  @media (min-width: 1400px) {
    align-items: flex-start;
    gap: 13px;

    &:not(:first-child)::after {
      content: "";
      width: 1px;
      height: 75px;
      position: absolute;
      margin-left: -35px;
      margin-top: 10px;
      background-color: #979797;
      opacity: 25%;
    }
  }
`;
