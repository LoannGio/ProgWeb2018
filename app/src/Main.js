import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Contrats from "./Contrats";
import Entreprise from "./Entreprise";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Géovisionneur de contrats</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Contrats</NavLink></li>
                        <li><NavLink to="/entreprise">Entreprise</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Contrats} />
                        <Route path="/entreprise" component={Entreprise} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;