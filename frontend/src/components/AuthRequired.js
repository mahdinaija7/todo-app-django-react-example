import { Redirect } from "react-router-dom";
import React from "react";

export class AuthRequired extends React.Component {
  render() {
    if (!this.props.is_logged) {
      return <Redirect to="/access" />;
    } else {
      return this.props.orRender;
    }
  }
}
export default AuthRequired;
