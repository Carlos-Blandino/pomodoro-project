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
    focusTimeRemaining: 25,
    breakTimeRemaining: 5,
    durationType: "focus",
    sessionLable: "Focusing",
    currentTime: 0,
  };
  const [appData, setAppData] = useState({ ...initialAppData });

  let tempData = { ...appData };

  let durationTime = appData.focusDurationTime;
  let timeRemaining = appData.focusTimeRemaining;

  const handleStopButton = () => {
    tempData.timerStatus = "stop";
    setAppData({ ...initialAppData });
    setIsTimerRunning(false);
  };
  let focusTime = 0;
  let breakTime = 0;
  let session = "focus";
  // let focusTime = appData.focusTimeRemaining;
  // let breakTime = appData.breakTimeRemaining;

  //tempData.breakTimeRemaining = breakTime;
  function printFocusToScreen(num) {
    tempData.focusTimeRemaining = num;
    setAppData({ ...tempData });
    console.log("focus count", num);
    if (num < 1) {
      console.log("play sound 1");
      session = "break";
      focusTime = appData.focusTimeRemaining * 60;
      tempData.focusTimeRemaining = focusTime;
      tempData.sessionLable = "On Break";
      setAppData({ ...tempData });

      durationTime = appData.breakDurationTime;
    }
  }

  function printBreakToScreen(num) {
    tempData.breakTimeRemaining = num;

    setAppData({ ...tempData });

    console.log("break count", num);
    if (num < 1) {
      console.log("play sound 2");
      session = "focus";
      breakTime = appData.breakTimeRemaining * 60;
      tempData.breakTimeRemaining = breakTime;
      tempData.sessionLable = "Focusing";
      setAppData({ ...tempData });

      durationTime = appData.focusDurationTime;
    }
  }

  let totalTime = appData.currentTime;
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running

      if (session === "focus") {
        focusTime = appData.focusTimeRemaining;
        focusTime -= 1;
        totalTime++;
        tempData.currentTime = totalTime;
        console.log("total time", tempData.currentTime);
        setAppData({ ...tempData });

        printFocusToScreen(focusTime);
      }

      if (session === "break") {
        breakTime = appData.breakTimeRemaining;
        breakTime -= 1;

        printBreakToScreen(breakTime);
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    let tempData = { ...appData };
    if (tempData.timerStatus === "stop") {
      tempData.timerStatus = "active";
    } else if (tempData.timerStatus === "active") {
      tempData.timerStatus = "pause";
    } else {
      tempData.timerStatus = "active";
    }
    setAppData({ ...tempData });
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
                //onClick={handlePlayButton}
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
              {appData.sessionLable} for {minutesToDuration(durationTime)}{" "}
              minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(timeRemaining)} remaining
            </p>
            <h3
              style={{
                display: appData.timerStatus === "pause" ? "block" : "none",
              }}
            >
              PAUSED
            </h3>
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
                aria-valuenow={appData.currentTime} // TODO: Increase aria-valuenow as elapsed time increases
                style={{
                  width: `${(appData.currentTime / durationTime) * 100}%`,
                }} // TODO: Increase width % as elapsed time increases
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
