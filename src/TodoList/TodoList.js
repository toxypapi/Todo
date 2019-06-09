import React from 'react';

import Todo from '../Todo/Todo';
import NewTodo from '../NewTodo/NewTodo';
import {numberAsProgress} from '../utils';
import './TodoList.css';
import withProgress from '../withProgress';

function List(props) {
  return (<ul>
    {props.todos.map(todo => <li key={todo.id}><Todo {...todo} onChange={props.onTodoChange}></Todo></li>)}
  </ul>)
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedFilter: 3
    };
  }

  onTodoChange = todo => {
    this.props.todoList.updateTodo(todo);
  };

  onNewTodo = todo => {
    this.props.todoList.add(todo);
  };

  setCompletedFilter(completedFilter) {
    this.setState({completedFilter});
  };

  render() {
    const completedTodos = this.props.todoList.getCompleted(true);
    const notCompletedTodos = this.props.todoList.getCompleted(false);

    return (<div className="todo-list">
      <h3>{this.props.todoList.name} {numberAsProgress(this.props.progress)}%</h3>
      <div>
        Show
        {[[3, 'All'], [1, 'Not completed'], [2, 'Completed']].map(([filter, label]) => {
          return <button
            onClick={this.setCompletedFilter.bind(this, filter)}
            className={this.state.completedFilter === filter ? 'TodoList-activeCompletedFilter' : ''}
            key={filter}
            >{label}</button>
        })}
      </div>
      <NewTodo onNewTodo={this.onNewTodo}></NewTodo>
      {Boolean(this.state.completedFilter & 1) && <List todos={notCompletedTodos} onTodoChange={this.onTodoChange}></List>}
      {Boolean(this.state.completedFilter & 2) && <List todos={completedTodos} onTodoChange={this.onTodoChange}></List>}
    </div>);
  }
}

export default withProgress(TodoList, 'todoList');