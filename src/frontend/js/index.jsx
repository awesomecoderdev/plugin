import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

if (document.getElementById("awesomecoderDates") != null) {
  const root = ReactDOM.createRoot(document.getElementById("awesomecoderDates"));
  root.render(
    <App />
  );
}