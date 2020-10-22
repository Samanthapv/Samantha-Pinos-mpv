import React, { Component } from "react";
import "./App.css";
import Itemlist from "./components/Itemlist";
import Itempage from "./components/Itempage";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedItem: "",
      itemsInTheCart: []
    };
  }

  makeSelected(item) {
    this.setState({
      selectedItem: item[0]
    });
  }

  addItems(item) {
    this.setState({
      itemsInTheCart: [...this.state.itemsInTheCart, item]
    });
    console.log(this.state.itemsInTheCart);
  }

  render() {
    const { items, selectedItem, itemsInTheCart } = this.state;

    return (
      <div>
        <Router>
          <Header />
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
              render={props => <Cart {...props} itemsInCart={itemsInTheCart} />}
            />
            <Route path="/search/:q?" component={Search} />

            <Route path="/" exact component={Home} />

            <div>Page not found</div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

/*

          same <Route path="/" component={Home}/>
          go to page and import withRouter from r-r-dom

export default withRouter(User)

*/
