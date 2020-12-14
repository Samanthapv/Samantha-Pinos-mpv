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
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./components/ProfilePage";
import Filters from "./components/Filters";
import axios from "axios";
import SuccessfulPurchase from "./components/SuccessfulPurchase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsInTheCart: [],
      userData: "",
      login: ""
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");

    token ? this.setState({ login: true }) : this.setState({ login: false });

    this.requestData();
  }

  requestData = () => {
    axios("/auth/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(result => console.log(result.data.message))
      //this.setState({ userData: result.data.message }))
      .catch(error => console.log(error));
  };

  addItems(item) {
    this.setState({
      itemsInTheCart: [...this.state.itemsInTheCart, item]
    });
  }

  logOut = () => {
    this.setState({ login: !this.state.login, userData: "" });
  };

  deleteItems(items) {
    items
      ? this.setState({ itemsInTheCart: items })
      : this.setState({ itemsInTheCart: [] });
  }

  emptyCart = () => {
    this.setState({ itemsInTheCart: [] });
  };

  render() {
    const { items, selectedItem, itemsInTheCart, userData, login } = this.state;

    return (
      <div>
        <Router>
          <Header
            cart={itemsInTheCart}
            user={userData}
            login={login}
            callback={this.logOut}
          />

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
                  cart={itemsInTheCart.length === 0 ? 0 : itemsInTheCart.length}
                  userId={userData.id}
                />
              )}
            />

            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  callback={this.logOut}
                  callback2={this.requestData}
                />
              )}
            />

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

            <PrivateRoute exact path="/profile/:id" component={ProfilePage} />

            <Route
              path="/checkout"
              render={props => (
                <CheckOut
                  {...props}
                  itemsInTheCart={itemsInTheCart}
                  callback={this.emptyCart}
                  id={userData.id}
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
