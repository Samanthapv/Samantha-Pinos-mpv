import React, { Component } from "react";

export default class AddItem extends Component {
  addToCart(selectedItem) {
    this.props.callback(selectedItem);
  }

  render() {
    const { selectedItem } = this.props;
    console.log(selectedItem);
    return (
      <div className="cart-form">
        <button onClick={() => this.addToCart(selectedItem)}>
          Add Item to the Cart
        </button>
      </div>
    );
  }
}
