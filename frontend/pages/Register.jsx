import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../src/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div><input name="name" placeholder="Name" value={form.name} onChange={onChange}/></div>
        <div><input name="email" placeholder="Email" value={form.email} onChange={onChange}/></div>
        <div><input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange}/></div>
        <button type="submit">Register</button>
      </form>
      <h2>if u have a account</h2>
      <Link to="/login">Login</Link>
    </div>
  );
}
