import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup } from "react-bootstrap"
function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<any[]>([]); // ✅ Ensure it's an array

  const submit = async () => {
    if (!task.trim()) {
      alert("Task cannot be empty!"); // Prevent empty submissions
      return;
    }
    try {
      const res = await axios.post("https://todo-app-u9pe.onrender.com/tasks", { task }); // Send as object
      console.log("task submitted", res.data);

      // ✅ Add new task to existing tasks
      setTasks((prev = []) => [...prev, res.data]);

      setTask(""); // Clear input
    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://todo-app-u9pe.onrender.com/tasks");

        setTasks(res.data); // ✅ Directly set fetched tasks
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [tasks]);

  const DT = async (id) => {
    const deleted = await axios.delete(`https://todo-app-u9pe.onrender.com/tasks/${id}`)
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  }
  return (
    <div className="App">
      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <li key={task._id} className="list-group-item li d-flex justify-content-between align-items-center">
              <span className="fw-bold">{task.task}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={() => DT(task._id)}>
                <svg data-slot="icon" fill="none" strokeWidth="1.5" className="icon w-10 h-10" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                </svg>
                <i className="bi bi-trash"></i> Delete
              </button>
            </li>
          ))
        ) : (
          <h3 className="text-center text-muted">No tasks yet...</h3>
        )}
      </ul>

      <div className="input-container mt-4">
        <input
          type="text"
          value={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTask(e.target.value)
          }
          name="task"
          id="task"
        />
        <Button onClick={submit} className="btn-sm ">Add Task</Button>
      </div>
    </div>
  );
}

export default App;
