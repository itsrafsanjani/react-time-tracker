import React, { useEffect, useState } from 'react'
import { EditableTimerList } from './EditableTimerList'
import { ToggleableTimerForm } from './ToggleableTimerForm'

export const TimersDashboard = () => {
  const [timers, setTimers] = useState([])

  useEffect(() => {
    setTimers([
      {
        title: 'Practice squat',
        project: 'Gym Chores',
        id: '0a4a79cb-b06d-4cb1-883d-549a1e3b66d7',
        elapsed: 5456099,
        runningSince: Date.now(),
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: 'a73c1d19-f32d-4aff-b470-cea4e792406a',
        elapsed: 1273998,
        runningSince: null,
      },
    ])
  }, [])
  

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
  }

  const deleteTimer = (timerId) => {
    setTimers(timers.filter((t) => t.id !== timerId))
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
  }

  return (
    <div className="ui three large screen column centered grid">
      <div className="column">
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
