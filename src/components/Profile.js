import React, { useContext, useState, useCallback, useEffect } from "react";
import TravelCard from "./travelCard";
import axios from "axios";
import AuthContext from "../store/authContext";
import Weather from "./Weather";

const Profile = () => {
  const [plans, setPlans] = useState([]);
  const {userId} = useContext(AuthContext);

  const getUserPlans = useCallback(() => {
    console.log(userId, "THis is the user id");
    axios
      .get(`http://localhost:4004/plans`)
      .then((res) => {
        setPlans(res.data)
        console.log(plans)})
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getUserPlans();
  }, []);

  return (
    <div>
      Profile
      {plans.filter((plan) => userId === plan.UserId ).map((plan) => {
        return (
          <TravelCard
            key={plan.id}
            plan={plan} /> )
      })}
      {/* //<TravelCards />
      <Weather location = {plans.tripLocation}/>  */}
    </div>
  );
};

export default Profile;
