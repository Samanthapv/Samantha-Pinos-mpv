import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: "",
      address: ""
    };
  }

  updateInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  addUser = () => {
    const { username, password, email, name, address } = this.state;

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        name: name,
        password: password,
        email: email,
        address: address
      })
    })
      .then(response => {
        console.log(response);
        this.props.history.push(`/login`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container-fluid card2">
        <div className="row no-gutter ">
          <div className="col-md-6 d-none d-md-flex no-gutter mt-n1">
            <img
              src="https://i.imgur.com/eovjCGu.jpg"
              alt="login-pic"
              className="img-fluid"
            />
            <h1 className="rotatedHeader welcome">midori</h1>
          </div>

          <div className="col-md-6 card2">
            <div className="text-right text-white mt-2">
              {" "}
              <Link to="/itemlist" classname="link2">
                <p>c o l l e c t i o n</p>
              </Link>{" "}
            </div>

            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto text-center mb-5 big-margin">
                    <h1 className="welcome text-center mt-5">
                      nice to meet you!{" "}
                    </h1>

                    <input
                      type="text"
                      name="name"
                      onChange={e => this.updateInput(e)}
                      className="input-lg input1 text-center form-control mt-3"
                      placeholder="What's your name?"
                    />
                    <input
                      type="email"
                      name="email"
                      onChange={e => this.updateInput(e)}
                      className="input-lg text-center input1 form-control mt-3"
                      placeholder="Insert your email"
                    />

                    <input
                      type="text"
                      name="username"
                      onChange={e => this.updateInput(e)}
                      className="input-lg text-center input1 form-control mt-3"
                      placeholder="Select an username"
                    />
                    <input
                      type="password"
                      name="password"
                      onChange={e => this.updateInput(e)}
                      className="input-lg text-center input1 form-control mt-3"
                      placeholder="Select a password"
                    />

                    <input
                      type="address"
                      name="address"
                      onChange={e => this.updateInput(e)}
                      className="input-lg text-center input1 form-control mt-3"
                      placeholder="What's your address?"
                    />

                    <button
                      onClick={() => this.addUser()}
                      className="btn add-button btn-block mb-2 shadow-sm mt-3"
                    >
                      Submit
                    </button>
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
