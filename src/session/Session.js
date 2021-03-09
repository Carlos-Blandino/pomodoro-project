import React from "react";
import { minutesToDuration } from "../utils/duration";
import { secondsToDuration } from "../utils/duration";

function Session({ appData }) {
  return (
    <div
      style={{
        visibility: appData.timerStatus === "stop" ? "hidden" : "visible",
      }}
    >
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {appData.sessionLable} for {minutesToDuration(appData.durationTime)}{" "}
            minutes
          </h2>
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
              style={{
                width: `${appData.percent}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Session;
