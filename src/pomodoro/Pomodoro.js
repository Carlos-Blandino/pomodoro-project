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
    focusTimeRemaining: 25 * 60,
    breakTimeRemaining: 5 * 60,
    durationType: "focus",
    sessionLable: "Focusing",
    currentTime: 0,
    timeRemaining: 25 * 60,
    durationTime: 25,
    percent: 0,
  };
  const [appData, setAppData] = useState({ ...initialAppData });

  let tempData = { ...appData };

  const handleStopButton = () => {
    tempData.timerStatus = "stop";
    setAppData({ ...initialAppData });
    setIsTimerRunning(false);
  };

  function printFocusToScreen(newNum) {
    tempData.focusTimeRemaining = newNum;
    tempData.timeRemaining = newNum;
    setAppData({ ...tempData });
    if (newNum < 1) {
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      let session = "";
      let breakTime = 0;
      breakTime = appData.breakDurationTime * 60;
      tempData.breakTimeRemaining = breakTime;
      tempData.timeRemaining = breakTime;
      setAppData({ ...tempData });
      session = "break";
      tempData.durationType = session;
      setAppData({ ...tempData });
      tempData.sessionLable = "On Break";
      //reassign focusing for label
      tempData.durationTime = appData.breakDurationTime;

      tempData.currentTime = 0;

      setAppData({ ...tempData });
    }
  }

  function printBreakToScreen(newNum) {
    tempData.breakTimeRemaining = newNum;
    tempData.timeRemaining = newNum;

    setAppData({ ...tempData });

    if (newNum < 1) {
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      let session = "";
      let focusTime = 0;
      session = "focus";
      tempData.durationType = session;
      setAppData({ ...tempData });
      focusTime = appData.focusDurationTime * 60;
      tempData.focusTimeRemaining = focusTime;
      tempData.timeRemaining = focusTime;
      tempData.sessionLable = "Focusing";
      //reassign focusing for label
      tempData.durationTime = appData.focusDurationTime;
      tempData.currentTime = 0;

      setAppData({ ...tempData });
    }
  }

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      let session = appData.durationType;
      if (session === "focus") {
        let focusTime = 0;
        focusTime = appData.focusTimeRemaining;
        focusTime -= 1;
        tempData.currentTime++;

        tempData.percent = Math.ceil(
          (tempData.currentTime * 60) / ((tempData.durationTime * 60) / 1.6)
        );
        console.log("percent", tempData.percent);
        setAppData({ ...tempData });

        printFocusToScreen(focusTime);
      } else if (session === "break") {
        let breakTime = 0;
        breakTime = appData.breakTimeRemaining;
        breakTime -= 1;
        tempData.currentTime++;
        setAppData({ ...tempData });

        setAppData({ ...tempData });
        printBreakToScreen(breakTime);
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    let tempData = { ...appData };
    tempData.durationTime = appData.focusDurationTime;

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
              {appData.sessionLable} for{" "}
              {minutesToDuration(appData.durationTime)} minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(appData.timeRemaining)} remaining
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
                aria-valuenow={appData.percent}
                // TODO: Increase aria-valuenow as elapsed time increases
                style={{
                  width: `${appData.percent}%`,
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
