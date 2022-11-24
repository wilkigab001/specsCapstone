import React, { useContext, useState, useCallback, useEffect } from "react";
import TravelCard from "./travelCard";
import axios from "axios";
import AuthContext from "../store/authContext";
import Weather from "./Weather";

const Profile = () => {
  const [plans, setPlans] = useState([]);
  const {userId} = useContext(AuthContext);

  const getAllPlans = () => {
    console.log("getting all plans");
    axios
      .get(`http://localhost:4004/userplans/${userId}`)
      .then((res) => setPlans(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <div>
      Profile
      {plans.map((plan) => {
        return (
          <TravelCard
            key={plan.id}
            plan={plan} 
            getAllPlans={getAllPlans}/> )
      })}
    </div>
  );
};

export default Profile;
