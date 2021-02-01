import "../style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { compose, createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/rootReducer";

const store = createStore(
    rootReducer,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(
    app, 
    document.getElementById('root')
); 