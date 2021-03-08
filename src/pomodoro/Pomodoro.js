import React, { useState } from "react";
import FocusSetting from "../focus-setting/FocusSetting";
import { minutesToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";
import Session from "../session/Session";
import Control from "../control/control";
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
        tempData.percent =
          (tempData.currentTime * 60) / ((tempData.durationTime * 60) / 1.7);
        setAppData({ ...tempData });
        printFocusToScreen(focusTime);
      } else if (session === "break") {
        let breakTime = 0;
        breakTime = appData.breakTimeRemaining;
        breakTime -= 1;
        tempData.currentTime++;
        tempData.percent =
          (tempData.currentTime * 60) / ((tempData.durationTime * 60) / 1.7);
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

      <Control
        handleStopButton={handleStopButton}
        isTimerRunning={isTimerRunning}
        playPause={playPause}
      />

      <Session appData={appData} />
    </div>
  );
}

export default Pomodoro;
