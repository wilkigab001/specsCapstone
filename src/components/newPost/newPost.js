import React, { useState, useContext } from "react";
import styles from "./newPost.module.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import { DateRangePicker } from "react-date-range";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
const NewPost = () => {
  const navigate = useNavigate();

  const { token, userId } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [publicStatus, setPublicStatus] = useState(true);

  const [showDate, setShowDate] = useState(false);

  const handleSelect = (ranges) => {
    console.log(ranges);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    console.log(startDate);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(
      `/plans/${userId}`,
      { location, image, startDate, endDate, publicStatus, userId },
      {
        headers: {
          authorization: token,
        },
      }
    );
    navigate("/");
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <div className={styles.completeDiv}>
      <form onSubmit={submitHandler}>
        <div className={styles.form}>
          <h2>Where Ya Going?</h2>
          <div className={styles.inputDiv}>
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
          </div>
          <div className={styles.radioBtnContainer}>
            <div className={styles.radioBtn}>
              <label htmlFor="private-status">public:</label>
              <input
                type="radio"
                name="status"
                id="private-status"
                value={true}
                onChange={(e) => setPublicStatus(e.target.value)}
              />
            </div>
            <div className={styles.radioBtn}>
              <label htmlFor="public-status">private:</label>
              <input
                type="radio"
                name="status"
                id="public-status"
                value={false}
                onChange={(e) => setPublicStatus(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttonDiv}>
            <button
              className={styles.dates}
              type="button"
              onClick={() => setShowDate(!showDate)}
            >
              {showDate ? "Hide" : "Show Dates"}{" "}
            </button>
            {showDate && (
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
              />
            )}
          </div>
          <div className={styles.buttonDiv}>
            <button text={"Submit"} className={styles.dates}>
              Create!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
