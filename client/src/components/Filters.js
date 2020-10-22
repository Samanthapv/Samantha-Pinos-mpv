import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function Filters(props) {
  let { q } = useParams();
  let [colors, setColors] = useState([]);
  let [categories, setCategories] = useState([]);
  let [color, setColor] = useState("");
  let [category, setCategory] = useState("");
  let [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    getColors();
    getCategories();
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

  const filterItems = () => {
    const { callback, callback2 } = props;

    let url = `items/`;
    if (color || category) {
      url += `?color=${color}&category=${category}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(response => {
        response.length > 0 ? callback(response) : callback2();
      });
  };

  const showFilters = () => {
    setShowFilter(!showFilter);
  };

  const handleClick = (name, content) => {
    name === "color" ? setColor(content) : setCategory(content);
  };

  return (
    <div className="container text-center">
      <div>
        <p className="link" onClick={showFilters}>
          Filter items
        </p>
        {showFilter && (
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
                className={` btn ${
                  color === color.id ? "btn-link" : "inactive"
                }`}
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
            <button className="btn btn-info mt-3 mb-3" onClick={filterItems}>
              Apply filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
