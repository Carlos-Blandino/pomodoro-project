import React from "react";

function Control({ durationType, durationTime, setAppData, appData }) {
  const clickHandler = (event) => {
    const id = event.target.parentNode.getAttribute("data-testid");
    const tempData = { ...appData };

    if (id === "increase-focus" && durationType === "Focus") {
      tempData.focusDurationTime = tempData.focusDurationTime + 5;
      const numRange = Math.min(60, tempData.focusDurationTime);
      tempData.focusDurationTime = numRange;
      setAppData({ ...tempData });
    } else if (id === "decrease-focus" && durationType === "Focus") {
      tempData.focusDurationTime = tempData.focusDurationTime - 5;
      const numRange = Math.max(5, tempData.focusDurationTime);
      tempData.focusDurationTime = numRange;
      setAppData({ ...tempData });
    }

    if (id === "increase-focus" && durationType === "Break") {
      tempData.breakDurationTime = tempData.breakDurationTime + 1;
      const numRange = Math.min(15, tempData.breakDurationTime);
      tempData.breakDurationTime = numRange;
      setAppData({ ...tempData });
    } else if (id === "decrease-focus" && durationType === "Break") {
      tempData.breakDurationTime = tempData.breakDurationTime - 1;
      const numRange = Math.max(1, tempData.breakDurationTime);
      tempData.breakDurationTime = numRange;
      setAppData({ ...tempData });
    }
  };
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        {durationType} Duration: {durationTime}
      </span>
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
        >
          <span className="oi oi-minus" onClick={clickHandler} />
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
        >
          <span className="oi oi-plus" onClick={clickHandler} />
        </button>
      </div>
    </div>
  );
}
export default Control;
