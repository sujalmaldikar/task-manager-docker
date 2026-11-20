
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks when the application loads
  const fetchTasks = async () => {
    try {
      setError("");
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError("Unable to load tasks. Please check the backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      await axios.post(`${API_URL}/tasks`, {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      setError("Unable to create task.");
    }
  };

  // Mark a task as completed or pending
  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (err) {
      setError("Unable to update task.");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <p>Organize your work. Get things done.</p>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat-card">
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h2>{completedCount}</h2>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h2>{tasks.length - completedCount}</h2>
            <p>Pending</p>
          </div>
        </section>

        <section className="form-section">
          <h2>Add New Task</h2>

          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <button type="submit">Add Task</button>
          </form>
        </section>

        <section className="tasks-section">
          <h2>Your Tasks</h2>

          {error && <p className="error">{error}</p>}

          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="empty">No tasks available. Add your first task!</p>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  className={`task-card ${task.completed ? "completed" : ""}`}
                  key={task.id}
                >
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description || "No description provided."}</p>
                    <span>
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      className="complete-btn"
                      onClick={() => toggleTask(task)}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
