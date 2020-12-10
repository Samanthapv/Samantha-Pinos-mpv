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
          <i class="fab fa-twitter"></i>
          <i class="fab fa-facebook"></i>
          <i class="fab fa-instagram"></i>
        </div>
      </div>
    );
  }
}
