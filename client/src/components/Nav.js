import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav className="text-center ">
        <ul className="linkUL collection">
          <Link to="/itemlist">
            <li className="nav-li dot">· c o l l e c t i o n ·</li>
          </Link>
        </ul>
      </nav>
    );
  }
}
