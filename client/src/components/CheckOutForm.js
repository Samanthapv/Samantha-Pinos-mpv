import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Redirect } from "react-router";

import axios from "axios";

const CheckOutForm = props => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = props.items.reduce((a, b) => {
    return a + b.price;
  }, 0);

  const makeConfirmed = () => {
    let userId = props.id;
    axios.put("/orders", { userId }).then(result => {
      console.log(result.data, "order confirmed");
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("/server/checkout", {
          id,
          amount: total * 100 //stripe takes the amount in cents
        });

        setSuccess(true);
        props.callback();

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  if (success) {
    console.log("Redirecting...");
    makeConfirmed();
    return <Redirect to="/success" />;
  } else {
    return (
      <form
        className="card2 mt-5 pt-5 rounded shadow card-body"
        onSubmit={handleSubmit}
      >
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

        <button disabled={!stripe} className="btn add-button btn-block">
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
  }
};

export default CheckOutForm;
