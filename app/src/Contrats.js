import React, { Component } from "react";
import MyMap from "./MyMap";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { margin: 50 };

class Contrats extends Component {
    constructor(props){
      super(props);
      this.state = { contracts: [], filter: []};
      this.loadContracts();
    }

      async loadContracts(){
      let startDate = new Date().setFullYear(2018,12,12);
      let endDate = new Date().setFullYear(2019,12,12);
      const filter = {
        startDate: startDate,
        endDate: endDate,
        lowestPrice:10,
        highestPrice:10000000
      };
      const URL = "http://127.0.0.1:5000/contracts"
      let result = await fetch(URL, {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
           'Accept': 'application/json'
        },
        body: JSON.stringify(filter)
      })
      .then(function (res) {
            return res.json();
      })
      .then(function (contracts) {
            return contracts;
      }).catch(function(error){
        console.log(error);
      });
      this.state.contracts = result;
    }

    render() {
        return (
            <div>
                <MyMap contracts={this.state.contracts}/>
                <div style={wrapperStyle}>
                    <p>Afficher les montants compris entre : </p>
                    <Range min={0} max={200000} defaultValue={[1000, 100000]} step={500} marks={{0:'0 €', 50000:'50 000 €', 100000:'100 000 €', 150000:'150 000 €', 200000:'200 000 €'}} tipFormatter={value => `${value}€`} />
                </div>
            </div>
        );
    }
}

export default Contrats;
