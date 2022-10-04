import React from 'react'

export const TimerActionButton = ({
  timerIsRunning,
  onStopClick,
  onStartClick,
}) => {
  if (timerIsRunning) {
    return (
      <div
        className="ui bottom attached red basic button"
        onClick={onStopClick}
      >
        Stop
      </div>
    )
  } else {
    return (
      <div
        className="ui bottom attached green basic button"
        onClick={onStartClick}
      >
        Start
      </div>
    )
  }
}
