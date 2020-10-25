import CheckOutForm from "./CheckOutForm";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HfswlLZH504GxAlkKipF14bWUyeNCFml1oPJSb9U0r4a7XXasVCwkAcFbZT1m0DjsPGg4Nw5jWNNMtjKDJCXXcJ00GLqG6smH"
);

function CheckOut(props) {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckOutForm items={props.itemsInTheCart} />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default CheckOut;
