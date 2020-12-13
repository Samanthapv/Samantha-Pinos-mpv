import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

export default function ProfilePage(props) {
  let [orders, setOrders] = useState([]);
  let [userData, setUserData] = useState("");
  let userId = props.match.params.id;

  useEffect(() => {
    console.log(userId);
    requestData();
    requestUser();
  }, []);

  let requestUser = () => {
    axios("/auth/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(result => setUserData(result.data.message))
      .catch(error => console.log(error));
  };

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
    <div className="orders">
      <div className="w-50 mr-5">
        <div className="w-100 border p-5 pl-5 ml-5 mb-5 mt-3 rounded shadow img-div welcome">
          {" "}
          my account{" "}
        </div>
        <div className="w-100 border p-5 pl-5 ml-5 mb-5 mt-3 rounded shadow">
          <h3 className="text-center mb-5">my address</h3>

          <p>This is where your orders will be send to:</p>
          {userData.address}
          <button
            type="submit"
            className="btn add-button btn-block mb-2 shadow-sm"
          >
            {" "}
            Edit <i class="fas fa-edit    "></i>{" "}
          </button>
        </div>
      </div>

      <div className=" border p-5 pl-5 mr-5 ml-5 mb-5 mt-3 w-50 rounded shadow">
        <h3 className="text-center mb-5">my orders</h3>
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
              <strong>
                <p className="text-center mb-4">
                  {format(new Date(order[order.length - 1].date), "dd/MM/yyyy")}
                </p>
              </strong>
              {items}
            </div>
          );
        })}
      </div>
    </div>
  );
}
