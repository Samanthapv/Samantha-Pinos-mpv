import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      data: [],
      loginStatus: "",
      error: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = e => {
    e.preventDefault();

    const { username, password } = this.state;

    axios
      .post("/auth/login", { username, password })
      .then(result => {
        //store it locally
        console.log(result.config.data);
        this.setState({ loginStatus: true });
        localStorage.setItem("token", result.data.token);
        console.log(result.data.message, result.data.token);
      })
      .catch(error => this.setState({ loginStatus: false, error: error }));
    this.requestData();
  };

  requestData = () => {
    const { userID } = this.state;
    axios("/auth/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
      data: { user_id: userID }
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
    this.props.callback();
    this.props.callback2();
    this.props.history.push(`/`);
  };

  render() {
    return (
      <div class="container-fluid card">
        <div class="row no-gutter ">
          <div class="col-md-6 d-none d-md-flex no-gutter mt-n1">
            <img
              src="https://i.imgur.com/fyneG6q.jpeg"
              alt="login-pic"
              className="img-fluid"
            />
            <h1 className="rotatedHeader welcome">midori</h1>
          </div>

          <div class="col-md-6 card">
            <div className="text-right text-white mt-2">
              {" "}
              <NavLink to="/itemlist" classname="link2">
                <p>c o l l e c t i o n</p>
              </NavLink>{" "}
            </div>

            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10 col-xl-7 mx-auto text-center mb-5 big-margin">
                    <h1 className="welcome text-center mt-5">welcome back!</h1>

                    <form>
                      <div class="form-group mb-3">
                        <input
                          value={this.state.username}
                          onChange={this.handleChange}
                          name="username"
                          type="text"
                          placeholder="username"
                          className="form-control border-0 shadow-sm px-4 text-center"
                        />
                      </div>
                      <div class="form-group mb-3">
                        <input
                          value={this.state.password}
                          onChange={this.handleChange}
                          name="password"
                          type="password"
                          placeholder="password"
                          className="form-control border-0 shadow-sm px-4 text-center"
                        />
                      </div>
                      <div class="text-center">
                        <p className="text-white">
                          {" "}
                          do not have an account?{" "}
                          <NavLink to="/register">sign in</NavLink>{" "}
                        </p>
                      </div>
                      <button
                        onClick={e => this.login(e)}
                        type="submit"
                        class="btn add-button btn-block mb-2 shadow-sm"
                      >
                        log in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
