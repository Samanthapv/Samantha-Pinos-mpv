import React from "react";
import { Link } from "react-router-dom";

export default function SuccessfulPurchase() {
  return (
    <div className="container text-center">
      <img src="https://bit.ly/3jsP6zv" alt="shop" className="img-fluid" />
      <div className="centered">
        <h2 className="thanks">thank you for your purchase!</h2>
        <p className="white">you will receive an email confirmation shortly.</p>
        <Link to="/Itemlist">
          <p className=" ml-2 white underline">back to the shop</p>
        </Link>
      </div>
    </div>
  );
}
