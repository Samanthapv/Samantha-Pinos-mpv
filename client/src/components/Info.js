import React from "react";

export default function info() {
  return (
    <div className="container info">
      <div className="card" style={{ width: 350 }}>
        <div className="card-body shadow">
          <h5 className="card-title">
            <i className="far fa-paper-plane"></i>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">worldwide delivery</h6>
          <p className="card-text">dress in style, no matter where you are</p>
        </div>
      </div>
      <div className="card shadow" style={{ width: 350 }}>
        <div className="card-body">
          <h5 className="card-title">
            <i className="fas fa-lock"></i>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">secure payments</h6>
          <p className="card-text"> enjoy shopping without worries</p>
        </div>
      </div>
      <div className="card shadow" style={{ width: 350 }}>
        <div className="card-body">
          <h5 className="card-title">
            <i className="fas fa-retweet"></i>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">simple returns</h6>
          <p className="card-text">free returns for all orders</p>
        </div>
      </div>
    </div>
  );
}
