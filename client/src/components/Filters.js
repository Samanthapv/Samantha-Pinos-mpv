import React, { useState, useEffect } from "react";
import queryString from "query-string";
import ItemGrid from "./ItemGrid";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Filters() {
  const location = useLocation();
  let [colors, setColors] = useState([]);
  let [categories, setCategories] = useState([]);
  let [color, setColor] = useState("");
  let [category, setCategory] = useState("");
  let [items, setItems] = useState([]);
  let [notFound, setnotFound] = useState(false);

  useEffect(() => {
    getColors();
    getCategories();
    getItems();

    let filter = queryString.parse(location.search);

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

  const getItems = () => {
    fetch(`/items`)
      .then(response => response.json())
      .then(response => {
        setItems(response);
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

  const getItemsUp = () => {
    fetch(`items/price/up`)
      .then(response => response.json())
      .then(response => {
        setItems(response);
      });
  };

  const getItemsDown = () => {
    fetch(`items/price/down`)
      .then(response => response.json())
      .then(response => {
        setItems(response);
      });
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
                className={` categories ml-2 link ${
                  category === item.id ? "font-weight-bold" : "inactive"
                }`}
                key={item.id}
                onClick={() => handleClick("category", item.id)}
              >
                {item.category_name}
              </li>
            ))}
          </ul>

          <div className="buttons text-center">
            <p className="link text-center filter-link">
              · sort by price{" "}
              <i
                className="fa fa-arrow-up"
                aria-hidden="true"
                onClick={getItemsUp}
              ></i>{" "}
              <i
                className="fa fa-arrow-down"
                aria-hidden="true"
                onClick={getItemsDown}
              ></i>{" "}
              ·
            </p>

            <select
              className="w-64 border h6 shadow-sm p-1 rounded-full focus:outline-none"
              name="color"
              value={color}
              onChange={e => handleClick(e.target.name, e.target.value)}
            >
              <optgroup>
                <option value="">filter by color</option>
                {colors.map(color => (
                  <option key={color.id} value={color.id}>
                    {color.color_name}
                  </option>
                ))}
              </optgroup>
            </select>

            <Link to={`/filter?color=${color}&category=${category}`}>
              <button
                className="btn btn-light filter-btn mt-2 mb-3"
                onClick={() => filterItems(color, category)}
              >
                {" "}
                apply filters{" "}
              </button>
            </Link>
            {(color || category) && (
              <button
                className="btn btn-light add-button mt-2 mb-3"
                onClick={resetFilter}
              >
                {" "}
                reset filters{" "}
              </button>
            )}
          </div>
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
