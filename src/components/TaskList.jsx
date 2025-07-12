import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    dueDate: "",
    priority: "Medium",
    startTime: "",
    endTime: "",
  });

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditForm({
      title: task.title,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      priority: task.priority || "Medium",
      startTime: task.startTime || "",
      endTime: task.endTime || "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (id) => {
    try {
      await onEdit(id, editForm);
      toast.success("Task updated");
      setEditingId(null);
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await onToggle(id, completed);
      toast.success(`Marked as ${completed ? "incomplete" : "completed"}`);
    } catch (err) {
      toast.error("Failed to toggle task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const priorityStyles = {
    Low: "text-green-600 dark:text-green-400",
    Medium: "text-yellow-600 dark:text-yellow-400",
    High: "text-red-600 dark:text-red-400 font-bold",
  };

  if (tasks.length === 0)
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">
        No tasks yet.
      </p>
    );

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded shadow-sm bg-white dark:bg-gray-800"
        >
          {editingId === task._id ? (
            <div className="flex-grow w-full">
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded mb-2"
              />

              <div className="flex flex-col md:flex-row gap-2 mb-2">
                <input
                  type="date"
                  name="dueDate"
                  value={editForm.dueDate}
                  onChange={handleEditChange}
                  className="flex-1 border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <input
                  type="time"
                  name="startTime"
                  value={editForm.startTime}
                  onChange={handleEditChange}
                  className="flex-1 border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <input
                  type="time"
                  name="endTime"
                  value={editForm.endTime}
                  onChange={handleEditChange}
                  className="flex-1 border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <select
                  name="priority"
                  value={editForm.priority}
                  onChange={handleEditChange}
                  className="flex-1 border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => submitEdit(task._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-600 dark:text-gray-300 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="flex-grow cursor-pointer"
              onClick={() => handleToggle(task._id, task.completed)}
            >
              <div
                className={`text-lg flex items-center gap-2 ${
                  task.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {task.completed && (
                  <span className="text-green-500 dark:text-green-400">✔</span>
                )}
                {task.title}
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                {task.dueDate && `Due: ${format(new Date(task.dueDate), "PPP")}`}
                {task.priority && (
                  <span className={`ml-2 ${priorityStyles[task.priority]}`}>
                    [{task.priority}]
                  </span>
                )}
              </div>

              {(task.startTime || task.endTime) && (
                <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {task.startTime && `Start: ${task.startTime}`}{" "}
                  {task.endTime && `→ End: ${task.endTime}`}
                </div>
              )}
            </div>
          )}

          {editingId !== task._id && (
            <div className="flex flex-row sm:flex-col items-start sm:items-end gap-1 mt-3 sm:mt-0 sm:ml-4">
              <button
                onClick={() => startEdit(task)}
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 dark:text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
