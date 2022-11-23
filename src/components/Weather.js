import React, { useState } from "react";
import axios from "axios";

const Weather = ({ location }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getWeather = () => {
    axios.get(`https://restcountries.com/v3.1/name/${location}`).then((res) => {
      console.log(res.data);
      setLatitude(res.data.latlng[0]);
      setLongitude(res.data.latlng[1]);
      console.log(latitude, 'latitude')
      console.log(longitude, 'longitude')
    });
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${latitude}, ${longitude}` },
      headers: {
        "X-RapidAPI-Key": "5d582308cdmshae28750b7aee846p157471jsn15cdcb7db58d",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>
        <button onClick={getWeather}></button>
      </h3>
    </div>
  );
};

export default Weather;
