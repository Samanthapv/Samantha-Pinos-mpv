import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Itemlist extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = id => {
    this.props.makeSelected(id);
    console.log(id);
  };

  render() {
    const { items } = this.props;
    return (
      <div>
        {items.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <Link to="/item">
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
