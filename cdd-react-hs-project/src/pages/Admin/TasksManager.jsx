import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { getAllTaskTypes, createTaskType, deleteTaskType } from '../../services/taskTypeService';
import '../../styles/Admin.css';

const TasksManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTaskTypes();
        setTasks(data.map(t => ({
          id: t.id_task,
          description: t.task_description,
          completed: false,
        })));
      } catch (err) {
        console.error('Error cargando tareas:', err);
        setError('Error al cargar las tareas');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTaskDescription.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const created = await createTaskType({
        task_description: newTaskDescription.trim(),
      });
      setTasks([...tasks, {
        id: created.id_task,
        description: created.task_description,
        completed: false,
      }]);
      setNewTaskDescription('');
    } catch (err) {
      console.error('Error creando tarea:', err);
      alert('Error al crear la tarea.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskType(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Error eliminando tarea:', err);
      alert('Error al eliminar la tarea.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  if (loading) {
    return (
      <div className="admin-section">
        <h2 className="section-title">Gestión de Tareas</h2>
        <p style={{ color: '#9ca3af', textAlign: 'center' }}>Cargando tareas...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="admin-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="section-title">Gestión de Tareas</h2>

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

      {/* Formulario para agregar tarea */}
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          onKeyPress={handleKeyPress}
          className="task-input"
        />
        <button
          className="btn-add-task"
          onClick={handleAddTask}
          disabled={!newTaskDescription.trim() || isSubmitting}
        >
          <Plus size={18} />
          {isSubmitting ? 'Creando...' : 'Agregar'}
        </button>
      </div>

      {/* Tareas pendientes */}
      {pendingTasks.length > 0 && (
        <div className="tasks-section">
          <h3 className="tasks-subtitle">Pendientes ({pendingTasks.length})</h3>
          <div className="tasks-list">
            {pendingTasks.map((task) => (
              <motion.div
                key={task.id}
                className="task-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <button
                  className="btn-complete"
                  onClick={() => handleToggleComplete(task.id)}
                  title="Marcar como completada"
                >
                  <CheckCircle size={20} />
                </button>
                <span className="task-description">{task.description}</span>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDeleteTask(task.id)}
                  title="Eliminar tarea"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tareas completadas */}
      {completedTasks.length > 0 && (
        <div className="tasks-section completed">
          <h3 className="tasks-subtitle">Completadas ({completedTasks.length})</h3>
          <div className="tasks-list">
            {completedTasks.map((task) => (
              <motion.div
                key={task.id}
                className="task-item completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
              >
                <button
                  className="btn-complete completed"
                  onClick={() => handleToggleComplete(task.id)}
                  title="Desmarcar"
                >
                  <CheckCircle size={20} />
                </button>
                <span className="task-description strikethrough">{task.description}</span>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDeleteTask(task.id)}
                  title="Eliminar tarea"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <p className="no-results">No hay tareas. ¡Agrega la primera!</p>
      )}
    </motion.div>
  );
};

export default TasksManager;
