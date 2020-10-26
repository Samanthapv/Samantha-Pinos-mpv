import React from "react";

export default function info() {
  return (
    <div className="container info">
      <div class="card" style={{ width: 350 }}>
        <div class="card-body shadow">
          <h5 class="card-title">
            <i class="far fa-paper-plane"></i>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">worldwide delivery</h6>
          <p class="card-text">dress in style, no matter where you are</p>
        </div>
      </div>
      <div class="card shadow" style={{ width: 350 }}>
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-lock"></i>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">secure payments</h6>
          <p class="card-text"> enjoy shopping without worries</p>
        </div>
      </div>
      <div class="card shadow" style={{ width: 350 }}>
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-retweet"></i>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">simple returns</h6>
          <p class="card-text">free returns for all orders</p>
        </div>
      </div>
    </div>
  );
}
