import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AllItems extends Component {
  render() {
    const { items, callback } = this.props;
    return (
      <div>
        {items.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <Link to="/item/">
              {" "}
              <img
                src={item.picture}
                alt={item.name}
                onClick={() => callback(item.id)}
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
