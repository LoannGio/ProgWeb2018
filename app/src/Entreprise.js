import React, { Component } from "react";

class Entreprise extends Component {
    constructor(props){
        super(props);
        this.state = {entrepriseData : []};
    }

    componentDidMount(){
        let entrepriseSIRET = this.getentrepriseSIRETFromUrl();
        if(typeof entrepriseSIRET == "undefined"){
            entrepriseSIRET = sessionStorage.getItem('siret');
        }else{
            sessionStorage.setItem('siret', entrepriseSIRET);
        }
        const URL = "https://entreprise.data.gouv.fr/api/sirene/v1/siret/" + entrepriseSIRET;
        fetch(URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => this.setState({entrepriseData : json.etablissement}))
        .catch(function(error){
            console.log("ERROR : " + error);
        });
    }

    updateEntrepriseData(newData){
        this.setState({entrepriseData : newData});
    }

    getentrepriseSIRETFromUrl() {
        let entrepriseSIRET = window.location.href.split('entreprise/')[1];
        return entrepriseSIRET;
    }

    render() {
        return (
            <div id="entrepriseData">
                <p>Siret : {this.state.entrepriseData.siret}</p>
                <p>Nom : {this.state.entrepriseData.nom_raison_sociale}</p>
                <p>Adresse : {this.state.entrepriseData.geo_adresse}</p>
                <p>Activité principale : {this.state.entrepriseData.libelle_activite_principale}</p>
                <p>Effectifs : {this.state.entrepriseData.libelle_tranche_effectif_salarie}</p>
            </div>
        );
    }
}

export default Entreprise;
