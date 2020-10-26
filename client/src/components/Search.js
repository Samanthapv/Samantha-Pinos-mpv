import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ItemGrid from "./ItemGrid";
import NotFound from "./NotFound";

export default function Search() {
  let { q } = useParams();
  let [items] = useState([]);
  let [filteredItems, setFilteredItems] = useState([]);
  let history = useHistory();
  let [notFound, setnotFound] = useState(false);

  const search = () => {
    let url = `/items/`;
    if (q) {
      url += `search/${q}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(response => {
        response.length > 0 ? setFilteredItems(response) : setnotFound(true);
      });
  };

  const reset = () => {
    setnotFound(false);
  };

  const changeRoute = ({ target }) => {
    history.push(`/search/${target.value}`);
  };

  useEffect(() => {
    search();
  }, [q]);

  return (
    <div className="container ">
      <div className="d-flex justify-content-center">
        <input
          onChange={changeRoute}
          value={q}
          type="text"
          className="form-control search-form mb-5 text-center ml-5"
          placeholder="Type something here...🔎"
        />{" "}
        <button className="btn underline mb-4" onClick={reset}>
          reset
        </button>
      </div>

      {notFound ? (
        <NotFound />
      ) : filteredItems.length > 0 || !q ? (
        <ItemGrid items={filteredItems} />
      ) : (
        <ItemGrid items={items} />
      )}
    </div>
  );
}
