import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Contrats from "./Contrats";
import Entreprise from "./Entreprise";

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>Géovisionneur de contrats</h1>
                    <div className="headerWrapper">
                        <ul className="header">
                            <li><NavLink exact to="/">Contrats</NavLink></li>
                            <li><NavLink to="/entreprise">Entreprise</NavLink></li>
                        </ul>
                    </div>
                    <div className="content">
                        <Route exact path="/" component={Contrats} />
                        <Route path="/entreprise" component={Entreprise} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;