import React, { useState } from "react";
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

function MyTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "COMPLETED" } : task
      )
    );
  };

  return (
    <div className="task-manager">
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

export default MyTasks;
