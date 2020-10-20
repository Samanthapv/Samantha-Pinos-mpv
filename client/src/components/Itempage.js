import React, { Component } from "react";

export default class Itempage extends Component {
  render() {
    const { selectedItem } = this.props;
    return (
      <div>
        <h3>{selectedItem.name}</h3>
        <h5>{`${selectedItem.price} €`}</h5>
        <p>{selectedItem.description}</p>

        <img src={selectedItem.picture} alt={selectedItem.name} />
      </div>
    );
  }
}
