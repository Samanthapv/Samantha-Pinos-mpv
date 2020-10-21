import React, { Component } from "react";

export default class FilterSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      colors: [],
      categories: [],
      showfilter: false
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
    const { items, callback, callback2 } = this.props;
    if (search) {
      let filtered = items.filter(item =>
        item.tags.toLowerCase().includes(search.toLowerCase())
      );
      console.log(filtered);
      filtered.length > 0 ? callback(filtered) : callback2();
    }
  };

  filterByColor = colorId => {
    const { callback, callback2 } = this.props;
    fetch("items/color/" + colorId)
      .then(response => response.json())
      .then(response => {
        response.length > 0 ? callback(response) : callback2();
      });
  };

  showFilters = () => {
    this.setState(prevState => ({ showfilter: !prevState.showFilter }));
  };

  render() {
    const { search, colors, categories, showfilter } = this.state;

    return (
      <div className="container text-center">
        <ul>
          {categories.map(item => (
            <li className="categories" key={item.id}>
              {item.category_name}
            </li>
          ))}
        </ul>

        <div>
          <p className="link" onClick={this.showFilters}>
            Filter by color
          </p>
          {showfilter && (
            <div>
              {colors.map(color => (
                <button
                  className="btn btn-light"
                  key={color.id}
                  onClick={() => this.filterByColor(color.id)}
                >
                  {color.color_name}{" "}
                  <i
                    style={{ color: color.color_name }}
                    className="fa fa-heart"
                    aria-hidden="true"
                  ></i>
                </button>
              ))}
            </div>
          )}

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
        </div>
      </div>
    );
  }
}
