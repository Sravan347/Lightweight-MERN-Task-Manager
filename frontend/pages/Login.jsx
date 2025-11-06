import React, { useState } from 'react';

import API from '../src/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:''});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div><input name="email" placeholder="Email" value={form.email} onChange={onChange}/></div>
        <div><input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange}/></div>
        <button type="submit">Login</button>
      </form>
      <h2>you dont have any account</h2>
      <Link to="/register">Register</Link>
    </div>
  );
}
