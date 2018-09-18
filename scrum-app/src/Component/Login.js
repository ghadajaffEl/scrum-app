import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Login</h2>

        <form>
          <label>Fullname</label>
          <input type="text" name="fullname" />
          <label>Email</label>
          <input type="email" name="email" />
          <label>Password</label>
          <input type="password" />

          <input className="btn btn-primary" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
