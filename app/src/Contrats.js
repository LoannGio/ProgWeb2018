import React, { Component } from "react";
import MyMap from "./MyMap";
import RangeSlider from "./RangeSlider";

class Contrats extends Component {
  constructor(props) {
    super(props);
    this.state = { contracts: [], filter: [] };
    this.loadPrice();
  }

  loadPrice() {
    
  }

  componentDidMount() {
    let startDate = new Date().setFullYear(2018, 12, 12);
    let endDate = new Date().setFullYear(2019, 12, 12);
    const filter = {
      startDate: startDate,
      endDate: endDate,
      lowestPrice: this.state.lowestPrice,
      highestPrice: this.state.highestPrice
    };
    const URL = "http://127.0.0.1:5000/contracts"
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(filter)
    })
      .then(res => res.json())
      .then(json => this.setState({ contracts: json }))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.filter[0]} - {this.state.filter[1]}
        <RangeSlider onChange={this.handleChange} sliderValues={this.state.filter}/>
        <MyMap contracts={this.state.contracts} />
      </div>
    );
  }
}

export default Contrats;
