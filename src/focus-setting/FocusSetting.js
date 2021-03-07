import React from "react";

function FocusSetting({
  focusDurationTime,
  breakDurationTime,
  setAppData,
  appData,
  timerStatus,
}) {
  const tempData = { ...appData };
  function handleFocusInsrease(event) {
    tempData.focusDurationTime = tempData.focusDurationTime + 5;
    const numRange = Math.min(60, tempData.focusDurationTime);
    tempData.durationTime = numRange;
    tempData.focusDurationTime = numRange;
    tempData.focusTimeRemaining = numRange * 60;

    setAppData({ ...tempData });
  }

  function handleFocusDecrease(event) {
    tempData.focusDurationTime = tempData.focusDurationTime - 5;
    const numRange = Math.max(5, tempData.focusDurationTime);
    tempData.durationTime = numRange;
    tempData.focusDurationTime = numRange;
    tempData.focusTimeRemaining = numRange * 60;

    setAppData({ ...tempData });
  }

  function handleBreakIncrease(event) {
    tempData.breakDurationTime = tempData.breakDurationTime + 1;
    const numRange = Math.min(15, tempData.breakDurationTime);
    tempData.durationTime = numRange;
    tempData.breakDurationTime = numRange;
    tempData.breakTimeRemaining = numRange * 60;
    setAppData({ ...tempData });
  }

  function handleBreakDecrease(event) {
    tempData.breakDurationTime = tempData.breakDurationTime - 1;
    const numRange = Math.max(1, tempData.breakDurationTime);
    tempData.durationTime = numRange;
    tempData.breakDurationTime = numRange;
    tempData.breakTimeRemaining = numRange * 60;
    setAppData({ ...tempData });
  }

  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {focusDurationTime}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              onClick={handleFocusDecrease}
              disabled={timerStatus === "stop" ? false : true}
            >
              <span className="oi oi-minus" />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              onClick={handleFocusInsrease}
              disabled={timerStatus === "stop" ? false : true}
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
              Break Duration: {breakDurationTime}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                onClick={handleBreakDecrease}
                disabled={timerStatus === "stop" ? false : true}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                onClick={handleBreakIncrease}
                disabled={timerStatus === "stop" ? false : true}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FocusSetting;
