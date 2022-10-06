import React, { useEffect, useState } from 'react'
import { EditableTimerList } from './EditableTimerList'
import { ToggleableTimerForm } from './ToggleableTimerForm'

export const TimersDashboard = () => {
  const [timers, setTimers] = useState([])

  useEffect(() => {
    loadTimersFromServer()
    setInterval(loadTimersFromServer, 5000)
  }, [])

  const loadTimersFromServer = () => {
    client.getTimers((serverTimers) => setTimers(serverTimers))
  }

  const handleCreateFormSubmit = (timer) => {
    createTimer(timer)
  }

  const handleEditFormSubmit = (attrs) => {
    updateTimer(attrs)
  }

  // Inside TimersDashboard
  const handleTrashClick = (timerId) => {
    deleteTimer(timerId)
  }

  const handleStartClick = (timerId) => {
    startTimer(timerId)
  }

  const handleStopClick = (timerId) => {
    stopTimer(timerId)
  }

  const createTimer = (timer) => {
    const t = helpers.newTimer(timer)
    setTimers(timers.concat(t))

    client.createTimer(t)
  }

  const updateTimer = (attrs) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === attrs.id) {
          return { ...timer, title: attrs.title, project: attrs.project }
        }
        return timer
      })
    )

    client.updateTimer(attrs)
  }

  const deleteTimer = (timerId) => {
    setTimers(timers.filter((t) => t.id !== timerId))

    client.deleteTimer({ id: timerId })
  }

  const startTimer = (timerId) => {
    const now = Date.now()

    setTimers(
      timers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, runningSince: now }
        }

        return timer
      })
    )

    client.startTimer({ id: timerId, start: now })
  }

  const stopTimer = (timerId) => {
    const now = Date.now()

    setTimers(
      timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince
          return {
            ...timer,
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          }
        }

        return timer
      })
    )

    client.stopTimer({ id: timerId, stop: now })
  }

  return (
    <div className='ui three large screen column centered grid'>
      <div className='column'>
        {/* Inside TimerDashboard.render() */}
        <EditableTimerList
          timers={timers}
          onFormSubmit={handleEditFormSubmit}
          onTrashClick={handleTrashClick}
          onStartClick={handleStartClick}
          onStopClick={handleStopClick}
        />
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
      </div>
    </div>
  )
}
