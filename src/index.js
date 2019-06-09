import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App/App';
import {TodoList, TodoBook} from './model';

import todos from './todos.json';
import users from './users.json';

const todoBook = new TodoBook(TodoList.createLists(users, todos));

ReactDOM.render(<App todoBook={todoBook} users={users} />, document.getElementById('app-root'));
