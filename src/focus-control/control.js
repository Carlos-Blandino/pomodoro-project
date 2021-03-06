import React from "react";
import { minutesToDuration } from "../utils/duration";

function Control({ durationType, durationTime, setAppData, appData }) {
  const clickHandler = (event) => {
    const id = event.target.parentNode.getAttribute("data-testid");
    const tempData = { ...appData };

    if (id === "increase-focus" && durationType === "focus") {
      tempData.focusDurationTime = minutesToDuration(
        parseInt(tempData.focusDurationTime) + 5
      );
      setAppData({ ...tempData });
      console.log("data", appData.focusDurationTime);
    } else if (id === "decrease-focus" && durationType === "focus") {
      tempData.focusDurationTime = minutesToDuration(
        parseInt(tempData.focusDurationTime) - 5
      );
      setAppData({ ...tempData });
    }

    if (id === "increase-focus" && durationType === "break") {
      tempData.breakDurationTime = minutesToDuration(
        parseInt(tempData.breakDurationTime) + 5
      );
      setAppData({ ...tempData });
      console.log("data", appData.breakDurationTime);
    } else if (id === "decrease-focus" && durationType === "break") {
      tempData.breakDurationTime = minutesToDuration(
        parseInt(tempData.breakDurationTime) - 5
      );
      setAppData({ ...tempData });
    }
  };
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        {/* TODO: Update this text to display the current focus session duration */}
        {durationType} Duration: {durationTime}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
          onClick={clickHandler}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
          onClick={clickHandler}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}
export default Control;
