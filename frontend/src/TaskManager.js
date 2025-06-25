// TaskManager.jsx
import React, { useState } from 'react';
import './TaskManager.css';


const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];
const STATUSES = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];

function categorizeTasks(tasks) {
  const today = new Date();
  const categories = {
    NOT_STARTED: [],
    IN_PROGRESS: [],
    COMPLETED: [],
    OVER_DUE: []
  };
  tasks.forEach(task => {
    const dueDate = new Date(task.dueDate);
    if (task.status === 'COMPLETED') {
      categories.COMPLETED.push(task);
    } else if (task.status === 'IN_PROGRESS') {
      categories.IN_PROGRESS.push(task);
    } else if (task.status === 'NOT_STARTED') {
      if (dueDate < today) {
        categories.OVER_DUE.push(task);
      } else {
        categories.NOT_STARTED.push(task);
      }
    }
  });
  return categories;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'LOW',
    status: 'NOT_STARTED'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) return;
    setTasks([...tasks, form]);
    setForm({ title: '', description: '', dueDate: '', priority: 'LOW', status: 'NOT_STARTED' });
  };

  const toggleComplete = (taskTitle) => {
    setTasks(tasks.map(task =>
      task.title === taskTitle
        ? { ...task, status: task.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED' }
        : task
    ));
  };

  const categorized = categorizeTasks(tasks);

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
        <select name="priority" value={form.priority} onChange={handleChange}>
          {PRIORITIES.map(p => <option key={p}>{p}</option>)}
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button type="submit">Add Task</button>
      </form>

      {Object.keys(categorized).map(category => (
        <div key={category} className="task-section">
          <h2>{category}</h2>
          {categorized[category].map(task => (
            <div key={task.title} className="task-item">
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.status === 'COMPLETED'}
                  onChange={() => toggleComplete(task.title)}
                />
                <span>
                  <strong>{task.title}</strong> | Due: {task.dueDate} | Priority: {task.priority} | Status: {task.status}
                </span>
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
