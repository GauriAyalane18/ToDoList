const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Modals/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get('/get', async (req, res) => {
  Todo.find()
    .then(result => res.json(result))
    .catch(error => {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/add', async (req, res) => {
  const todo = req.body.todo;
  try {
    const newTodo = new Todo({ text: todo });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
