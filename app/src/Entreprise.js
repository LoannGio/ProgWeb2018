import React, { Component } from "react";

class Entreprise extends Component {
    constructor(props) {
        super(props);
        this.state = { entrepriseData: [] };
    }

    componentDidMount() {
        let entrepriseSIRET = this.getentrepriseSIRETFromUrl();
        if (typeof entrepriseSIRET === "undefined") {
            entrepriseSIRET = sessionStorage.getItem('siret');
        } else {
            sessionStorage.setItem('siret', entrepriseSIRET);
        }
        if (entrepriseSIRET !== null) {
            const URL = "https://entreprise.data.gouv.fr/api/sirene/v1/siret/" + entrepriseSIRET;
            fetch(URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => this.setState({ entrepriseData: json.etablissement }))
                .catch(function (error) {
                    console.log("ERROR : " + error);
                });
        }
    }

    updateEntrepriseData(newData) {
        this.setState({ entrepriseData: newData });
    }

    getentrepriseSIRETFromUrl() {
        let entrepriseSIRET = window.location.href.split('entreprise/')[1];
        return entrepriseSIRET;
    }

    render() {
        if (typeof this.state.entrepriseData === "undefined" || this.state.entrepriseData.length === 0) {
            return (
                <div id="entrepriseData">
                    <p>Veuillez sélectionner une entreprise sur la carte des Contrats.</p>
                </div>
            );
        } else {
            return (
                <div id="entrepriseData">
                    <p id="nameEntreprise">{this.state.entrepriseData.nom_raison_sociale}</p>
                    <table id="tableEntreprise">
                        <tbody>
                            <tr>
                                <th>Siret</th>
                                <td>{this.state.entrepriseData.siret}</td>
                            </tr>
                            <tr>
                                <th>Adresse</th>
                                <td>{this.state.entrepriseData.geo_adresse}</td>
                            </tr>
                            <tr>
                                <th>Activité principale</th>
                                <td>{this.state.entrepriseData.libelle_activite_principale}</td>
                            </tr>
                            <tr>
                                <th>Effectifs</th>
                                <td>{this.state.entrepriseData.libelle_tranche_effectif_salarie}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Entreprise;
