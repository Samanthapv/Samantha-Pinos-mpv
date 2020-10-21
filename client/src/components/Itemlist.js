import React, { Component } from "react";
import AllItems from "./AllItems";
import FilteredItems from "./FilteredItems";

export default class Itemlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      search: "",
      colors: [],
      categories: []
    };
  }

  componentDidMount() {
    this.getColors();
    this.getCategories();
  }

  getColors = () => {
    fetch(`/colors`)
      .then(response => response.json())
      .then(response => {
        this.setState({ colors: response });
      });
  };

  getCategories = () => {
    fetch(`/categories`)
      .then(response => response.json())
      .then(response => {
        this.setState({ categories: response });
      });
  };

  updateInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  search = () => {
    const { search } = this.state;
    const { items } = this.props;
    if (search) {
      this.setState({
        filtered: items.filter(item =>
          item.tags.toLowerCase().includes(search.toLowerCase())
        )
      });
    }
  };

  selectItem = id => {
    fetch("/items/" + id)
      .then(response => response.json())
      .then(response => {
        this.props.makeSelected(response);
      });
  };

  filterByColor = colorid => {
    fetch("items/filter/color/" + colorid)
      .then(response => response.json())
      .then(response => {
        this.props.makeSelected(response);
      });
  };

  render() {
    const { items } = this.props;
    const { filtered, search, categories, colors } = this.state;
    return (
      <div className="container text-center">
        <ul>
          {categories.map(item => (
            <li className="categories" key={item.id}>
              {item.category_name}
            </li>
          ))}
        </ul>
        <input
          type="text"
          name="search"
          value={search}
          onChange={e => this.updateInput(e)}
          placeholder="search for an item"
        />
        <button onClick={this.search}>
          <i className="fas fa-search"></i>
        </button>

        {filtered.length > 0 ? (
          <FilteredItems items={filtered} callback={this.selectItem} />
        ) : (
          <AllItems callback={this.selectItem} items={items} />
        )}
      </div>
    );
  }
}
