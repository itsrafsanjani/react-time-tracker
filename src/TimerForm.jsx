import React, { useState } from 'react'

export const TimerForm = ({
  title: oldTitle,
  project: oldProject,
  id,
  onFormSubmit,
  onFormClose,
}) => {
  const [title, setTitle] = useState(oldTitle || '')
  const [project, setProject] = useState(oldProject || '')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleProjectChange = (e) => {
    setProject(e.target.value)
  }

  const handleSubmit = () => {
    onFormSubmit({
      id: id,
      title: title,
      project: project,
    })
  }

  const submitText = id ? 'Update' : 'Create'
  return (
    <div className="ui centered card">
      <div className="content">
        <div className="ui form">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="field">
            <label>Project</label>
            <input
              type="text"
              value={project}
              onChange={handleProjectChange}
            />
          </div>
          <div className="ui two bottom attached buttons">
            <button className="ui basic blue button" onClick={handleSubmit}>
              {submitText}
            </button>
            <button className="ui basic red button" onClick={onFormClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
