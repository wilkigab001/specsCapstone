import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ location }) => {
  const [latitude, setLatitude] = useState("Pre-call");
  const [longitude, setLongitude] = useState("Pre-call");
  const [weather, setWeather] = useState("");
  const api_key = "81d56d9fb17c6fe775b7cb7170a2cee3";

  const getCoordinates = () => {
    console.log(location);
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${api_key}`
      )
      .then((res) => {
        setLatitude(res.data[0].lat);
        setLongitude(res.data[0].lon);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=imperial`
      )
      .then((res) => {
        console.log("Got Weather");
        console.log(res.data);
        setWeather(res.data.main.temp);
      })
      .catch((err) => console.error(err));
  };


  useEffect(() => {
      getCoordinates();
    }, [getCoordinates]);

  return (
    <div>
      <h3>
        <p>{weather? (`${weather} degrees fahrenheit`): ("No weather available for this location")} </p>
      </h3>
    </div>
  );
};

export default Weather;
