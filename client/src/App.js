import React, { useState, useEffect } from "react";
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

export default function App(props) {
  let [items, setItems] = useState([]);
  let [itemsInTheCart, setItemsInTheCart] = useState([]);
  let [userData, setUserData] = useState("");
  let [login, setLogin] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");

    token ? setLogin(true) : setLogin(false);

    requestData();
  }, [login]);

  let requestData = () => {
    axios("/auth/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(result => setUserData(result.data.message))
      .catch(error => console.log(error));
  };

  let addItems = item => {
    setItemsInTheCart([...itemsInTheCart, item]);
  };

  let logOut = () => {
    setLogin(!login);
    setUserData("");
  };

  let deleteItems = items => {
    items ? setItemsInTheCart(items) : setItemsInTheCart([]);
  };

  let emptyCart = () => {
    setItemsInTheCart([]);
  };

  return (
    <div>
      <Router>
        <Header
          cart={itemsInTheCart}
          user={userData}
          login={login}
          callback={logOut}
        />

        <Switch>
          <Route
            path="/itemlist"
            exact
            render={props => (
              <Itemlist {...props} items={items} location={props.location} />
            )}
          />
          <Route
            path="/item/:id"
            render={props => (
              <Itempage
                {...props}
                //selectedItem={selectedItem}
                callback={item => addItems(item)}
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
                callback={logOut}
                callback2={requestData}
                login={login}
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
                callback={items => deleteItems(items)}
                userId={userData.id}
              />
            )}
          />
          <Route path="/search/:q?" component={Search} />

          <Route
            path="/filter/:q?"
            component={Filters}
            location={props.location}
          />

          <PrivateRoute exact path="/profile/:id" component={ProfilePage} />

          <Route
            path="/checkout"
            render={props => (
              <CheckOut
                {...props}
                itemsInTheCart={itemsInTheCart}
                callback={emptyCart}
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
