import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterFrom from "../components/RegisterForm";
import { Redirect } from "react-router-dom";
import "./Acess.css";

class Access extends React.Component {
  state = {
    already_registred: true,
  };

  handleForm = (e) => {
    const name = e.target.name;
    this.setState({ already_registred: name === "to_login" ? true : false });
  };

  render() {
    return (
      <div className="login-page">
        {this.props.is_logged ? <Redirect to="/" /> : null}
        <div className="form">
          {this.state.already_registred ? (
            <LoginForm
              handleForm={this.handleForm}
              handleLogin={this.props.handleLogin}
            />
          ) : (
            <RegisterFrom
              handleForm={this.handleForm}
              handleSignUp={this.props.handleSignUp}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Access;
