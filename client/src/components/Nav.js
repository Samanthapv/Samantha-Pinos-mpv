import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <Link to="/">
            <li className="nav-li">home/ </li>
          </Link>
          <Link to="/itemlist">
            <li className="nav-li">collection/ </li>
          </Link>
          <Link to="/cart">
            <li className="nav-li">cart</li>
          </Link>
          <Link to="/search">
            <li className="nav-li">/search</li>
          </Link>
        </ul>
      </nav>
    );
  }
}
