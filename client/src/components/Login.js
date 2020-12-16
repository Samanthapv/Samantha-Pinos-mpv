import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ProgressiveImage from "react-progressive-image";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      data: [],
      loginStatus: "",
      error: false
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

        this.setState({ loginStatus: true });
        localStorage.setItem("token", result.data.token);
        this.requestData();
      })
      .catch(error => this.setState({ loginStatus: false, error: error }));
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
      .then(result => this.props.callback())
      .catch(error => this.setState({ error: true }));

    this.props.callback2();
    this.props.history.push(`/`);
  };

  render() {
    return (
      <div className="container-fluid card">
        <div className="row no-gutter ">
          <div className="col-md-6 d-none d-md-flex no-gutter mt-n1">
            <ProgressiveImage
              src="large-image.jpg"
              placeholder="tiny-image.jpg"
            >
              {src => (
                <img
                  src="https://i.imgur.com/fyneG6q.jpeg"
                  alt="login-pic"
                  className="img-fluid"
                />
              )}
            </ProgressiveImage>

            <h1 className="rotatedHeader welcome">midori</h1>
          </div>

          <div className="col-md-6 card">
            <div className="text-right text-white mt-2">
              {" "}
              <NavLink to="/itemlist" classname="link2">
                <p>c o l l e c t i o n</p>
              </NavLink>{" "}
            </div>

            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto text-center mb-5 big-margin">
                    <h1 className="welcome text-center mt-5">welcome back!</h1>
                    {this.state.error && (
                      <p className="bg-danger text-white">
                        Invalid unsername or password
                      </p>
                    )}
                    <form>
                      <div className="form-group mb-3">
                        <input
                          value={this.state.username}
                          onChange={this.handleChange}
                          name="username"
                          type="text"
                          placeholder="username"
                          className="form-control border-0 shadow-sm px-4 text-center"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          value={this.state.password}
                          onChange={this.handleChange}
                          name="password"
                          type="password"
                          placeholder="password"
                          className="form-control border-0 shadow-sm px-4 text-center"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-white">
                          {" "}
                          do not have an account?{" "}
                          <NavLink to="/register">sign in</NavLink>{" "}
                        </p>
                      </div>
                      <button
                        onClick={e => this.login(e)}
                        type="submit"
                        className="btn add-button btn-block mb-2 shadow-sm"
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
