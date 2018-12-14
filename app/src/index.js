import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./stylesheets/bootstrap.css";
import "./stylesheets/style.css";

const domContainer = document.querySelector('#root');
ReactDOM.render(e(<Main />), domContainer);

/*ReactDOM.render(
    <Main />,
    document.getElementById("root")
);*/
