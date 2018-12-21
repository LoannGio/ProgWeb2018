import React, { Component } from "react";
import MyMap from "./MyMap";

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
                <h2>Contrats</h2>
                <MyMap />

                <p>Filtre prodigieux en construction</p>
            </div>
        );
    }
}

export default Contrats;
