import React, { Component } from "react";
import "./Todo.css";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default class Todo extends Component {
  render() {
    const { onClick, todo, onDel } = this.props;
    return (
      <div className="Todo">
        <h3 className="todo__content">{todo}</h3>
        <div className="todo__actions">
          <div className="btn btn-edit" onClick={onClick}>
            <FaPen />
          </div>
          <div className="btn btn-del" onClick={onDel}>
            <FaTrash />
          </div>
        </div>
      </div>
    );
  }
}
