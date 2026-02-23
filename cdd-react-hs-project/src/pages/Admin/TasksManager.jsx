import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, X } from 'lucide-react';
import { getAllTaskTypes, createTaskType, deleteTaskType } from '../../services/taskTypeService';
import '../../styles/Admin.css';

const PRIORITIES = ['ALTA', 'MEDIA', 'BAJA'];

const TasksManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState('MEDIA');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTaskTypes();
        setTasks(data.map(t => ({
          id: t.id_task,
          title: t.task_description,
          description: t.task_detail || '',
          priority: t.task_priority || 'MEDIA',
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
    if (!formTitle.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const created = await createTaskType({
        task_description: formTitle.trim(),
        task_detail: formDescription.trim(),
        task_priority: formPriority,
      });
      setTasks([...tasks, {
        id: created.id_task,
        title: created.task_description,
        description: created.task_detail || formDescription.trim(),
        priority: created.task_priority || formPriority,
        completed: false,
      }]);
      setFormTitle('');
      setFormDescription('');
      setFormPriority('MEDIA');
      setShowForm(false);
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

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const getPriorityClass = (priority) => {
    switch ((priority || '').toUpperCase()) {
      case 'ALTA': return 'priority-alta';
      case 'MEDIA': return 'priority-media';
      case 'BAJA': return 'priority-baja';
      default: return 'priority-media';
    }
  };

  if (loading) {
    return (
      <div className="admin-section">
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
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label" style={{ textTransform: 'none' }}>Total Tareas</p>
          <p className="stat-value">{tasks.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label" style={{ textTransform: 'none' }}>Pendientes</p>
          <p className="stat-value" style={{ color: '#fbbf24' }}>{pendingTasks.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label" style={{ textTransform: 'none' }}>Completadas</p>
          <p className="stat-value">{completedTasks.length}</p>
        </div>
      </div>

      {/* Button nueva tarea */}
      <div>
        <button
          className="btn-nueva-tarea-main"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Nueva Tarea
        </button>
      </div>

      {/* Form nueva tarea */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="task-form-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="task-form-header">
              <h3>Nueva Tarea</h3>
              <button className="btn-close-form" onClick={() => setShowForm(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="task-form-fields">
              <input
                type="text"
                className="task-form-input"
                placeholder="Título de la tarea..."
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddTask()}
              />
              <input
                type="text"
                className="task-form-input"
                placeholder="Descripción (opcional)..."
                value={formDescription}
                onChange={e => setFormDescription(e.target.value)}
              />
              <div className="task-form-row">
                <div className="task-priority-select">
                  {PRIORITIES.map(p => (
                    <button
                      key={p}
                      className={`priority-btn ${getPriorityClass(p)} ${formPriority === p ? 'selected' : ''}`}
                      onClick={() => setFormPriority(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  className="btn-agregar-tarea"
                  onClick={handleAddTask}
                  disabled={!formTitle.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Creando...' : 'Agregar'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

      {/* Tareas Pendientes */}
      {pendingTasks.length > 0 && (
        <div className="tasks-group">
          <h3 className="tasks-group-title">Tareas Pendientes</h3>
          <div className="tasks-list-new">
            {pendingTasks.map((task) => (
              <motion.div
                key={task.id}
                className="task-card-new"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <button
                  className="task-checkbox-btn"
                  onClick={() => handleToggleComplete(task.id)}
                  title="Marcar como completada"
                />
                <div className="task-card-body">
                  <p className="task-card-title">{task.title}</p>
                  {task.description && (
                    <p className="task-card-desc">{task.description}</p>
                  )}
                </div>
                <div className="task-card-actions">
                  <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {(task.priority || 'MEDIA').toUpperCase()}
                  </span>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Eliminar tarea"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tareas Completadas */}
      {completedTasks.length > 0 && (
        <div className="tasks-group">
          <h3 className="tasks-group-title">Tareas Completadas</h3>
          <div className="tasks-list-new">
            {completedTasks.map((task) => (
              <motion.div
                key={task.id}
                className="task-card-new completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
              >
                <button
                  className="task-checkbox-btn checked"
                  onClick={() => handleToggleComplete(task.id)}
                  title="Desmarcar"
                />
                <div className="task-card-body">
                  <p className="task-card-title strikethrough">{task.title}</p>
                  {task.description && (
                    <p className="task-card-desc strikethrough">{task.description}</p>
                  )}
                </div>
                <div className="task-card-actions">
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Eliminar tarea"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
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
