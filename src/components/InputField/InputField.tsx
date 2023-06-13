
import styles from './InputField.module.scss';

interface Props { todo: string, setTodo: React.Dispatch<React.SetStateAction<string>>, handleAdd: (e: React.FormEvent) => void}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {

  return (
    <form className={styles.form} onSubmit={(e) => {handleAdd(e)}}>
      <input type="text" name="task" id="" placeholder='Enter a task' className={styles.form__input} value={todo} onChange={e => setTodo(e.target.value)} />
      <button className={styles.form__button} type='submit'> Go </button>
    </form>
  )
}

export default InputField;