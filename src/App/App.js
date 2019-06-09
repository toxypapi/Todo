import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';

import TodoBook from '../TodoBook/TodoBook';
import UserList from '../UserList/UserList';
import SideMenu from '../SideMenu/SideMenu'; 
import withOverlay from '../withOverlay';
import './App.css';

const SideMenuWithOverlay = withOverlay(SideMenu);

class App extends Component {
  state = {
    showMenu: false
  }

  _showMenu(showMenu) {
    this.setState({ showMenu });
  }

  _renderTodoBooks = (route) => {
    return <>
      <TodoBook todoBook={this.props.todoBook} route={route}/>
      <TodoBook todoBook={this.props.todoBook} route={route}/>
    </>
  };

  render() {
    return (<div className="App">
      <header>
        <button onClick={this._showMenu.bind(this, true)}>☰</button>
      </header>
      <Router>
        <>
          <SideMenuWithOverlay showOverlay={this.state.showMenu} onHide={this._showMenu.bind(this, false)}>
            <NavLink to="/todos" activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}>Todos</NavLink>
            <NavLink to="/users" activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}>Users</NavLink>
          </SideMenuWithOverlay>
          <main>
            <Route path="/" exact render={() => <Redirect to="/todos/" />} />
            <Route path="/todos" exact render={() => <Redirect to="/todos/" />} />
            <Route path="/todos/:userId(\d*)" exact render={this._renderTodoBooks} />
            <Route path="/users/" render={() => <UserList users={this.props.users}/>} />
          </main>
        </>
      </Router>
    </div>);
  }
}

export default App;
