import React, { useState, useCallback, useEffect } from "react";
import TravelCard from "./travelCard";
import Weather from "./Weather";
import axios from "axios";
import styles from './Home.module.css'
const Home = () => {
  const [plans, setPlans] = useState([]);

  const getUserPlan = () => {
    console.log("getting all plans");
    axios
      .get(`http://localhost:4004/plans`)
      .then((res) => setPlans(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserPlan();
  }, []);

  return (
    <div className = {styles.homeDiv}>
      {plans.map((plan) => {
        return (
          <TravelCard key={plan.id} plan={plan} getAllPlans={getUserPlan} />
        );
      })}
    </div>
  );
};

export default Home;
