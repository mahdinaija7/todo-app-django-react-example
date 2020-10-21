import React from "react";

class RegisterForm extends React.Component {
  state = {
    email: "",
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
      <form className="register-form">
        <input
          onChange={this.handle_change}
          name="email"
          type="text"
          value={this.state.email}
          placeholder="email address"
        />
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
        <button onClick={(e) => this.props.handleSignUp(e, this.state)}>
          create
        </button>
        <p className="message">
          Already registered?{" "}
          <button
            onClick={this.props.handleForm}
            name="to_login"
            type="button"
            id="login"
          >
            Sign In
          </button>
        </p>
      </form>
    );
  }
}

export default RegisterForm;
