import React, { useState, useCallback, useEffect } from "react";
import TravelCard from "./travelCard";
import Weather from "./Weather";
import axios from "axios";

const Home = () => {
  const [plans, setPlans] = useState([]);

  const getAllPlans = useCallback(() => {
    console.log("getting all plans");
    axios
      .get(`http://localhost:4004/plans`)
      .then((res) => setPlans(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllPlans();
  }, []);
  return (
    <div>
      {/* <Weather></Weather> */}
      {plans.map((plan) => {
        return <TravelCard key={plan.id} plan={plan} />;
      })}
    </div>
  );
};

export default Home;
