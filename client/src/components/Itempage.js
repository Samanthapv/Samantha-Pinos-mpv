import React, { Component } from "react";
import AddItem from "./AddItem";
import ProgressiveImage from "react-progressive-image";

let clothesSize = ["XS", "S", "M", "L", "XL"];
let shoeSize = [36, 37, 38, 39, 40, 41];

export default class Itempage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      size: ""
    };
  }

  componentDidMount() {
    this.getOneItem();
  }

  getOneItem = () => {
    const {
      match: { params }
    } = this.props;

    fetch(`/items/${params.id}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ item: json[0] });
      });
  };

  selectSize = e => {
    e.preventDefault();
    this.setState({ size: e.target.value });
  };

  render() {
    const { item, size } = this.state;
    const { callback, cart, userId } = this.props;
    return (
      <div className="container text-center item-page mb-5">
        {item && (
          <div className="product-page">
            <ProgressiveImage
              src="large-image.jpg"
              placeholder="tiny-image.jpg"
            >
              {src => (
                <img
                  className="product-pic img-fluid withBorder"
                  src={item.picture}
                  alt={item.name}
                />
              )}
            </ProgressiveImage>

            <div className="product-info">
              <h3>{item.name}</h3>
              <h5>{`${item.price} €`}</h5>
              <p>{item.description}</p>
              <div className="addItem">
                {item.categoryId !== 8 && (
                  <select
                    className="form-group form-control mr-2 w-25 mdb-select md-outline colorful-select dropdown-primary shadow"
                    name="goal"
                    value={size}
                    onChange={this.selectSize}
                  >
                    <option
                      value="DEFAULT"
                      selected="selected"
                      className="pr-3"
                    >
                      ...
                    </option>

                    {item.categoryId === 1
                      ? shoeSize.map(size => (
                          <option value={size}>{size}</option>
                        ))
                      : clothesSize.map(size => (
                          <option value={size}>{size}</option>
                        ))}
                  </select>
                )}

                <AddItem
                  item={item}
                  callback={callback}
                  cart={cart}
                  userId={userId}
                  Size={size}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
