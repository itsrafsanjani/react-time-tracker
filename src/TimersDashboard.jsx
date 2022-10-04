import React from 'react'
import { EditableTimerList } from './EditableTimerList'
import { ToggleableTimerForm } from './ToggleableTimerForm'

export class TimersDashboard extends React.Component {
  state = {
    timers: [
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
    ],
  }

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer)
  }

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs)
  }

  // Inside TimersDashboard
  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId)
  }

  handleStartClick = (timerId) => {
    this.startTimer(timerId)
  }

  handleStopClick = (timerId) => {
    this.stopTimer(timerId)
  }

  createTimer = (timer) => {
    const t = helpers.newTimer(timer)
    this.setState({
      timers: this.state.timers.concat(t),
    })
  }

  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return { ...timer, title: attrs.title, project: attrs.project }
        }
        return timer
      }),
    })
  }

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter((t) => t.id !== timerId),
    })
  }

  startTimer = (timerId) => {
    const now = Date.now()

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          })
        } else {
          return timer
        }
      }),
    })
  }

  stopTimer = (timerId) => {
    const now = Date.now()

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince
          return {
            ...timer,
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          }
        }

        return timer
      }),
    })
  }

  render() {
    return (
      <div className="ui three large screen column centered grid">
        <div className="column">
          {/* Inside TimerDashboard.render() */}
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    )
  }
}
