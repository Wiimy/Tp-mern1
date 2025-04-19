import React, { useState } from "react";
import api from "../axiosConfig";

const TaskList = ({ tasks, setTasks }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditText(task.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, { title: editText });
      setTasks(tasks.map(task => task._id === id ? data.task : task));
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la modification");
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id}>
          {editingId === task._id ? (
            <div className="edit-container">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
                autoFocus
              />
              <button 
                onClick={() => saveEdit(task._id)}
                className="save-btn"
              >
                Enregistrer
              </button>
              <button 
                onClick={cancelEditing}
                className="cancel-btn"
              >
                Annuler
              </button>
            </div>
          ) : (
            <div className="task-content">
              <span>{task.title}</span>
              <div className="task-actions">
                <button 
                  onClick={() => startEditing(task)}
                  className="edit-btn"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => deleteTask(task._id)}
                  className="delete-btn"
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;