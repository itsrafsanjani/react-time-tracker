import React, { useCallback, useEffect, useState } from 'react'
import { TimerActionButton } from './TimerActionButton'

export const Timer = ({
  timer,
  onEditClick,
  onTrashClick,
  onStartClick,
  onStopClick,
}) => {
  const [, updateState] = useState()

  const forceUpdate = useCallback(() => updateState({}), [])

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 1000)
    return () => clearInterval(interval)
  })

  const handleStartClick = () => {
    onStartClick(timer.id)
  }

  const handleStopClick = () => {
    onStopClick(timer.id)
  }

  const handleTrashClick = () => {
    onTrashClick(timer.id)
  }

  const elapsedString = helpers.renderElapsedString(
    timer.elapsed,
    timer.runningSince
  )
  return (
    <div className="ui centered card">
      <div className="content">
        <div className="header">{timer.title}</div>
        <div className="meta">{timer.project}</div>
        <div className="center aligned description">
          <h2>{elapsedString}</h2>
        </div>
        <div className="extra content">
          <span className="right floated edit icon" onClick={onEditClick}>
            <i className="edit icon" />
          </span>
          <span className="right floated trash icon" onClick={handleTrashClick}>
            <i className="trash icon" />
          </span>
        </div>
      </div>
      {/* At the bottom of `Timer.render()`` */}
      <TimerActionButton
        timerIsRunning={!!timer.runningSince}
        onStartClick={handleStartClick}
        onStopClick={handleStopClick}
      />
    </div>
  )
}
