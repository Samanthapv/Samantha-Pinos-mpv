import React, { Component } from "react";
import ItemGrid from "./ItemGrid";
import { Link } from "react-router-dom";

import Filters from "./Filters";
import Search from "./Search";

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

  filter = newItems => {
    console.log(newItems);
    this.setState({
      items: newItems,
      notFound: false
    });
  };

  displayNotFound = () => {
    this.setState({
      notFound: true
    });
  };

  goBack = () => {
    this.setState({
      notFound: false
    });
    this.getItems();
  };

  render() {
    const { items, notFound } = this.state;
    return (
      <div className="container text-center mt-3">
        <Filters
          items={items}
          callback={item => this.filter(item)}
          callback2={this.displayNotFound}
        />

        {/* <Search  callback={item => this.filter(item)}
          callback2={this.displayNotFound} /> */}

        {notFound ? (
          <div>
            No items matched your search.{" "}
            <p className="link" onClick={this.goBack}>
              Back to the collection
            </p>{" "}
          </div>
        ) : (
          <ItemGrid items={items} />
        )}
      </div>
    );
  }
}
