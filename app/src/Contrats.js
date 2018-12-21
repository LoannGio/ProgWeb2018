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
    }

     componentDidMount(){
      let startDate = new Date();
      let endDate = startDate.getFullYear()+1;
      const filter = {
        startDate: startDate,
        endDate: endDate,
        lowestPrice:10,
        highestPrice:10000000
      };
      const URL = "http://127.0.0.1:5000/contracts"
       fetch(URL, {
        method: 'POST',
        mode:'no-cors',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        })
      })
      .then(function (res) {
            return res.json();
      })
      .then(function (contracts) {
            console.log("CONTRACTS FOUND : " + contracts);
            this.setState({contracts});
            console.log("LOADED : " + this.state.contracts);
      }).catch(function(error){
        console.log(error);
      });
    }

    render() {
        return (
            <div>
                <MyMap />
                <div style={wrapperStyle}>
                    <p>Afficher les montants compris entre : </p>
                    <Range min={0} max={200000} defaultValue={[1000, 100000]} step={500} marks={{0:'0 €', 50000:'50 000 €', 100000:'100 000 €', 150000:'150 000 €', 200000:'200 000 €'}} tipFormatter={value => `${value}€`} />
                </div>
            </div>
        );
    }
}

export default Contrats;
