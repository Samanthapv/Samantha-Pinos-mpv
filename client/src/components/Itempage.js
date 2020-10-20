import React, { Component } from "react";
import AddItem from "./AddItem";

export default class Itempage extends Component {
  render() {
    const { selectedItem, callback } = this.props;
    return (
      <div className="container text-center">
        <h3>{selectedItem.name}</h3>
        <h5>{`${selectedItem.price} €`}</h5>
        <p>{selectedItem.description}</p>
        <AddItem selectedItem={selectedItem} callback={callback} />
        <img src={selectedItem.picture} alt={selectedItem.name} />
      </div>
    );
  }
}
