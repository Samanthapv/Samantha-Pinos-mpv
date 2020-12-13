import React, { Component } from "react";
import AddItem from "./AddItem";

export default class Itempage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {
    this.getOneItem();
  }

  getOneItem = () => {
    const {
      match: { params }
    } = this.props;

    fetch(`/items/${params.id}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ item: json[0] });
      });
  };

  render() {
    const { item } = this.state;
    const { callback, cart, userId } = this.props;
    return (
      <div className="container text-center item-page">
        {item && (
          <div className="product-page">
            <img
              className="product-pic img-fluid withBorder"
              src={item.picture}
              alt={item.name}
            />
            <div className="product-info">
              <h3>{item.name}</h3>
              <h5>{`${item.price} €`}</h5>
              <p>{item.description}</p>
              <AddItem
                item={item}
                callback={callback}
                cart={cart}
                userId={userId}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
