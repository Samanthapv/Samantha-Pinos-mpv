import React, { Component } from "react";

export default class AddItem extends Component {
  //pass the selected item to the parent so it can be added to the cart and displayed in other components
  addToCart(selectedItem) {
    this.props.callback(selectedItem);
  }

  render() {
    const { item } = this.props;
    return (
      //add item received in the props to the cart
      <div className="cart-form">
        <button className="btn add-button" onClick={() => this.addToCart(item)}>
          add item to the cart
        </button>
      </div>
    );
  }
}
