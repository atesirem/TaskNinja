import { useRef, useState, useEffect } from "react";
import { Todo } from "../../model";
import styles from "./TodoItem.module.scss";
import pen from "../../assets/img/pen.png";
import trash from "../../assets/img/trash.png";
import checkmark from "../../assets/img/checkmark.png";

import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleRemove: (id: number, isDone: boolean) => void;

}

const TodoItem = ({ todo, todos, setTodos, index, handleRemove }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // function handleDone(id: number) {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  //     )
  //   );
  // }

  function handleRemovedItem(id: number) {
    handleRemove(id, todo.isDone);
  }

  function handleEditedText(e: React.FormEvent, id: number) {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  }

  function handleEdit() {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  }

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className={styles.todos__item}
          onSubmit={(e) => {
            handleEditedText(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.todos__item__actions}>
            <button
              type="button"
              className={styles.todos__item__actions__button}
            >
              <img
                src={pen}
                alt="edit"
                className={styles.icons}
                onClick={handleEdit}
              />
            </button>
            <button
              type="button"
              className={styles.todos__item__actions__button}
              onClick={() => handleRemovedItem(todo.id)}
            >
              <img src={trash} alt="delete" className={styles.icons} />
            </button>
            {/* <button
              type="button"
              className={styles.todos__item__actions__button}
            >
              <img
                src={checkmark}
                alt="check"
                className={styles.icons}
                onClick={() => {
                  handleDone(todo.id);
                }}
              />
            </button> */}
          </div>
          {edit ? (
            <div className={styles.todos__item__edit}>
              <textarea
                ref={inputRef}
                value={editTodo}
                onChange={(e) => {
                  setEditTodo(e.target.value);
                }}
                className={styles.todos__item__edit__textarea}
              />
              <button
                id="saveButton"
                className={styles.todos__item__edit__button}
              >
                Save
              </button>
            </div>
          ) : (
            <p className={styles.todos__item__text}>{todo.todo}</p>
          )}
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;

