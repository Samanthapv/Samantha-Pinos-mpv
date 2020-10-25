import React, { Component } from "react";
import "./App.css";
import Itemlist from "./components/Itemlist";
import Itempage from "./components/Itempage";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Header from "./components/Header";
import CheckOut from "./components/CheckOut";
import Home from "./components/Home";
import Search from "./components/Search";
import Filters from "./components/Filters";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsInTheCart: []
    };
  }

  addItems(item) {
    this.setState({
      itemsInTheCart: [...this.state.itemsInTheCart, item]
    });
  }

  deleteItems(items) {
    items
      ? this.setState({ itemsInTheCart: items })
      : this.setState({ itemsInTheCart: [] });
  }

  render() {
    const { items, selectedItem, itemsInTheCart } = this.state;

    return (
      <div>
        <Router>
          <Header cart={itemsInTheCart} />
          <Nav />

          <Switch>
            <Route
              path="/itemlist"
              exact
              render={props => (
                <Itemlist
                  {...props}
                  items={items}
                  makeSelected={id => this.makeSelected(id)}
                />
              )}
            />
            <Route
              path="/item/:id"
              render={props => (
                <Itempage
                  {...props}
                  selectedItem={selectedItem}
                  callback={item => this.addItems(item)}
                />
              )}
            />

            <Route
              path="/cart"
              render={props => (
                <Cart
                  {...props}
                  itemsInCart={itemsInTheCart}
                  callback={items => this.deleteItems(items)}
                />
              )}
            />
            <Route path="/search/:q?" component={Search} />

            <Route path="/filter/:q?" component={Filters} />

            <Route
              path="/checkout"
              render={props => (
                <CheckOut {...props} itemsInTheCart={itemsInTheCart} />
              )}
            />

            <Route path="/" exact component={Home} />
            <div>Page not found</div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
