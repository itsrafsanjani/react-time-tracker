import React from 'react'
import { EditableTimer } from './EditableTimer'

export const EditableTimerList = ({
  timers,
  onFormSubmit,
  onTrashClick,
  onStartClick,
  onStopClick,
}) => {
  // Inside EditableTimerList
  const editableTimers = timers.map((timer) => (
    <EditableTimer
      key={timer.id}
      timer={timer}
      onFormSubmit={onFormSubmit}
      onTrashClick={onTrashClick}
      onStartClick={onStartClick}
      onStopClick={onStopClick}
    />
  ))
  return <div id="timers">{editableTimers}</div>
}
