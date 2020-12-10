import React, { Component } from "react";
import "./App.css";
import Itemlist from "./components/Itemlist";
import Itempage from "./components/Itempage";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Login from "./components/Login";
import SIForm from "./components/SIForm";
import Home from "./components/Home";
import Search from "./components/Search";
import Filters from "./components/Filters";
import SuccessfulPurchase from "./components/SuccessfulPurchase";
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

  emptyCart = () => {
    this.setState({ itemsInTheCart: [] });
  };

  render() {
    const { items, selectedItem, itemsInTheCart } = this.state;

    return (
      <div>
        <Router>
          <Header cart={itemsInTheCart} />

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

            <Route path="/login" exact component={Login} />

            <Route path="/register" render={props => <SIForm {...props} />} />

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
                <CheckOut
                  {...props}
                  itemsInTheCart={itemsInTheCart}
                  callback={this.emptyCart}
                />
              )}
            />
            <Route path="/success" exact component={SuccessfulPurchase} />

            <Route path="/" exact component={Home} />
            <div className="container text-center">
              {" "}
              <h3>Page not found</h3>
              <img src="https://bit.ly/2G1wMzZ" alt="shop" />{" "}
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
