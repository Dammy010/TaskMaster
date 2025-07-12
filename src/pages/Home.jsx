import { useEffect, useState } from "react";
import API from "../axios";
import Logout from "../components/Logout";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const editTask = async (id, data) => {
    try {
      await API.put(`/api/tasks/${id}`, data);
      fetchTasks();
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await API.put(`/api/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percentComplete = total > 0 ? Math.round((completed / total) * 100) : 0;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (["High", "Medium", "Low"].includes(filter)) return task.priority === filter;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Task Dashboard
          </h1>
         
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You’ve completed{" "}
            <span className="font-bold">{completed}</span> of{" "}
            <span className="font-bold">{total}</span> tasks (
            {percentComplete}%)
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Completed", "High", "Medium", "Low"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full border transition font-medium text-sm ${
                filter === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <TaskForm onAdd={handleTaskAdded} />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleComplete}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </div>
  );
};

export default Home;
