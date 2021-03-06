import React from "react";

function FocusSetting({
  durationType,
  focusDurationTime,
  breakDurationTime,
  setAppData,
  appData,
}) {
  const tempData = { ...appData };
  function handleFocusInsrease(event) {
    tempData.focusDurationTime = tempData.focusDurationTime + 5;
    const numRange = Math.min(60, tempData.focusDurationTime);
    tempData.focusDurationTime = numRange;
    setAppData({ ...tempData });
  }

  function handleFocusDecrease(event) {
    tempData.focusDurationTime = tempData.focusDurationTime - 5;
    const numRange = Math.max(5, tempData.focusDurationTime);
    tempData.focusDurationTime = numRange;
    setAppData({ ...tempData });
  }

  function handleBreakIncrease(event) {
    tempData.breakDurationTime = tempData.breakDurationTime + 1;
    const numRange = Math.min(15, tempData.breakDurationTime);
    tempData.breakDurationTime = numRange;
    setAppData({ ...tempData });
  }

  function handleBreakDecrease(event) {
    tempData.breakDurationTime = tempData.breakDurationTime - 1;
    const numRange = Math.max(1, tempData.breakDurationTime);
    tempData.breakDurationTime = numRange;
    setAppData({ ...tempData });
  }

  // const clickHandler = (event) => {
  //   const id = event.target.parentNode.getAttribute("data-testid");
  //   const tempData = { ...appData };

  //   if (id === "increase-focus" && durationType === "Focus") {
  //     tempData.focusDurationTime = tempData.focusDurationTime + 5;
  //     const numRange = Math.min(60, tempData.focusDurationTime);
  //     tempData.focusDurationTime = numRange;
  //     setAppData({ ...tempData });
  //   } else if (id === "decrease-focus" && durationType === "Focus") {
  //     tempData.focusDurationTime = tempData.focusDurationTime - 5;
  //     const numRange = Math.max(5, tempData.focusDurationTime);
  //     tempData.focusDurationTime = numRange;
  //     setAppData({ ...tempData });
  //   }
  //   if (id === "increase-break" && durationType === "Break") {
  //     tempData.breakDurationTime = tempData.breakDurationTime + 1;
  //     const numRange = Math.min(15, tempData.breakDurationTime);
  //     tempData.breakDurationTime = numRange;
  //     setAppData({ ...tempData });
  //   } else if (id === "decrease-break" && durationType === "Break") {
  //     tempData.breakDurationTime = tempData.breakDurationTime - 1;
  //     const numRange = Math.max(1, tempData.breakDurationTime);
  //     tempData.breakDurationTime = numRange;
  //     setAppData({ ...tempData });
  //   }
  // };

  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            {/* TODO: Update this text to display the current focus session duration */}
            Focus Duration: {focusDurationTime}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              onClick={handleFocusDecrease}
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              onClick={handleFocusInsrease}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              {/* TODO: Update this text to display the current break session duration */}
              Break Duration: {breakDurationTime}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                onClick={handleBreakDecrease}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                onClick={handleBreakIncrease}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="input-group input-group-lg mb-2">
    //   <span className="input-group-text" data-testid={testId}>
    //     {durationType} Duration: {durationTime}
    //   </span>
    //   <div className="input-group-append">
    //     <button
    //       type="button"
    //       className="btn btn-secondary"
    //       data-testid={decrease}
    //       onClick={clickHandler}
    //     >
    //       <span className="oi oi-minus" onClick={clickHandler} />
    //     </button>
    //     <button
    //       type="button"
    //       className="btn btn-secondary"
    //       data-testid={increase}
    //       onClick={clickHandler}
    //     >
    //       <span className="oi oi-plus" onClick={clickHandler} />
    //     </button>
    //   </div>
    // </div>
  );
}
export default FocusSetting;
