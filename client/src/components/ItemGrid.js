import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AllItems extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="container">
        <div className="row img__wrap no-gutters ">
          {items.map(item => (
            <div key={item.id} className="col-6 mb-1 pb-3  ">
              <Link to={"/item/" + item.id}>
                <img
                  className="img-fluid product-image withBorder shadow"
                  src={item.picture}
                  alt={item.name}
                />
              </Link>

              <div className="img__description_layer">
                <Link to={"/item/" + item.id}>
                  <div className="centered">
                    <h3 className="item-description">{item.name}</h3>
                    <h5 className="item-price">{item.price} €</h5>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
