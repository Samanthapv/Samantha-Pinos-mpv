import React, { Component } from "react";

export default class FilterSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      colors: [],
      categories: [],
      color: "",
      category: "",
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

  /* const { callback, callback2 } = this.props;
    fetch("items/color/" + colorId)
      .then(response => response.json())
      .then(response => {
        response.length > 0 ? callback(response) : callback2(); 
      });*/

  filterItems = () => {
    const { color, category } = this.state;
    const { callback, callback2 } = this.props;

    let url = `/items/`;
    if (color || category) {
      url += `?color=${color}&category=${category}`;
    }
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        response.length > 0 ? callback(response) : callback2();
      });
  };

  showFilters = () => {
    this.setState({ showfilter: !this.state.showfilter });
  };

  handleClick = (name, content) => {
    this.setState({
      [name]: content
    });
  };

  render() {
    const {
      search,
      colors,
      categories,
      showfilter,
      color,
      category
    } = this.state;

    return (
      <div className="container text-center">
        <div>
          <p className="link" onClick={this.showFilters}>
            Filter items
          </p>
          {showfilter && (
            <div className="mb-3">
              <ul>
                {categories.map(item => (
                  <li
                    className={` categories link ${
                      category === item.id ? "selected" : "inactive"
                    }`}
                    key={item.id}
                    onClick={() => this.handleClick("category", item.id)}
                  >
                    {item.category_name}
                  </li>
                ))}
              </ul>

              {colors.map(color => (
                <button
                  className={` btn ${
                    color === color.id ? "btn-link" : "inactive"
                  }`}
                  key={color.id}
                  onClick={() => this.handleClick("color", color.id)}
                >
                  {color.color_name}{" "}
                  <i
                    style={{ color: color.color_name }}
                    className="fa fa-heart"
                    aria-hidden="true"
                  ></i>
                </button>
              ))}
              <button
                className="btn btn-info mt-3 mb-3"
                onClick={this.filterItems}
              >
                Apply filters
              </button>
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
