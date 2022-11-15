import React, {useState} from "react";
import styles from "./newPost.module.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css"
import { DateRangePicker } from "react-date-range";

const NewPost = () => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [showDate,setShowDate] = useState(false)
    
  const handleSelect = (ranges) => {
    console.log(ranges);
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  };


  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  return (
    <div className={styles.completeDiv}>
      <form>
        <input type="text" placeholder="Location" />
        <input
          type="text"
          placeholder="url of picture to show where you are going"
        />
        <input type="text" placeholder="" />
        <button type="button" onClick={() => setShowDate(!showDate)}>{showDate ? "Hide" : "Show Dates"} </button>
        {showDate && <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />}
      </form>
    </div>
  );
};

export default NewPost;