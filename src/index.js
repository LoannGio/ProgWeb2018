import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { GoogleAPI, GoogleLogin, GoogleLogout } from 'react-google-oauth';
import './styles/bootstrap/css/bootstrap.css';
import "./styles/index.css";

if (typeof sessionStorage.getItem('userIsLogged') === 'undefined' || sessionStorage.getItem('userIsLogged') === null)
    sessionStorage.setItem('userIsLogged', false);

let logged = sessionStorage.getItem('userIsLogged');

loadPage(logged);

function handleLogin(user) {
    sessionStorage.setItem('user', user.getBasicProfile().getName());
    logged = true;
    sessionStorage.setItem('userIsLogged', true);
    loadPage(logged);
}

function handleLogout() {
    logged = false;
    sessionStorage.setItem('userIsLogged', false);
    loadPage(logged);
}

function loadPage(logStatus) {
    if (logStatus) {
        ReactDOM.render(
            <GoogleAPI clientId="487523406083-avfllqgnd7j3djv764ftlilj8uphkq81.apps.googleusercontent.com"
                onInitFailure={(response) => alert("Error: " + response)} >
                <div>
                    <div id="logout">
                        <span>Connecté en tant que {sessionStorage.getItem('user')}</span>
                        <GoogleLogout
                            text="Se déconnecter"
                            onLogoutSuccess={() => handleLogout()}
                        />
                    </div>
                    <Main />
                </div>
            </GoogleAPI>,
            document.getElementById("root")
        );
    }
    else {
        ReactDOM.render(
            <GoogleAPI clientId="487523406083-avfllqgnd7j3djv764ftlilj8uphkq81.apps.googleusercontent.com"
                onInitFailure={(response) => alert("Error: " + response)} >
                <div id="login">
                    <h1 id="welcome" className="title">Bienvenue sur Contracts Viewer</h1>
                    <GoogleLogin
                        text="Se connecter"
                        onLoginSuccess={(user) => handleLogin(user)}
                    />
                </div>
            </GoogleAPI>,
            document.getElementById("root")
        );
    }
}
