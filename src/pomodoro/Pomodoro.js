import React, { useState } from "react";
import FocusSetting from "../focus-setting/FocusSetting";
import classNames from "../utils/class-names";
import { minutesToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";
import Session from "../session/Session";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const initialAppData = {
    focusDurationTime: 25,
    breakDurationTime: 5,
    timerStatus: "stop",
  };

  const handlePlayButton = () => {
    tempData.timerStatus = "active";
    setAppData({ ...tempData });
  };

  const handleStopButton = () => {
    tempData.timerStatus = "stop";
    setAppData({ ...initialAppData });
    setIsTimerRunning(false);
  };

  const [appData, setAppData] = useState({ ...initialAppData });
  let num = 0;
  const tempData = { ...appData };
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      console.log(num++);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusSetting
            appData={appData}
            durationType="Focus"
            durationTime={minutesToDuration(appData.focusDurationTime)}
            setAppData={setAppData}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <FocusSetting
              appData={appData}
              durationType="Break"
              durationTime={minutesToDuration(appData.breakDurationTime)}
              setAppData={setAppData}
            />
          </div>
        </div>
      </div>
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
      <Session timerStatus={appData.timerStatus} />
    </div>
  );
}

export default Pomodoro;
