import React, { Component } from "react";
import AddItem from "./AddItem";

export default class Itempage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {
    this.getOneItem();
  }

  getOneItem = () => {
    const {
      match: { params }
    } = this.props;

    console.log(params.id);

    fetch(`/items/${params.id}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ item: json[0] });
      });
  };

  render() {
    const { item } = this.state;
    const { callback } = this.props;
    return (
      <div className="container text-center">
        {item && (
          <div>
            <h3>{item.name}</h3>
            <h5>{`${item.price} €`}</h5>
            <p>{item.description}</p>
            <AddItem item={item} callback={callback} />
            <img src={item.picture} alt={item.name} />
          </div>
        )}
      </div>
    );
  }
}
