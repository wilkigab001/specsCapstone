import React, { useContext, useState, useCallback, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import Weather from "./Weather";

const TravelCard = ({plan}) => {
  console.log(plan)
  return (
    <div>

        <h2>{plan.tripLocation}</h2>
        <h4>{plan.User.username}</h4>
        <img src={plan.tripImg} />
        <h3>{plan.startDate}</h3>
        <h3>{plan.endDate}</h3>
        {/* <Weather location={plan.tripLocation}></Weather> */}
    </div>
  );
};

export default TravelCard;
