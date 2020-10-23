import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="linkUL">
          <Link to="/">
            <li className="nav-li">home/ </li>
          </Link>
          <Link to="/itemlist">
            <li className="nav-li">collection/ </li>
          </Link>
          <Link to="/cart">
            <li className="nav-li">
              <i class="fa fa-shopping-basket" aria-hidden="true"></i>
            </li>
          </Link>
          <Link to="/search?q">
            <li className="nav-li">
              <i class="fa fa-search" aria-hidden="true"></i>
            </li>
          </Link>
        </ul>
      </nav>
    );
  }
}
