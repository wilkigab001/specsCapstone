import React, { useState, useContext } from "react";
import styles from "./newPost.module.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import { DateRangePicker } from "react-date-range";
import axios from "axios";
import AuthContext from "../../store/authContext"
import Button from "../Button/Button"

const NewPost = () => {
  const {token, userId}= useContext(AuthContext)
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
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <div className={styles.completeDiv}>
      <form onSubmit={submitHandler}>
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
            <label htmlFor="private-status">private:</label>
            <input
              type="radio"
              name="status"
              id="private-status"
              value={true}
              onChange={(e) => setPublicStatus(e.target.value)}
              checked={true}
            />
          </div>
          <div className="radio-btn">
            <label htmlFor="public-status">public:</label>
            <input
              type="radio"
              name="status"
              id="public-status"
              value={false}
              onChange={(e) => setPublicStatus(e.target.value)}
            />
          </div>
        </div>
        <button type="button" onClick={() => setShowDate(!showDate)}>
          {showDate ? "Hide" : "Show Dates"}{" "}
        </button>
        {showDate && (
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        )}
        <Button text={"Submit"}></Button>
      </form>
    </div>
  );
};

export default NewPost;
