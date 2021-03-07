import React, { useState } from "react";
import FocusSetting from "../focus-setting/FocusSetting";
import classNames from "../utils/class-names";
import { minutesToDuration } from "../utils/duration";
import { secondsToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const initialAppData = {
    focusDurationTime: 25,
    breakDurationTime: 5,
    timerStatus: "stop",
    timeRemaining: 25 * 60,
    durationType: "focus",
  };

  const handlePlayButton = () => {
    // tempData.timerStatus = "active";
    // switch (tempData.timerStatus) {
    //   case "active":
    //     tempData.durationType = "pause";
    //     break;
    //   case "pause":
    //     tempData.durationType = "active";
    //     break;
    //   default:
    //     tempData.durationType = "stop";
    // }
    // setAppData({ ...tempData });
  };

  const handleStopButton = () => {
    tempData.timerStatus = "stop";
    setAppData({ ...initialAppData });
    setIsTimerRunning(false);
  };

  const [appData, setAppData] = useState({ ...initialAppData });
  let num = 0;
  let tempData = { ...appData };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (appData.timeRemaining > 0) {
        const tempData = { ...appData };
        let countDown = appData.timeRemaining - 1;
        tempData.timeRemaining = countDown;
        setAppData({ ...tempData });
      } else {
        const tempData = { ...appData };
        tempData.timeRemaining = countDown;
        let countDown = appData.timeRemaining - 1;
        tempData.timeRemaining = countDown;
        setAppData({ ...tempData });
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <FocusSetting
        appData={appData}
        durationType="Focus"
        focusDurationTime={minutesToDuration(appData.focusDurationTime)}
        breakDurationTime={minutesToDuration(appData.breakDurationTime)}
        setAppData={setAppData}
        testId="duration-focus"
        decrease="decrease-focus"
        increase="increase-focus"
        timerStatus={appData.timerStatus}
      />
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
                onClick={handlePlayButton}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
            >
              <span className="oi oi-media-stop" onClick={handleStopButton} />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          visibility: appData.timerStatus === "stop" ? "hidden" : "visible",
        }}
      >
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
              Focusing for {minutesToDuration(appData.focusDurationTime)}{" "}
              minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(appData.timeRemaining)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Session timerStatus={appData.timerStatus} /> */}
    </div>
  );
}

export default Pomodoro;
