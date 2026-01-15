import React from 'react';

import { useState } from "react";
import axios from "axios";

const Contractors = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/", form);
      console.log("✅ User created:", res.data);
      alert("User created successfully!");
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      console.error("❌ Error creating user:", error);
      alert("Error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Create User</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" required />
      <input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} type="tel" required />
      <button type="submit">Submit</button>
    </form>
  );
};



export default Contractors;
