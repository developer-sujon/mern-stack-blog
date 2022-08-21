//external  lib import
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

//internal lib import
import App from "./App";
import store from "./redux/store/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
