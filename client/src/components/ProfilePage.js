import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

export default function ProfilePage(props) {
  let [orders, setOrders] = useState([]);
  let userId = props.match.params.id;

  useEffect(() => {
    console.log(userId);
    requestData();
  }, []);

  let requestData = () => {
    fetch(`/orders/${userId}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setOrders(Object.values(json.itemsByOrder));
      });
  };

  return (
    <div>
      <div className="orders border">
        <h3>My orders</h3>
        {orders.map(function(order) {
          var items = order.map(function(item) {
            return (
              <div className="orderedItem">
                <img src={item.picture} className="orderPic" />
                <p>
                  {item.name} | {item.price} €{" "}
                </p>
              </div>
            );
          });

          return (
            <div>
              <p>
                {format(new Date(order[order.length - 1].date), "dd/MM/yyyy")}
              </p>
              {items}
            </div>
          );
        })}
      </div>
    </div>
  );
}
