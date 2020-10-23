import React, { useState, useEffect } from "react";
import queryString from "query-string";
import ItemGrid from "./ItemGrid";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";

export default function Filters(props) {
  let [colors, setColors] = useState([]);
  let [categories, setCategories] = useState([]);
  let [color, setColor] = useState("");
  let [category, setCategory] = useState("");
  let [items, setItems] = useState([]);
  let [notFound, setnotFound] = useState(false);

  useEffect(() => {
    getColors();
    getCategories();

    let filter = queryString.parse(props.location.search);
    console.log(filter.category);
    if (filter) {
      filterItems(filter.color, filter.category);
    }
  }, []);

  const getColors = () => {
    fetch(`/colors`)
      .then(response => response.json())
      .then(response => {
        setColors(response);
      });
  };

  const getCategories = () => {
    fetch(`/categories`)
      .then(response => response.json())
      .then(response => {
        setCategories(response);
      });
  };

  const filterItems = (color, category) => {
    let url = `items/`;
    if (color || category) {
      url += `?color=${color}&category=${category}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(response => {
        response.length > 0 ? setItems(response) : setnotFound(true);
      });
  };

  const handleClick = (name, content) => {
    name === "color" ? setColor(content) : setCategory(content);
  };

  const resetFilter = () => {
    setColor("");
    setCategory("");
    setnotFound(false);
    filterItems();
  };

  return (
    <div className="container text-center">
      <div>
        <div className="mb-3">
          <ul>
            {categories.map(item => (
              <li
                className={` categories link ${
                  category === item.id ? "selected" : "inactive"
                }`}
                key={item.id}
                onClick={() => handleClick("category", item.id)}
              >
                {item.category_name}
              </li>
            ))}
          </ul>

          {colors.map(color => (
            <button
              className={` btn ${color === color.id ? "btn-link" : "inactive"}`}
              key={color.id}
              onClick={() => handleClick("color", color.id)}
            >
              {color.color_name}{" "}
              <i
                style={{ color: color.color_name }}
                className="fa fa-heart"
                aria-hidden="true"
              ></i>
            </button>
          ))}
          <Link to={`/filter?color=${color}&category=${category}`}>
            <button
              className="btn btn-info mt-3 mb-3"
              onClick={() => filterItems(color, category)}
            >
              Apply filters
            </button>
          </Link>
          {(color || category) && <p onClick={resetFilter}>Reset filters</p>}
        </div>
        {!notFound ? (
          <ItemGrid items={items} />
        ) : (
          <NotFound action={"filter"} callback={resetFilter} />
        )}
      </div>
    </div>
  );
}