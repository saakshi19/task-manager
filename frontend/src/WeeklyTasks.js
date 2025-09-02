import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { startOfWeek, addDays, isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "./WeeklyTasks.css";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyTasks = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [weeklyGoals, setWeeklyGoals] = useState([]);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const currentWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addTask = (day, text) => {
    if (!text.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { text, done: false }]
    }));
  };

  const toggleTask = (day, index) => {
    const updatedTasks = [...tasks[day]];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks((prev) => ({
      ...prev,
      [day]: updatedTasks
    }));
  };

  const addWeeklyGoal = (text) => {
    if (!text.trim()) return;
    setWeeklyGoals([...weeklyGoals, { text, done: false }]);
  };

  const toggleWeeklyGoal = (index) => {
    const updatedGoals = [...weeklyGoals];
    updatedGoals[index].done = !updatedGoals[index].done;
    setWeeklyGoals(updatedGoals);
  };

  return (
    <div className="weekly-tasks-container">

      <div className="weekly-header-2">
        <Link to="/" className="home-btn">Home</Link>
        <h1>Weekly Tasks</h1>
      </div>

      <div className="weekly-grid">
        {weekdays.map((day, i) => (
          <div key={day} className="day-column">
            <h3>{day}</h3>
            <ul>
              {(tasks[day] || []).map((task, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(day, index)}
                  />
                  {task.text}
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask(day, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        ))}

        <div className="calendar-section">
          <h3>Week</h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) =>
              currentWeek.some((d) => isSameDay(d, date)) ? "highlight" : ""
            }
          />
        </div>

        <div className="weekly-goals">
          <h3>Weekly Goals</h3>
          <ul>
            {weeklyGoals.map((goal, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={goal.done}
                  onChange={() => toggleWeeklyGoal(index)}
                />
                {goal.text}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add weekly goal"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addWeeklyGoal(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyTasks;
