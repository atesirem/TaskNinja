
import { Todo } from '../../model';
import styles from './TodoItem.module.scss';
import pen from "../../assets/img/pen.png";
import trash from "../../assets/img/trash.png";
import checkmark from "../../assets/img/checkmark.png";

interface Props {
  todo: Todo;
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoItem = ({ todo, todos, setTodos }: Props) => {

  return (
    <div className={styles.todos__item}>
      <span className={styles.todos__item__text}>{todo.todo}</span>
      <div className={styles.todos__item__actions}>
        <button className={styles.todos__item__actions__button}><img src={pen} alt="edit" className={styles.icons} /></button>
        <button className={styles.todos__item__actions__button}><img src={trash} alt="delete" className={styles.icons} /></button>
        <button className={styles.todos__item__actions__button}><img src={checkmark} alt="check" className={styles.icons} /></button>
      </div>
    </div>
  )
}

export default TodoItem;