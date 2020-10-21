import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import TodoList from "./containers/TodoList";
import Access from "./containers/Access";
import NotFound from "./containers/NotFound";
import AuthRequired from "./components/AuthRequired";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_logged: localStorage.getItem("token") ? true : false,
      username: "",
    };
  }

  componentDidMount() {
    if (this.state.is_logged) {
      fetch("http://localhost:8000/todo/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({ username: json.username });
        });
    }
  }

  handleLogin = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          is_logged: true,
          username: json.user.username,
        });
      });
  };

  handleSignUp = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/todo/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          is_logged: true,
          username: json.username,
        });
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ is_logged: false, username: "" });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar
            handleLogout={this.handleLogout}
            username={this.state.username}
            is_logged={this.state.is_logged}
          />
          <Switch>
            <Route
              path="/"
              render={() => (
                <AuthRequired
                  is_logged={this.state.is_logged}
                  orRender={<TodoList username={this.state.username} />}
                />
              )}
              exact
            />
            <Route
              path="/access"
              render={() => (
                <Access
                  is_logged={this.state.is_logged}
                  handleSignUp={this.handleSignUp}
                  handleLogin={this.handleLogin}
                />
              )}
              exact
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
