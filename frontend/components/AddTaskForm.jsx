import React, { useState } from 'react';

export default function AddTaskForm({ onAdd }){
  const [title, setTitle] = useState('');
  const submit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  };
  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <input placeholder="New task title..." value={title} onChange={e => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
