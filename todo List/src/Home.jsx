import React, { useEffect } from 'react';
import Create from './Create';

function Home() {
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/get')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched todos:', data);
        setTodos(data);
      })
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/delete/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleAddTodo = async (todoText) => {
    const response = await fetch('http://localhost:3000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: todoText }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="Home">
      <h2>Todo List</h2>
      <Create setTodos={setTodos} onAddTodo={handleAddTodo} />
      {todos.length === 0 ? (
        <p>No items found. Please add some!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo._id)}
                title="Delete"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
