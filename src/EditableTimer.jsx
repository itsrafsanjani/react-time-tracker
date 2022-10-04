import React, { useState } from 'react'
import { Timer } from './Timer'
import { TimerForm } from './TimerForm'

export const EditableTimer = ({
  timer,
  onFormSubmit,
  onTrashClick,
  onStartClick,
  onStopClick,
}) => {
  const [editFormOpen, setEditFormOpen] = useState(false)

  const handleEditClick = () => {
    openForm()
  }

  const handleFormClose = () => {
    closeForm()
  }

  const handleSubmit = (timer) => {
    onFormSubmit(timer)
    closeForm()
  }

  const closeForm = () => {
    setEditFormOpen(false)
  }

  const openForm = () => {
    setEditFormOpen(true)
  }

  if (editFormOpen) {
    return (
      <TimerForm
        id={timer.id}
        title={timer.title}
        project={timer.project}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
      />
    )
    // Inside EditableTimer
  } else {
    return (
      <Timer
        timer={timer}
        onEditClick={handleEditClick}
        onTrashClick={onTrashClick}
        onStartClick={onStartClick}
        onStopClick={onStopClick}
      />
    )
  }
}
