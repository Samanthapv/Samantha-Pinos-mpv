import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";

export default class NotFound extends Component {
  render() {
    const { callback, action } = this.props;
    return (
      <div>
        No items matched your search.{" "}
        {action && (
          <p className="link" onClick={() => callback()}>
            {" "}
            {action} Again
          </p>
        )}
        <Link to="/Itemlist">
          <p className="link">Back to the collection</p>
        </Link>
      </div>
    );
  }
}
