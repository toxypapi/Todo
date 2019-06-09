import React from 'react';

export default class extends React.Component {
  state = {
    title: ''
  };

  render() {
    return (<form onSubmit={this.onSubmit}>
      <input type="text" value={this.state.title} onChange={e => {this.setState({title: e.target.value})}}/>
      <button type="submit">OK</button>
    </form>)
  }

  onSubmit = (e) => {
    this.props.onNewTodo({title: this.state.title, completed: false});
    this.setState({title: ''});
    e.preventDefault();
  };
}