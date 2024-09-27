import './App.scss';
import { TodoList } from '../form/TodoList';


function App() {

  return (
    <section className='app'>
      <div className='app__inner'>
        <header className='app__head'>
          <h3 className='app__title'>ToDo List</h3>
          <p className='app__subtitle'>Добавляйте задачки по одной, и отмечайте выполненные</p>
        </header>
        <TodoList/>
      </div>
    </section>
  );
}

export default App;
