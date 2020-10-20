import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Itemlist extends Component {
  selectItem = id => {
    fetch("/items/" + id)
      .then(response => response.json())
      .then(response => {
        this.props.makeSelected(response);
      });
  };

  filterByColor = colorid => {
    fetch("items/filter/color/" + colorid)
      .then(response => response.json())
      .then(response => {
        this.props.makeSelected(response);
      });
  };

  render() {
    const { items } = this.props;
    return (
      <div className="container text-center">
        {items.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <Link to="/item/">
              {" "}
              <img
                src={item.picture}
                alt={item.name}
                onClick={() => this.selectItem(item.id)}
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
