import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

//import { createStore } from "redux";
// import anecdoteReducer from "./reducers/anecdoteReducer";
// import filterReducer from "./reducers/filterReducer";

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer,
// });

//const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
