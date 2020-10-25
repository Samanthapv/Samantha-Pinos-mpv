import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckOutForm = props => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const total = props.items.reduce((a, b) => {
    return a + b.price;
  }, 0);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(props.itemsInCart);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    setLoading(true);

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("/checkout", {
          id,
          amount: total * 100 //stripe takes the amount in cents
        });
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <ul className="list-group">
        {props.items &&
          props.items.map(item => (
            <li className="list-group-item" key={item.id}>
              {" "}
              {item.name}
            </li>
          ))}
      </ul>

      <h3 className="text-center my-2">Total: {` ${total} €`}</h3>

      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

export default CheckOutForm;