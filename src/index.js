import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import App from "./App";

// dynamically loading script
const loadMDBScript = () => {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.umd.min.js";
  script.async = true;
  document.body.appendChild(script);
};
loadMDBScript();

//store
const store = configureStore();
console.log("state", store.getState());

//to track updated store
store.subscribe(() => {
  console.log("updated state", store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
