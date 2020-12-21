import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class cart extends Component {
  constructor(props) {
    super(props);
  }
  //delete item from cart when the x is clicked, filtering and then sending updated list to the parent

  deleteFromCart = id => {
    const { itemsInCart, callback, userId } = this.props;
    let articleId = id;

    console.log(userId, articleId);

    let itemList = [...itemsInCart];
    let updatedList = itemList.filter(item => item.id !== id);

    callback(updatedList);

    if (userId) {
      const { itemsInCart, callback, userId } = this.props;
      let articleId = id;

      fetch("/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          articleId: articleId
        })
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { itemsInCart } = this.props;
    return (
      <div className="text-center">
        <h5 className="ml-4"> · cart ·</h5>

        {!itemsInCart.length > 0 ? (
          <div className="ml-4 img-div2"> your cart is empty.</div>
        ) : (
          <div>
            <ul className="mt-3 list-group pl-5">
              {itemsInCart &&
                itemsInCart.map(item => (
                  <li
                    className="cartItem cart-item list-group-item"
                    key={item.id}
                  >
                    <img
                      src={item.picture}
                      alt={item.name}
                      className="cartPic rounded"
                    />
                    <p className="pp-title">
                      <span className="half_background">{item.name}</span>
                    </p>
                    <p>
                      {`${item.price} €`}{" "}
                      <i
                        onClick={() => this.deleteFromCart(item.id)}
                        className="fa fa-times text-danger mb-2 cursor"
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
