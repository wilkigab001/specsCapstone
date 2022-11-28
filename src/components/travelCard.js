import React, { useContext, useState, useCallback, useEffect } from "react";
import Button from "./Button/Button";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import { DateRangePicker } from "react-date-range";
import axios from "axios";
import AuthContext from "../store/authContext";
import Weather from "./Weather";
import { AiFillDelete, AiOutlineStar, AiFillStar } from "react-icons/ai";
import styles from "./travelCard.module.css";

const TravelCard = ({ plan, getAllPlans }) => {
  const { token } = useContext(AuthContext);
  const authCtx = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [startDate, setStartDate] = useState(plan.startDate);
  const [endDate, setEndDate] = useState(plan.endDate);
  const [location, setLocation] = useState(plan.tripLocation);
  const [image, setImage] = useState(plan.tripImg);
  const [publicStatus, setPublicStatus] = useState(true);
  const [partOfWishlist, setPartOfWishlist] = useState(false);

  const [showDate, setShowDate] = useState(false);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      location,
      userId: authCtx.userId,
      img: image,
      startDate,
      endDate,
      publicStatus,
    };

    console.log("Hit submit handler");

    axios
      .put(`/plans/${plan.id}`, body, { headers: { authorization: token } })
      .then((res) => {
        console.log(res.data);
        setEditing(false);
        getAllPlans();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const deletePlan = (id) => {
    console.log("Before axios delete");
    axios
      .delete(`http://localhost:4004/plans/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(() => {
        getAllPlans();
        console.log("deletedPlan");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveToWishlist = () => {
    console.log("Before saving to wishlist");
    axios
      .post("/wishlist", { UserId: authCtx.userId, planId: plan.id })
      .then((res) => {
        console.log(res.data);
        console.log("success");
      })
      .catch((err) => console.log(err));
    setPartOfWishlist(!partOfWishlist);
  };

  return (
    <div className={styles.completeDiv}>
      <div className={styles.containsButton}>
        {!editing ? (
          <div className={styles.travelCard}>
            <div className={styles.star}>
              <button onClick={() => saveToWishlist()}> Save Plan</button>
            </div>
            <h2>{plan.tripLocation}</h2>
            <h4>{plan.User.username}</h4>
            <img src={plan.tripImg} />
            <h3>{plan.startDate}</h3>
            <h3>{plan.endDate}</h3>
            {/* <Weather location={plan.tripLocation}></Weather> */}
            <AiFillDelete onClick={() => deletePlan(plan.id)} />
          </div>
        ) : (
          <div>
            <form onSubmit={(e) => submitHandler(e)}>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="url of picture to show where you are going"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <div className="flex-row status-container">
                <div className="radio-btn">
                  <label htmlFor="public-status">public:</label>
                  <input
                    type="radio"
                    name="status"
                    id="public-status"
                    value={true}
                    onChange={(e) => setPublicStatus(e.target.value)}
                  />
                </div>
                <div className="radio-btn">
                  <label htmlFor="private-status">private:</label>
                  <input
                    type="radio"
                    name="status"
                    id="private-status"
                    value={false}
                    onChange={(e) => setPublicStatus(e.target.value)}
                  />
                </div>
              </div>
              <button type="button" onClick={() => setShowDate(!showDate)}>
                {showDate ? "Hide" : "Show Dates"}{" "}
              </button>
              {showDate && (
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                />
              )}
              <button>submit</button>
            </form>
          </div>
        )}

        <button onClick={() => setEditing(!editing)}>
          {editing ? "Cancel Changes" : "Make Changes"}
        </button>
      </div>
    </div>
  );
};

export default TravelCard;
