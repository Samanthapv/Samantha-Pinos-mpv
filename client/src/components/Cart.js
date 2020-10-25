import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class cart extends Component {
  //delete item from cart when the x is clicked, filtering and then sending updated list to the parent

  deleteFromCart(id) {
    console.log(id);

    const { itemsInCart, callback } = this.props;

    let itemList = [...itemsInCart];
    let updatedList = itemList.filter(item => item.id !== id);

    callback(updatedList);
  }

  render() {
    const { itemsInCart } = this.props;
    return (
      <div className="text-center">
        <h5 className="ml-4"> · cart ·</h5>

        {!itemsInCart.length > 0 ? (
          <div className="ml-4"> your cart is empty.</div>
        ) : (
          <div>
            <ul className="mt-3">
              {itemsInCart &&
                itemsInCart.map(item => (
                  <li className="cartItem cart-item" key={item.id}>
                    <img
                      src={item.picture}
                      alt={item.name}
                      className="cartPic "
                    />
                    <p>{item.name}</p>
                    <p>
                      {`${item.price} €`}{" "}
                      <i
                        onClick={() => this.deleteFromCart(item.id)}
                        className="fa fa-times text-danger mb-2"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        )}
        <hr />
        {itemsInCart && (
          <h5>
            Total:{" "}
            {` ${itemsInCart.reduce((a, b) => {
              return a + b.price;
            }, 0)} €`}
          </h5>
        )}
        <Link to="/checkout">
          <button className="btn filter-btn btn-light text-center">
            check out
          </button>
        </Link>
      </div>
    );
  }
}
