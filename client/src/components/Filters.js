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
                  category === item.id ? "green" : "inactive"
                }`}
                key={item.id}
                onClick={() => handleClick("category", item.id)}
              >
                {item.category_name}
              </li>
            ))}
          </ul>
          <ul>
            {colors.map(item => (
              <li
                className={`filter-link ${
                  color === item.id ? "green" : "inactive"
                }`}
                key={color.id}
                onClick={() => handleClick("color", item.id)}
              >
                {" "}
                {item.color_name}{" "}
                <i
                  className="fa fa-heart"
                  style={{ color: item.color_name }}
                  aria-hidden="true"
                ></i>
              </li>
            ))}
          </ul>
          <div className="buttons">
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
              <p className="btn btn-link reset ml-2 " onClick={resetFilter}>
                Reset filters
              </p>
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
