import React, { useEffect } from "react";
import "./App.scss";
import InputField from "./components/InputField/InputField";
import { useState } from "react";
import { Todo } from "./model";
import TodoList from "./components/TodoList/TodoList";
import { DragDropContext } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCompletedTodos = localStorage.getItem("completedTodos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTodo = { id: Date.now(), todo: todo, isDone: false };
      setTodos([...todos, newTodo]);
      setTodo("");

      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    // Reorder tasks within the same column
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "todosList") {
        const updatedTodos = Array.from(todos);
        const [draggedTodo] = updatedTodos.splice(source.index, 1);
        updatedTodos.splice(destination.index, 0, draggedTodo);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      } else if (source.droppableId === "completedTaskList") {
        const updatedCompletedTodos = Array.from(completedTodos);
        const [draggedTodo] = updatedCompletedTodos.splice(source.index, 1);
        updatedCompletedTodos.splice(destination.index, 0, draggedTodo);
        setCompletedTodos(updatedCompletedTodos);
        localStorage.setItem(
          "completedTodos",
          JSON.stringify(updatedCompletedTodos)
        );
      }
    }
    // Move tasks between columns
    else {
      if (source.droppableId === "todosList") {
        const [draggedTodo] = todos.splice(source.index, 1);
        const updatedCompletedTodos = [
          ...completedTodos,
          { ...draggedTodo, isDone: true },
        ];
        setTodos(todos);
        setCompletedTodos(updatedCompletedTodos);
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem(
          "completedTodos",
          JSON.stringify(updatedCompletedTodos)
        );
      } else if (source.droppableId === "completedTaskList") {
        const [draggedTodo] = completedTodos.splice(source.index, 1);
        const updatedTodos = [...todos, { ...draggedTodo, isDone: false }];
        setCompletedTodos(completedTodos);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="heading">
          <h1>Task Ninja</h1>
        </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          
        />
      </div>
    </DragDropContext>
  );
};

export default App;
