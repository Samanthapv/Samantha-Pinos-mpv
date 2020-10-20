import React, { Component } from "react";
import "./App.css";
import Itemlist from "./components/Itemlist";
import Itempage from "./components/Itempage";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedItem: ""
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

  makeSelected(id) {
    const { items } = this.state;
    let selected = items.find(product => product.id === id);

    this.setState({
      selectedItem: selected
    });
  }

  render() {
    const { items, selectedItem } = this.state;

    return (
      <div>
        <Router>
          <Header />
          <Nav />

          <Switch>
            <Route
              path="/itemlist"
              render={props => (
                <Itemlist
                  {...props}
                  items={items}
                  makeSelected={id => this.makeSelected(id)}
                />
              )}
            />
            <Route
              path="/item"
              render={props => (
                <Itempage {...props} selectedItem={selectedItem} />
              )}
            />
            <Route path="/cart" component={Cart} />
            <Route path="/" exact component={Home} />

            <div>Page not found</div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

{
  /*

          same <Route path="/" component={Home}/>
          go to page and import withRouter from r-r-dom

export default withRouter(User)

*/
}
