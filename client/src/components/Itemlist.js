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

  render() {
    const { items } = this.state;
    return (
      <div className="container text-center mt-3">
        <Link to="/filter">
          {" "}
          <p className="link"> Filter items </p>
        </Link>

        <ItemGrid items={items} />
      </div>
    );
  }
}
