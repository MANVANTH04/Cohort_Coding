const express = require('express');

const app = express();
const port = 3000;

let todos = [
    { id: 1, task: 'Learn JavaScript' },
    { id: 2, task: 'Learn Express' },
    { id: 3, task: 'Build a simple app' }
];

app.use(express.json());

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`);
});