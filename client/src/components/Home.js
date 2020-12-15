import React, { Component } from "react";
import CarouselImages from "./CarouselImages";
import Info from "./Info";

export default class Home extends Component {
  render() {
    return (
      <div className="homePage">
        <CarouselImages />
        <Info />
        <div className="social">
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    );
  }
}
