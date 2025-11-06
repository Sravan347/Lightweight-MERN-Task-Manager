import React from 'react';

export default function TaskItem({ task, onUpdate, onDelete }){
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:8, border:'1px solid #ddd', borderRadius:6, marginBottom:8 }}>
      <div>
        <strong style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>{task.title}</strong>
        <div style={{ fontSize:12, color:'#666' }}>{task.status}</div>
      </div>
      <div>
        <button onClick={() => onUpdate(task._id, { status: task.status === 'pending' ? 'completed' : 'pending' })}>
          {task.status === 'pending' ? 'Mark Done' : 'Mark Pending'}
        </button>
        <button onClick={() => {
          const newTitle = prompt('Edit title', task.title);
          if (newTitle !== null) onUpdate(task._id, { title: newTitle });
        }}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
