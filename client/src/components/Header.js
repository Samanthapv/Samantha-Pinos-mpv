import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "./Nav";

export default function Header(props) {
  let location = useLocation();
  let history = useHistory();
  let login = props.login;

  let logOut = () => {
    localStorage.clear();
    props.callback();
    history.push(`/login`);
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  } else {
    return (
      <div className="header-box text-center mt-3 ml-5 mr-5">
        <div className="top-section text-dark">
          {!login ? (
            <Link to="/login" className="dot">
              <p>
                log in <i className="fas fa-sign-in-alt"></i>
              </p>
            </Link>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="text-dark"
              >
                hey there, {props.user.name} 🖤
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link
                  to={props.user.id && `/profile/${props.user.id}`}
                  className="dot"
                >
                  <Dropdown.Item href="#/action-1">my account</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-2" onClick={logOut}>
                  log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}

          <ul className="icon text-right mr-3">
            <Link to="/search?q" className="dot">
              <li className="nav-li">
                <i className="fa fa-search dot" aria-hidden="true"></i>
              </li>
            </Link>

            <Link to={login ? "/cart" : "/login"}>
              <li className="nav-li">
                <i
                  className="fa fa-shopping-basket basket dot"
                  aria-hidden="true"
                ></i>

                {props.cart && (
                  <span className="cartNumber dot">{props.cart.length}</span>
                )}
              </li>
            </Link>
          </ul>
        </div>
        <Link to="/">
          <h1 className="header text-center dot">midori</h1>
        </Link>
        <Nav />
      </div>
    );
  }
}
