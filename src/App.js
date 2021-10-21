import React, { Component } from "react";
import "./App.css";
import Todo from "./components/Todo";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);
    // Selcect DOM
    this.inputElement = React.createRef();
    this.saveElement = React.createRef();
    this.addElement = React.createRef();

    // State
    this.state = {
      newTodo: "",
      todoItems: ["Learn ReactJS", "Learn English"],
    };

    // Bind this
    this.onShow = this.onShow.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDell = this.handleDell.bind(this);
  }

  componentDidMount() {
    this.inputElement.current.focus();
  }

  onShow(item) {
    return () => {
      this.saveElement.current.style.display = "initial";
      this.addElement.current.style.display = "none";
      this.inputElement.current.value = item;
      this.setState({
        newTodo: item,
      });
    };
  }

  onSaveClick() {
    this.addElement.current.style.display = "initial";
    this.saveElement.current.style.display = "none";
    const { newTodo, todoItems } = this.state;
    let index = this.state.todoItems.indexOf(newTodo);
    if (index >= 0) {
      if (this.inputElement.current.value !== newTodo) {
        todoItems.splice(index, 1, this.inputElement.current.value);
        this.setState({
          newTodo: "",
          tidoItems: [...todoItems],
        });
        this.inputElement.current.value = "";
        swal({
          title: "Good job!",
          text: "you have successfully updated",
          icon: "success",
        });
      } else {
        swal({
          text: "you haven't made changes yet",
          icons: "warning",
        });
        this.inputElement.current.value = "";
      }
    } else {
      swal("Error", "Sorry, todo has been deleted", "warning");
      this.inputElement.current.value = "";
    }
  }

  // Handle

  handleAdd() {
    const { todoItems } = this.state;
    const value = this.inputElement.current.value;
    if (value) {
      this.setState({
        newTodo: "",
        todoItems: [value, ...todoItems],
      });
    }
    this.inputElement.current.value = "";
    swal({
      title: "Good job!",
      text: "you have successfully added todos",
      icon: "success",
    });
  }

  handleDell(item) {
    return () => {
      const { todoItems } = this.state;
      let index = todoItems.indexOf(item);
      swal({
        title: "Are you sure?",
        Text: "Once deleted, you will not be able to recover this imaginary file!",
        icons: "warning",
        buttons: true,
        dangerMode: true,
      }).then((ok) => {
        if (ok) {
          todoItems.splice(index, 1);
          this.setState({
            todoItems: [...todoItems],
          });
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        }
      });
    };
  }

  render() {
    const { todoItems } = this.state;
    return (
      <div className="App">
        <div className="box__input">
          <input type="text" className="input-txt" ref={this.inputElement} />
          <input type="button" className="input-btn-add" value="Add" onClick={this.handleAdd} ref={this.addElement} />
          <input
            type="button"
            className="input-btn-save"
            value="Save"
            ref={this.saveElement}
            onClick={this.onSaveClick}
          />
        </div>
        {todoItems.map((item, index) => (
          <Todo key={index} todo={item} onClick={this.onShow(item)} onDel={this.handleDell(item)} />
        ))}
      </div>
    );
  }
}
