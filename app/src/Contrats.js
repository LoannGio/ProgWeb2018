import React, { Component } from "react";
import MyMap from "./MyMap";
import RangeSlider from "./RangeSlider";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class Contrats extends Component {
  constructor(props) {
    super(props);
    this.state = { contracts: [], filter: [] };
    this.onApplyDateRangePicker = this.onApplyDateRangePicker.bind(this);
  }

  async componentDidMount() {
    await this.initFilter();
    await this.requestContractsAPI();
  }

  requestContractsAPI(){
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
  
  async onApplyDateRangePicker(event, resp){
    let istartDate = +resp.startDate._d;
    let iendDate = +resp.endDate._d;
    await this.setState({filter:{startDate:istartDate, endDate:iendDate, lowestPrice:this.state.filter.lowestPrice, highestPrice:this.state.filter.highestPrice}});
    sessionStorage.setItem('startDate', istartDate);
    sessionStorage.setItem('endDate', iendDate);
    this.requestContractsAPI();
  }

  
  async initFilter() {
    let _filter = {};
    this.loadPrice(_filter);
    this.loadDates(_filter);
    await this.setState({ filter: _filter });
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
      filter.startDate = new Date();
      sessionStorage.setItem('startDate', +filter.startDate);
    }
    else {
      filter.startDate = parseInt(sessionStorage.getItem('startDate'));
    }

    if (sessionStorage.getItem('endDate') === null || sessionStorage.getItem('endDate') === "") {
      let _endDate = new Date();
      _endDate.setDate(_endDate.getDate() + 1);
      filter.endDate = _endDate;
      sessionStorage.setItem('endDate', +filter.endDate);
    }
    else {
      filter.endDate = parseInt(sessionStorage.getItem('endDate'));
    }
  }
  
  intDate_to_stringDate(idate){
    let date = new Date(idate);
    return date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
  }

  render() {
    let str_startDate = this.intDate_to_stringDate(this.state.filter.startDate);
    let str_endDate = this.intDate_to_stringDate(this.state.filter.endDate);
    return (
      <div>
        <p>{this.state.contracts.length} contrat(s) trouvé(s)</p>
        {this.state.filter.lowestPrice} - {this.state.filter.highestPrice}
        <DateRangePicker startDate={str_startDate} endDate={str_endDate} onApply={this.onApplyDateRangePicker}>
          <button id='datePicker' className='btn btn-primary'>{str_startDate} - {str_endDate}</button>
        </DateRangePicker>
        <RangeSlider onChange={this.handleChange} sliderValues={[this.state.filter.lowestPrice, this.state.filter.highestPrice]} />
        <MyMap contracts={this.state.contracts} />
      </div>
    );
  }
}

export default Contrats;
