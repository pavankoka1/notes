import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());

// app.all("/", (req, res) => {
//     res.send("I'm up!");
// });

const todos = [
    {
        id: 1,
        title: "Todo 1",
        completed: false,
    },
    {
        id: 2,
        title: "Todo 2",
        completed: true,
    },
];

// READ
app.get("/todos", (req, res) => {
    res.json(todos);
});

// CREATE
app.post("/todos", (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json({ message: "New todo added!" });
});

// PUT
app.put("/todos/:id", (req, res) => {
    const newTodo = req.body;

    const todoIndex = todos.findIndex((td) => td.id === Number(req.params.id));

    console.log(newTodo, req.params.id, todoIndex);

    if (todoIndex !== -1) {
        todos[todoIndex] = {
            ...todos[todoIndex],
            ...newTodo,
        };

        res.status(200).json({ message: "Todo updated!" });
    } else {
        res.status(400).json({ message: "Todo with that id doesn't exist!" });
    }
});

// DELETE
app.delete("/todos/:id", (req, res) => {
    const todoIndex = todos.findIndex((td) => td.id == req.params.id);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }

    res.json({
        message: "Todo deleted!",
    });
});

const PORT = 8888;
app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});
