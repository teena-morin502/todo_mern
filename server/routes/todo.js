import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add
router.post("/", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Toggle Complete
router.put("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Edit text
router.put("/:id/edit", async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.findByIdAndUpdate(req.params.id, { text }, { new: true });
  res.json(todo);
});

// Complete all
router.put("/complete-all", async (req, res) => {
    console.log("PUT /complete-all called");
  await Todo.updateMany({}, { completed: true });
  res.json({ message: "All marked complete" });
});

// Clear completed
router.delete("/clear-completed", async (req, res) => {
  await Todo.deleteMany({ completed: true });
  res.json({ message: "Cleared completed todos" });
});

export default router;
