import React, { Component } from "react";
import MyMap from "./MyMap";
import RangeSlider from "./RangeSlider";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class Contrats extends Component {
  constructor(props) {
    super(props);
    this.state = { contracts: [], filter: []};
  }

  initFilter(){
    let _filter = {};
    this.loadPrice(_filter);
    this.loadDates(_filter);
    this.setState({filter: _filter});
  }

  loadPrice(filter) {
    if (sessionStorage.getItem('lowestPrice') === null || sessionStorage.getItem('lowestPrice') === "") {
      filter.lowestPrice = 1000;
      sessionStorage.setItem('lowestPrice', filter.lowestPrice);
    }
    else {
      filter.lowestPrice = parseInt(sessionStorage.getItem('lowestPrice'));
    }

    if (sessionStorage.getItem('highestPrice') === null || sessionStorage.getItem('highestPrice') === "") {
      filter.highestPrice = 100000;
      sessionStorage.setItem('highestPrice', filter.highestPrice);
    }
    else {
      filter.highestPrice = parseInt(sessionStorage.getItem('highestPrice'));
    }
  }

  loadDates(filter) {
    if (sessionStorage.getItem('startDate') === null || sessionStorage.getItem('startDate') === "") {
      let _startDate = new Date();
      filter.startDate =  _startDate.getMonth() + 1 + '/' + _startDate.getDate() + '/' + _startDate.getFullYear();
      sessionStorage.setItem('startDate', filter.startDate);
    }
    else {
      filter.startDate = sessionStorage.getItem('startDate');
    }

    if (sessionStorage.getItem('endDate') === null || sessionStorage.getItem('endDate') === "") {
      let _endDate = new Date();
      _endDate.setDate(_endDate.getDate() + 1);
      filter.endDate = _endDate.getMonth() + 1 + '/' + _endDate.getDate() + '/' + _endDate.getFullYear();
      sessionStorage.setItem('endDate', filter.endDate);
    }
    else {
      filter.endDate= sessionStorage.getItem('endDate');
    }
  }

  componentDidMount() {
    this.initFilter();
    const filter = this.state.filter;
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
        {this.state.filter.lowestPrice} - {this.state.filter.highestPrice}
        
        <RangeSlider onChange={this.handleChange} sliderValues={[this.state.filter.lowestPrice, this.state.filter.highestPrice]} />
        <MyMap contracts={this.state.contracts} />
      </div>
    );
  }
}

export default Contrats;
