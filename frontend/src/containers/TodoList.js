import React from "react";
import $ from "jquery";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  ButtonGroup,
} from "reactstrap";
import ReactModal from "react-modal";
import TodoModal from "../components/TodoModal";
import "./TodoList.css";

ReactModal.setAppElement("*");

class TodoList extends React.Component {
  state = {
    todos: [],
    show: false,
    modify: false,
    defaultTitle: undefined,
    defaultDesc: undefined,
    toModify: "",
  };
  // get todos list from the backend
  getData = () => {
    $.ajax({
      url: "http://localhost:8000/api/todos/",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      success: (response) => {
        this.setState({ todos: response });
      },
    });
  };

  componentDidMount() {
    this.getData();
    $(".todo-body").hide();
  }

  // change state to re-render the modal
  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
    this.resetModal();
  }

  // add todo or modify it
  addTodo = (e) => {
    e.preventDefault();
    const title = $("#title").val();
    const description = $("#description").val();
    const completed = $("#isComplete").val();
    let url = "http://localhost:8000/api/todos/";
    const type = this.state.modify ? "PUT" : "POST";
    if (!!this.state.toModify === true)
      url = url.concat(this.state.toModify).concat("/");
    $.ajax({
      type: type,
      url: url,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        title: title,
        description: description,
        completed: completed,
        user: this.props.username,
      },
      success: () => {
        this.getData();
        this.hideModal();
        this.resetModal();
      },
    });
  };

  //complete todo
  completeTodo = (e) => {
    const data = {
      title: e.title,
      description: e.description,
      completed: true,
      user: this.props.username,
    };
    $.ajax({
      url: `http://localhost:8000/api/todos/${e.id}/`,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      type: "PUT",
      data: data,
    }).done(() => this.getData());
  };

  // delete todo from the database then refreshing the list
  deleteTodo(e) {
    if (window.confirm("Are u Sure You Want To Delete It") === true) {
      $.ajax({
        url: `http://localhost:8000/api/todos/${e.id}`,
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        type: "DELETE",
        success: (data) => this.getData(),
      });
    }
  }

  // when click button modify
  openModifyModal = (e) => {
    this.showModal();
    this.setState({
      modify: true,
      defaultTitle: e.title,
      defaultDesc: e.description,
      toModify: e.id,
    });
  };

  // reset modal
  resetModal = () =>
    this.setState({
      modify: false,
      defaultTitle: undefined,
      defaultDesc: undefined,
      toModify: "",
    });

  // toggle description
  showOrHideBody(e) {
    let selector = "#" + e.id.toString() + " > .todo-body";
    console.log(selector);
    $(selector).toggle();
  }

  FetchData = () => {
    return (
      <ListGroup>
        {this.state.todos.map((e) => {
          return (
            <ListGroupItem id={e.id} key={e.id} className="todo-item">
              <Button onClick={() => this.deleteTodo(e)} close />
              <ListGroupItemHeading
                className={`todo-title ${e.completed ? "completed" : "still"}`}
                onClick={() => this.showOrHideBody(e)}
              >
                {e.title}
              </ListGroupItemHeading>
              <ListGroupItemText
                className={`todo-body ${e.completed ? "completed" : "still"}`}
              >
                {e.description}
              </ListGroupItemText>
              <Button
                color="warning"
                onClick={() => this.openModifyModal(e)}
                disabled={e.completed}
              >
                Modify
              </Button>
              <Button
                color="success"
                onClick={() => this.completeTodo(e)}
                disabled={e.completed}
              >
                Completed
              </Button>
              <ButtonGroup></ButtonGroup>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  };
  render() {
    return (
      <div className="App">
        <this.FetchData />
        <TodoModal
          modalTitle={this.state.modify ? "Modify" : undefined}
          show={this.state.show}
          hideModal={() => this.hideModal()}
          addTodo={(e) => this.addTodo(e, this.state.modify)}
          defaultTitle={this.state.defaultTitle}
          defaultDesc={this.state.defaultDesc}
        />
        <div onClick={() => this.showModal()} className="fab">
          {" "}
          +{" "}
        </div>
      </div>
    );
  }
}

export default TodoList;
