import React, { Component } from 'react';
import './Todo.css';

export default class extends Component {
  handleCheck = (e) => {
    if (this.props.onChange) {
      this.props.onChange({
        id: this.props.id,
        completed: e.target.checked,
        title: this.props.title
      });
    }
  };

  render() {
    return (<div className={`todo ${this.props.completed ? 'completed' : ''}`}>
      <label>
        <input type="checkbox" checked={this.props.completed} onChange={this.handleCheck} />
        {this.props.title}
      </label>
    </div>);
  }
}
