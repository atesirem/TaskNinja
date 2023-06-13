
import styles from './TodoList.module.scss';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../model';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {

  return (
    <div className={styles.todos}>
      {
        todos.map(todo => {
          return (<TodoItem todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>)
        })
      }
    </div>
  )
}

export default TodoList;