import styles from "./TodoList.module.scss";
import TodoItem from "../TodoItem/TodoItem";
import { Todo } from "../../model";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos
}: Props) => {

  const handleRemove = (id: number, isDone: boolean) => {
    if (isDone) {
      const updatedCompletedTodos = completedTodos.filter(todo => todo.id !== id);
      setCompletedTodos(updatedCompletedTodos);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
    } else {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };
  
  return (
    <div className={styles.todolist}>
      <Droppable droppableId="todosList">
        {(provided, snapshot) => (
          <div
            className={`${snapshot.isDraggingOver ? `${styles.dragActive}` : ``} ${styles.todolist__active
              } ${styles.todolist__column}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className={styles.todolist__column__title}>Active</h2>
            <div className={styles.todos}>
              {todos.map((todo, index) => {
                return (
                  <TodoItem
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completedTaskList">
        {(provided, snapshot) => (
          <div
            className={`${snapshot.isDraggingOver ? `${styles.dragCompleted}` : ''} ${styles.todolist__completed} ${styles.todolist__column}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className={styles.todolist__column__title}>Completed</h2>
            <div className={styles.todos}>
              {completedTodos.map((todo, index) => {
                return (
                  <TodoItem
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={completedTodos}
                    setTodos={setTodos}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;