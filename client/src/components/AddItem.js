import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddItem(props) {
  let [login, setLogin] = useState(false);

  let selectedItem = props.selectedItem;

  useEffect(() => {
    let token = localStorage.getItem("token");

    token ? setLogin(true) : setLogin(false);
  }, []);

  let addToCart = selectedItem => {
    console.log(props.cart === 0);
    if (!login) {
      props.callback(selectedItem);
    } else {
      let ArticleId = selectedItem.id;
      let { userId } = props;

      console.log(ArticleId, userId);

      props.callback(selectedItem);

      if (props.cart === 0) {
        axios.post("/orders", { userId }).then(result => {
          console.log("order created");
          axios.post("/orders/item", { userId, ArticleId }).then(result => {
            console.log(result.data, "item posted");
          });
        });
      } else {
        axios.post("/orders/item", { userId, ArticleId }).then(result => {
          console.log(result.data, "item just posted");
        });
      }
    }
  };

  return (
    //add item received in the props to the cart
    <div className="cart-form">
      <button className="btn add-button" onClick={() => addToCart(props.item)}>
        add item to the cart
      </button>
    </div>
  );
}
