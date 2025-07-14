import React, { useState } from 'react';

function Create({ setTodos }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() !== '') {
      setTodos(prev => [...prev, input]);
      setInput('');
    }
  };

  return (
    <form className="Create_form" onSubmit={handleSubmit}>
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
