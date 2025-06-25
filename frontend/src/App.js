import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./TaskManager.css";

const initialTasks = [
  { id: 1, title: "Submit project", dueDate: "2025-06-25", status: "OVER_DUE" },
  { id: 2, title: "Book flights", dueDate: "2025-06-30", status: "IN_PROGRESS" },
  { id: 3, title: "Buy groceries", dueDate: "2025-07-01", status: "NOT_STARTED" },
  { id: 4, title: "Plan birthday", dueDate: "2025-06-20", status: "OVER_DUE" },
  { id: 5, title: "Fix bugs", dueDate: "2025-06-28", status: "IN_PROGRESS" },
  { id: 6, title: "Read a book", dueDate: "2025-07-05", status: "NOT_STARTED" },
  { id: 7, title: "Submit report", dueDate: "2025-06-22", status: "COMPLETED" },
  { id: 8, title: "Refactor code", dueDate: "2025-06-24", status: "COMPLETED" }
];

const statuses = [
  { label: "Overdue", key: "OVER_DUE", className: "overdue" },
  { label: "In Progress", key: "IN_PROGRESS", className: "in-progress" },
  { label: "To do", key: "NOT_STARTED", className: "not-started" },
  { label: "Completed", key: "COMPLETED", className: "completed" }
];

function MyTasks({ tasks, setTasks }) {
  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "COMPLETED" } : task
      )
    );
  };

  const handleDrop = (e, newStatus) => {
    const taskId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const validTransitions = {
            NOT_STARTED: ["IN_PROGRESS"],
            IN_PROGRESS: ["NOT_STARTED"]
          };
          const allowedTargets = validTransitions[task.status] || [];
          if (allowedTargets.includes(newStatus)) {
            return { ...task, status: newStatus };
          }
        }

        return task;
      })
    );
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  return (
    <div className="task-manager">
      <Link to="/" className="home-btn top-left">Home</Link>
      <h1>My Tasks</h1>
      <div className="task-board">
        {statuses.map((status) => (
          <div
            key={status.key}
            className={`task-column ${status.className}`}
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, status.key)}
          >
            <h2>{status.label}</h2>
            {tasks
              .filter((task) => task.status === status.key)
              .map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable={task.status !== "COMPLETED"}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  <input
                    type="checkbox"
                    checked={task.status === "COMPLETED"}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <span className="title">{task.title}</span>
                  <span className="due-date">{task.dueDate}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function NewTaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, dueDate, priority, status: "NOT_STARTED" });
    navigate("/tasks");
  };

  return (
    <div className="new-task-page">
      <Link to="/" className="home-btn top-left">Home</Link>
      <h1>New Task</h1>
      <form onSubmit={handleSubmit} className="new-task-form">
        <label htmlFor="title">
          Title
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label htmlFor="description">
          Description
          <input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label htmlFor="dueDate">
          Due Date
          <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <label htmlFor="priority">
          Priority
          <input id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      <h1>Task Manager</h1>
      <Link to="/tasks" className="home-btn">View Tasks</Link>
      <Link to="/add" className="home-btn">Add New Task</Link>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask) => {
    setTasks((prev) => [
      ...prev,
      { ...newTask, id: prev.length + 1 }
    ]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<MyTasks tasks={tasks} setTasks={setTasks} />} />
        <Route path="/add" element={<NewTaskForm addTask={addTask} />} />
      </Routes>
    </Router>
  );
}

export default App;
