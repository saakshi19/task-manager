import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TaskManager.css";

const statuses = [
  { label: "Overdue", key: "OVER_DUE", className: "overdue" },
  { label: "In Progress", key: "IN_PROGRESS", className: "in-progress" },
  { label: "To do", key: "NOT_STARTED", className: "not-started" },
  { label: "Completed", key: "COMPLETED", className: "completed" }
];

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state for new task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    const authHeader = "Basic YWRtaW46YWRtaW4xMjM=";
    fetch("http://localhost:8081/manager/tasks", {
      headers: { "Authorization": authHeader }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const today = new Date();
        const categorizedTasks = data.map((task) => {
          let status = task.status;
          if (status === "COMPLETED") return { ...task, status: "COMPLETED" };

          const due = task.dueDate ? new Date(task.dueDate) : null;
          if (due && due < today) status = "OVER_DUE";
          else if (!status || status === "NOT_STARTED") status = "NOT_STARTED";
          else if (status === "IN_PROGRESS") status = "IN_PROGRESS";
          return { ...task, status };
        });
        setTasks(categorizedTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (taskToUpdate, currentStatus) => {
    const newStatus = currentStatus === "COMPLETED" ? "NOT_STARTED" : "COMPLETED";
    const updatedTask = { ...taskToUpdate, status: newStatus };

    fetch("http://localhost:8081/manager/task", {
      method: "PUT",
      headers: {
        "Authorization": "Basic YWRtaW46YWRtaW4xMjM=",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((updatedTaskResponse) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTaskResponse.id ? updatedTaskResponse : task
          )
        );
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, priority, status: "NOT_STARTED" };

    fetch("http://localhost:8081/manager/task", {
      method: "POST",
      headers: {
        "Authorization": "Basic YWRtaW46YWRtaW4xMjM=",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then((res) => res.json())
      .then((createdTask) => {
        setTasks((prev) => [...prev, createdTask]);
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority(1);
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="task-manager">
      {/* Home Button */}
      <Link to="/" className="home-btn top-left">Home</Link>

      {/* Section 1: Task Board */}
      <h1>My Tasks</h1>
      <div className="task-board">
        {statuses.map((status) => (
          <div key={status.key} className={`task-column ${status.className}`}>
            <h2>{status.label}</h2>
            {tasks
              .filter((task) => task.status === status.key)
              .map((task) => (
                <div key={task.id} className="task-card">
                  <input
                    type="checkbox"
                    checked={task.status === "COMPLETED"}
                    onChange={() => handleCheckboxChange(task, task.status)}
                  />
                  <span className="title">{task.title}</span>
                    <span className="description">{task.description}</span>
                  <span className="due-date">{task.dueDate}</span>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Section 2: Add New Task Form */}
      <h1>Add a new task</h1>
      <form className="add-task-section" onSubmit={handleAddTask}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Due Date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <label>
          Priority
          <input
            type="number"
            min="1"
            max="5"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default MyTasks;
