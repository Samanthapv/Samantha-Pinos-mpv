import React, { useState, useEffect } from "react";
import queryString from "query-string";
import ItemGrid from "./ItemGrid";
import NotFound from "./NotFound";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function CategoryNav(props) {
  let [colors, setColors] = useState([]);
  let [categories, setCategories] = useState([]);
  let [color, setColor] = useState("");
  let [category, setCategory] = useState("");
  let [items, setItems] = useState([]);
  let [filters, setFilters] = useState({});
  let [openFilter, setOpenFilter] = useState(false);
  let [notFound, setnotFound] = useState(false);
  let location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getColors();
    getCategories();

    let filter = queryString.parse(location.search);

    setCategory(filter.category);
    setColor(filter.color);
    setFilters({ ...filter, ...filters });
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

  useEffect(() => {
    filterItems(color, category);

    const queryParams = queryString.stringify(filters, {
      skipEmptyString: true
    });

    history.push(`/filter?${queryParams}`);
  }, [filters]);

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
    setFilters({ ...filters, [name]: content });
    notFound && setnotFound(false);
    name === "color" ? setColor(content) : setCategory(content);
  };

  const resetFilter = () => {
    setColor("");
    setCategory("");
    setnotFound(false);
    filterItems();
    history.push(`/filter`);
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

          <div className="buttons mb-3 ">
            <select
              className="w-64 border shadow-sm p-2 mr-3 rounded-full focus:outline-none"
              name="color"
              value={color}
              onChange={e => handleClick(e.target.name, e.target.value)}
            >
              <option value="">filter by color</option>
              {colors.map(color => (
                <option key={color.id} value={color.id}>
                  {color.color_name}
                </option>
              ))}
            </select>

            {(color || category) && (
              <p className="btn btn-link reset ml-2 " onClick={resetFilter}>
                Reset filters
              </p>
            )}
          </div>
          {!notFound ? (
            <ItemGrid items={items} />
          ) : (
            <NotFound action={"filter"} callback={resetFilter} />
          )}
        </div>
      </div>
    </div>
  );
}
