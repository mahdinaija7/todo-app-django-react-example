import React from "react";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form className="login-form">
        <input
          onChange={this.handle_change}
          name="username"
          type="text"
          value={this.state.username}
          placeholder="username"
        />
        <input
          onChange={this.handle_change}
          name="password"
          type="password"
          value={this.state.password}
          placeholder="password"
        />
        <button onClick={(e) => this.props.handleLogin(e, this.state)}>
          login
        </button>
        <p className="message">
          Not registered?
          <button
            onClick={this.props.handleForm}
            name="to_register"
            type="button"
            id="create"
          >
            Create an account
          </button>
        </p>
      </form>
    );
  }
}

export default LoginForm;
