import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./TaskManager.css";
import WeeklyTasks from "./WeeklyTasks";
import MyTasks from "./MyTasks";


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
      <Link to="/weekly" className="home-btn">Weekly Tasks</Link>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]); // start empty

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
        <Route path="/weekly" element={<WeeklyTasks />} />
      </Routes>
    </Router>
  );
}


export default App;
