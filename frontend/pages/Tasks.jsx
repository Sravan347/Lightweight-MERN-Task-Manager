import React, { useEffect, useState } from 'react';
import API from '../src/api';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from '../components/AddTaskForm';
import TaskItem from '../components/TaskItem';

export default function Tasks(){
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTasks();
    
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else setError('Failed to load tasks');
    }
  };

  const addTask = async (title) => {
    try {
      const res = await API.post('/tasks', { title });
      setTasks(prev => [res.data, ...prev]);
    } catch (err) {
      setError('Failed to add');
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await API.put(`/tasks/${id}`, updates);
      setTasks(prev => prev.map(t => t._id === id ? res.data : t));
    } catch (err) {
      setError('Failed to update');
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Your Tasks</h2>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <AddTaskForm onAdd={addTask} />
      {error && <div style={{color:'red'}}>{error}</div>}
      <div>
        {tasks.length === 0 ? <p>No tasks yet.</p> :
          tasks.map(task => (
            <TaskItem key={task._id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
          ))
        }
      </div>
    </div>
  );
}

