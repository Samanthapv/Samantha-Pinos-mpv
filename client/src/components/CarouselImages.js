import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export default class CarouselImages extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://bit.ly/3otjbTw?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h2 className="carouTitle">Hello Autumn!</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://expertphotography.com/wp-content/uploads/2019/04/autumn-photography-girl-throwing-leaves.jpg?text=Second slide&bg=282c34"
              alt="Third slide"
            />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/ifeNE42.jpg?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
