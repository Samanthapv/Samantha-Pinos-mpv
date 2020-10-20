import React, { Component } from "react";

export default class cart extends Component {
  render() {
    const { itemsInCart } = this.props;
    return (
      <div>
        {itemsInCart.map(item => (
          <div className="cartItem" key={item.id}>
            <img src={item.picture} alt={item.name} width="100" height="62" />
            <p>{item.name}</p>
            <p>{`${item.price} €`}</p>
          </div>
        ))}
        <hr />
        {itemsInCart.length > 0 && (
          <h5 className="text-center">
            Total:{" "}
            {` ${itemsInCart.reduce((a, b) => {
              return a + b.price;
            }, 0)} €`}
          </h5>
        )}
      </div>
    );
  }
}
