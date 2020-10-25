import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";

export default class NotFound extends Component {
  render() {
    const { callback, action } = this.props;
    return (
      <div>
        <div className="notFound ml-4 text-center">
          sorry, no items matched your search.{" "}
          {action && (
            <p className="link" onClick={() => callback()}>
              {" "}
              {action} again
            </p>
          )}
          <Link to="/Itemlist">
            <p className="link ml-2 dot">back to the collection</p>
          </Link>
        </div>
        <img
          className="img-fluid ml-5"
          src="https://s3.eu-west-2.amazonaws.com/files.sewport.com/blog/the-rise-of-sustainable-fashion/rise-of-sustainable-fashion.jpeg"
          alt="clothes in the forest"
        />
      </div>
    );
  }
}
