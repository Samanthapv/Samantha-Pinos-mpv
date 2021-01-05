import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";

export default class NotFound extends Component {
  render() {
    const { callback, action } = this.props;
    return (
      <div>
        <div className="notFound ml-4 text-center ml-4 img-div3">
          sorry, no items matched your search.{" "}
          {action === "search" && (
            <p className="link" onClick={() => callback()}>
              {" "}
              {action} again
            </p>
          )}
        </div>
      </div>
    );
  }
}
