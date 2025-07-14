import React from 'react';
import Create from './Create'; 

function Home() {
  const [todos, setTodos] = React.useState([]);

  return (
    <div className="Home">
      <h2>TODO List</h2>
      <Create setTodos={setTodos} />
      {
        todos.length === 0 ? (
          <p>No items found. Please add some!</p>
        ) : (
          todos.map((todo, index) => (
            <div key={index}>{todo}</div>
          ))
        )
      }
    </div>
  );
}

export default Home;
