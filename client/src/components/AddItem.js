import React, { Component } from "react";

export default class AddItem extends Component {
  addToCart(selectedItem) {
    this.props.callback(selectedItem);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="cart-form">
        <button onClick={() => this.addToCart(item)}>
          Add Item to the Cart
        </button>
      </div>
    );
  }
}
