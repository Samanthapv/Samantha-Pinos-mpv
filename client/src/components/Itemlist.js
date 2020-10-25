import React, { Component } from "react";
import ItemGrid from "./ItemGrid";
import { Link } from "react-router-dom";

export default class Itemlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      notFound: false
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    fetch(`/items`)
      .then(response => response.json())
      .then(response => {
        this.setState({ items: response });
      });
  };

  getItemsUp = () => {
    fetch(`/items/price/up`)
      .then(response => response.json())
      .then(response => {
        this.setState({ items: response });
      });
  };

  getItemsDown = () => {
    fetch(`/items/price/down`)
      .then(response => response.json())
      .then(response => {
        this.setState({ items: response });
      });
  };

  render() {
    const { items } = this.state;
    return (
      <div className="container text-center mt-3">
        <div className="rotatedHeader">
          {" "}
          <h1 className="rotatedTitle">midori</h1>
        </div>
        <div className="text-center ml-5 dot filter-links">
          <Link to="/filter">
            {" "}
            <p className="link text-center filter-link">· filter items ·</p>
          </Link>
          <p className="link text-center filter-link">
            · sort by price{" "}
            <i
              className="fa fa-arrow-up"
              aria-hidden="true"
              onClick={this.getItemsUp}
            ></i>{" "}
            <i
              className="fa fa-arrow-down"
              aria-hidden="true"
              onClick={this.getItemsDown}
            ></i>{" "}
            ·
          </p>
        </div>
        <ItemGrid items={items} />
      </div>
    );
  }
}
