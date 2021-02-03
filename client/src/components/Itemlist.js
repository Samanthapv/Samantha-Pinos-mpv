import React, { Component } from "react";
import ItemGrid from "./ItemGrid";
import Filters from "./Filters";

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
        <div className="rotatedHeader">
          {" "}
          <h1 className="rotatedTitle">midori</h1>
        </div>
        <div className="text-center ml-5 dot filter-links">
          <Filters />
        </div>
      </div>
    );
  }
}
