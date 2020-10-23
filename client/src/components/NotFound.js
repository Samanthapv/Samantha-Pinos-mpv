import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      No items matched your search.{" "}
      <Link to="/itemlist">
        <p className="link">Back to the collection</p>
      </Link>
    </div>
  );
}
