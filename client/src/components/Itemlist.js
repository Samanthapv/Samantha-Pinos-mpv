import React, { Component } from "react";
import AllItems from "./AllItems";
import { Link } from "react-router-dom";

import FilterSearch from "./FilterSearch";

export default class Itemlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filtered: [],
      notFound: false
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    fetch(`/items/`)
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
        <FilterSearch
          items={items}
          callback={item => this.filter(item)}
          callback2={this.displayNotFound}
        />

        {notFound ? (
          <div>
            No items matched your search.{" "}
            <p className="link" onClick={this.goBack}>
              Back to the collection
            </p>{" "}
          </div>
        ) : (
          <AllItems items={items} />
        )}
      </div>
    );
  }
}
