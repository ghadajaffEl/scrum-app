import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      status: "",
      password: "",
      confirmpassword: ""
    };
  }

  addUser = () => {
    axios
      .post("/addUser", {
        fullname: this.state.fullname,
        email: this.state.email,
        status: this.state.status,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword
      })
      .then(res => alert(res.data))
      .catch(err => alert(err));
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>

        <form>
          <label>Fullname</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ fullname: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <label>Status</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ status: e.target.value });
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={e => {
              this.setState({ confirmpassword: e.target.value });
            }}
          />
          <Link to="/addUser">
            <input
              className="btn btn-primary"
              type="submit"
              value="Sign Up"
              onClick={this.addUser}
            />
          </Link>
        </form>
      </div>
    );
  }
}

export default SignUp;
