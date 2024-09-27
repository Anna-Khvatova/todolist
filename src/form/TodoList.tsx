import './TodoList.scss';

import { useState, useEffect } from 'react';

interface Props {
    putTodo: (value: string) => void;
}

type Todo = {
    id: number,
    text: string,
    done: boolean
}
  

export const TodoList: React.FC = () => {
    const [value, setValue] = useState("");
    const getTodoListFromLS = () : Todo[] => {
        let todoList = localStorage.getItem('todoList');
        return todoList ? JSON.parse(todoList) : [];
    }

    const [todoList, setTodoList] = useState<Todo[]>(getTodoListFromLS());
    const [completedTodoCount, setCompletedTodoCount] = useState<number>(todoList.filter(todo => todo.done).length);
    const [editTodoId, setEditTodoId] = useState<number>(NaN);
    const [editTodoText, setEditTodoText] = useState<string>('');

    const clearTodoList = () => {
        setTodoList([]);
        setCompletedTodoCount(0);
    }

    const putTodo = (value: string) => {
        if (value) {
            setTodoList([...todoList, { id: Date.now(), text: value, done: false }]);
        } else {
            alert("Введите текст");
        }
    }

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }, [todoList]);
    
      
    
      const toggleTodo = (id: number) => {
        setTodoList(todoList.map((todo: Todo) => {
          if (todo.id === id) {
            todo.done = !todo.done;
            setCompletedTodoCount(todo.done ? completedTodoCount + 1 : completedTodoCount - 1);
          }
          return todo;
        }))
      }
    
      const deleteTodo = (id: number) => {
        setTodoList(todoList.filter((todo: Todo) => {
          if (todo.id !== id) {
            return true;
          }
          if (todo.done) setCompletedTodoCount(completedTodoCount - 1);
          return false;
        }));
      }
    
      const startEditTodo = (id: number, text: string) => {
        setEditTodoId(id);
        setEditTodoText(text);
      }
    
      const saveTodo = (id: number, text: string) => {
        setTodoList(todoList.map((todo: Todo) => {
          if (todo.id === id) todo.text = text;
          return todo;
        }))
        setEditTodoId(NaN);
        setEditTodoText('');
      }
    
      

    return (
        <div className='todo-list'>
            <form className='todo-list__form' onSubmit={e => {
                e.preventDefault();
                putTodo(value);
                setValue("");
            }}>
            <input className='todo-list__input' type='text' placeholder='Введите текст задачки..' value={value} onChange={e => setValue(e.target.value)} autoFocus />
            </form>
            <ul className='todo-list__ul'>
            {
            todoList.map((todo: Todo) => {
                if (todo.id === editTodoId) {
                return (
                    <li className={todo.done ? "todo-list__li done" : "todo-list__li"} key={todo.id}>
                    <input className='todo-list__input-edit' type="text" value={editTodoText} onChange={(e) => { setEditTodoText(e.target.value) }} autoFocus />
                    <button className='todo-list__save' onClick={e => {
                        e.stopPropagation();
                        saveTodo(todo.id, editTodoText);
                    }
                    } />
                    </li>
                );
                } else {
                return (
                    <li className={todo.done ? "todo-list__li done" : "todo-list__li"} key={todo.id} onClick={() => toggleTodo(todo.id)}>
                    <p className='todo-list__text'>{todo.text}</p>
                    <button className='todo-list__edit' onClick={e => {
                        e.stopPropagation();
                        startEditTodo(todo.id, todo.text);
                    }
                    } />
                    <button className='todo-list__delete' onClick={e => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                    }
                    } />
                    </li>
                );
                }
            })
            }
            </ul>
            <div className='todo-list__bottom'>
                <p>Всего задач: <span>{todoList.length}</span></p>
                <p>Выполнено: <span>{completedTodoCount}</span></p>
                <button className='todo-list__clear' onClick={clearTodoList}>Очистить всё</button>
            </div>
      </div>
    );
};