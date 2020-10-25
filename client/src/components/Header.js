import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className="header-box text-center mt-3">
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
              {cart && <span className="cartNumber dot">{cart.length}</span>}
            </li>
          </Link>
        </ul>
        <Link to="/">
          <h1 className="header text-center dot">midori</h1>
        </Link>
      </div>
    );
  }
}
