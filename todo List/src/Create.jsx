import React, { useState } from 'react';
import axios from 'axios';

function Create({ setTodos }) {
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      axios.post('http://localhost:3000/add', { todo: input })
        .then(() => {
          // Fetch todos again after adding
          fetch('http://localhost:3000/get')
            .then(res => res.json())
            .then(data => setTodos(data));
          setInput('');
        })
        .catch(error => {
          console.error('Error adding todo:', error);
        });
    }
  };

  return (
    <form className="Create_form" onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Enter TODO item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add TODO</button>
    </form>
  );
}

export default Create;
