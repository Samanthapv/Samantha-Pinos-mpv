import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FilteredItems extends Component {
  selectItem = id => {
    fetch("/items/" + id)
      .then(response => response.json())
      .then(response => {
        this.props.makeSelected(response);
      });
  };

  render() {
    const { items, callback } = this.props;
    return (
      <div>
        {items.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <Link to={"/item/" + item.id}>
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
