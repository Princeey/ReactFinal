import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, { text: newTodo, done: false }]);
      }
      setNewTodo('');
    }
  };

  const editTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditIndex(index);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container} className="todo-container">
      <h1 style={styles.heading}>Todo List</h1>
      <div style={styles.inputContainer} className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add new todo"
          style={styles.input}
        />
        <button style={styles.button} className="add-button" onClick={addTodo}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            <span style={styles.todoText}>{todo.text}</span>
            <div style={styles.buttonContainer}>
              <button style={styles.actionButton} onClick={() => editTodo(index)}>
                Edit
              </button>
              <button style={styles.actionButton} onClick={() => deleteTodo(index)}>
                Delete
              </button>
              <button style={styles.actionButton} onClick={() => toggleDone(index)}>
                {todo.done ? 'Undo' : 'Done'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  input: {
    flex: '1',
    padding: '8px',
    marginRight: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  todoText: {
    flex: '1',
  },
  buttonContainer: {
    display: 'inline-block',
    marginLeft: '10px',
  },
  actionButton: {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TodoList;
