import React, { Component } from "react";

class Entreprise extends Component {

    getEntrepriseName() {
        let entrepriseName = window.location.href.split('/');
        return entrepriseName[entrepriseName.length - 1];
    }

    render() {
        let entrepriseName = this.getEntrepriseName();
        if (entrepriseName == 'entreprise') {
            return (
                <p>Cliquez sur un marqueur sur la carte, puis cliquez sur le nom de l'entreprise qui s'affiche pour obtenir ses informations !</p>
            );
        }
        else {
            return (
                <div>
                    <p>{this.getEntrepriseName()}</p>
                    <p>Multitude d'informations</p>
                </div>
            );
        }
    }
}

export default Entreprise;