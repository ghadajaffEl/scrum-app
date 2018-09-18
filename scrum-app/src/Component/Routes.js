import React, { Component } from "react";
import SignUp from "./SignUp";
import Home from "./Home";
import Login from "./Login";
import { Route } from "react-router-dom";
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/addUser" component={Home} />

        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default Routes;
