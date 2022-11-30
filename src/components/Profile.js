import React, { useContext, useState, useCallback, useEffect } from "react";
import TravelCard from "./travelCard";
import axios from "axios";
import AuthContext from "../store/authContext";
import styles from "./Profile.module.css";

const Profile = () => {
  const [plans, setPlans] = useState([]);
  const authCtx = useContext(AuthContext);
  const [myWishlist, setMyWishlist] = useState([]);

  const getAllPlans = async () => {
    console.log("getting all plans");
    axios
      .get(`http://localhost:4004/userplans/${authCtx.userId}`)
      .then((res) => setPlans(res.data))
      .catch((err) => console.log(err));
  };

  const getWishlist = () => {
    console.log("getwishlist call");
    axios
      .get(`http://localhost:4004/mywishlist/${authCtx.userId}`)
      .then((res) => {
        console.log(res.data);
        setMyWishlist(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getData = async () => {
    await getAllPlans();
    getWishlist();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.aboveProfileDiv}>
      <div className={styles.profileDiv}>
        {plans.map((plan) => {
          return (
            <TravelCard key={plan.id} plan={plan} getAllPlans={getAllPlans} />
          );
        })}
      </div>
        <h2> wishlist</h2>
      <div className={styles.profileDiv}>
        {myWishlist.map((plan) => {
          return (
            <TravelCard
              key={plan.id}
              plan={plan.travelplan}
              getAllPlans={getWishlist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
