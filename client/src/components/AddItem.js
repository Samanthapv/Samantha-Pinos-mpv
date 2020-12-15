import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddItem(props) {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");

    token ? setLogin(true) : setLogin(false);
  }, []);

  let createOrder = () => {
    let { userId, cart } = props;

    if (cart === 0) {
      axios.post("/orders", { userId }).then(result => {
        console.log("order created");
      });
    }
  };

  let addToCart = selectedItem => {
    let Size = props.Size;

    if (!login) {
      props.callback(selectedItem);
    } else {
      let ArticleId = selectedItem.id;
      let { userId } = props;

      props.callback(selectedItem);

      if (Size) {
        axios.post("/orders/item", { userId, ArticleId, Size }).then(result => {
          console.log(result.data, "item posted");
        });
      } else {
        axios.post("/orders/item", { userId, ArticleId }).then(result => {
          console.log(result.data, "item posted");
        });
      }
    }
  };

  return (
    //add item received in the props to the cart
    <div className="cart-form">
      <button
        className="btn add-button"
        onMouseOver={createOrder}
        onClick={() => addToCart(props.item)}
      >
        add item to the cart
      </button>
    </div>
  );
}
