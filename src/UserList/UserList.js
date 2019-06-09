import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

export default function (props) {
  return <>
    <h1>Users</h1>
    <ul>
      {props.users.map(u => <li key={u.id}><NavLink to={`/todos/${u.id}`}>{u.name}</NavLink></li>)}
    </ul>
  </>
}