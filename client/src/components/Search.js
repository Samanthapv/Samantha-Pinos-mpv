import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ItemGrid from "./ItemGrid";

export default function Search() {
  let { q } = useParams();
  let [items, setItems] = useState([]);
  let [filteredItems, setFilteredItems] = useState([]);
  let history = useHistory();

  const search = () => {
    fetch(`/items/?`)
      .then(response => response.json())
      .then(response => {
        setItems(response);
      });

    let query = q ? q.toLowerCase() : "";
    setFilteredItems(items.filter(e => e.tags.toLowerCase().includes(query)));
  };

  const changeRoute = ({ target }) => {
    history.push(`/search/${target.value}`);
  };

  useEffect(() => {
    search();
  }, [q]);

  return (
    <div className="w-50">
      <input
        onChange={changeRoute}
        value={q}
        type="text"
        className="form-control form-control-lg"
        placeholder="Type something here..."
      />

      {filteredItems.length > 0 ? (
        <ItemGrid items={filteredItems} />
      ) : (
        <ItemGrid items={items} />
      )}
    </div>
  );
}
