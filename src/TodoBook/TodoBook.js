import React from 'react';
import { withRouter } from 'react-router-dom'

import TodoList from '../TodoList/TodoList';
import {numberAsProgress} from '../utils';
import './TodoBook.css';


export default class TodoBook extends React.Component {
  constructor(props) {
    super(props, 'todoBook');
    this.state = {
      progress: props.todoBook.progress
    };
  }

  _updateProgress = () => {
    this.setState({
      progress: this.props.todoBook.progress
    })
  };

  componentDidMount() {
    this.props.todoBook.subscribe(this._updateProgress);
  }

  componentWillUnmount() {
    this.props.todoBook.unsubscribe(this._updateProgress);
  }

  _onFilterChange = e => {
    this.props.history.push(`/todos/${Number.parseInt(e.target.value)}`);
  };

  render() {
    let filterUserId = Number.parseInt(this.props.route.match.params.userId);
    if (typeof(filterUserId) !== 'number' || isNaN(filterUserId)) {
      filterUserId = -1;
    }
    return (<div className="TodoBook">
      <h2>All todo lists - {numberAsProgress(this.props.todoBook.progress)}%</h2>
      <select value={this.props.route.match.params.userId} onChange={this._onFilterChange}>
        <option value="-1">-</option>
        {this.props.todoBook.todoLists.map(t => <option value={t.user.id} key={t.user.id}>{t.name}</option>)}
      </select>
      {this.props.todoBook.todoLists.map(todoList => {
        if (filterUserId === -1 || filterUserId === todoList.user.id)
          return <TodoList todoList={todoList} key={todoList.user.id}/>;
        return null;
      })}
    </div>);
  }
}