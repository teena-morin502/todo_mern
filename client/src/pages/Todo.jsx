import { useEffect, useState } from "react";
import axios from "axios";
import "./../css/Todo.css";

const API = "http://localhost:4000/api/todos";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post(API, { text });
    setText("");
    console.log("Text value:", text);

    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await axios.put(`${API}/${id}`);
    fetchTodos();
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    await axios.put(`${API}/${id}/edit`, { text: editText });
    setEditingId(null);
    setEditText("");
    fetchTodos();
  };

  const completeAll = async () => {
    await axios.put(`${API}/complete-all`);
    fetchTodos();
  };

  const clearCompleted = async () => {
    await axios.delete(`${API}/clear-completed`);
    fetchTodos();
  };

  return (
    <div className="todo-container">
      <h2>📝 Todo List</h2>
      <div className="input-section">
        <input
          placeholder="Add todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="btn-group">
        <button onClick={completeAll}>Mark All Complete</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editingId === todo._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo._id)}>✅</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTodo(todo._id)}
                  className={todo.completed ? "completed" : ""}
                >
                  {todo.text}
                </span>
                <div>
                  <button onClick={() => startEdit(todo._id, todo.text)}>✏️</button>
                  <button onClick={() => deleteTodo(todo._id)}>❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
