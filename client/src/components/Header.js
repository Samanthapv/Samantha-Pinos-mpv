import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "./Nav";

export default function Header(props) {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname === "/login");
  }, []);

  let logOut = () => {
    localStorage.clear();
    props.history.push(`/login`);
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  } else {
    return (
      <div className="header-box text-center mt-3 ml-3 mr-3">
        <i class="fas fa-sign-in-alt"></i>
        <div className="top-section text-dark">
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">My account</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={logOut}>
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <ul className="icon text-right mr-3">
            <Link to="/search?q" className="dot">
              <li className="nav-li">
                <i className="fa fa-search dot" aria-hidden="true"></i>
              </li>
            </Link>
            <Link to="/cart">
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
