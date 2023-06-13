import React from 'react';
import './App.scss';
import InputField from './components/InputField/InputField';
import { useState } from 'react';
import { Todo } from './model';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo('');
    }
  }

  console.log('todos', todos)
  return (
    <div className="App">
      <div className="heading"><h1>Task Ninja</h1></div>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
