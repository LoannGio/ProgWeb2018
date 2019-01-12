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
    this.onChangeRangeSlider = this.onChangeRangeSlider.bind(this);
  }

  async componentDidMount() {
    await this.initFilter();
    await this.requestContractsAPI();
  }

  requestContractsAPI() {
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

  async onApplyDateRangePicker(event, resp) {
    let istartDate = +resp.startDate._d;
    let iendDate = +resp.endDate._d;
    await this.setState({ filter: { startDate: istartDate, endDate: iendDate, lowestPrice: this.state.filter.lowestPrice, highestPrice: this.state.filter.highestPrice } });
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
    const default_lowestPrice = 0;
    const default_highestPrice = 200000;
    if (sessionStorage.getItem('lowestPrice') === null || sessionStorage.getItem('lowestPrice') === "") {
      filter.lowestPrice = default_lowestPrice;
      sessionStorage.setItem('lowestPrice', filter.lowestPrice);
    }
    else {
      filter.lowestPrice = parseInt(sessionStorage.getItem('lowestPrice'));
    }

    if (sessionStorage.getItem('highestPrice') === null || sessionStorage.getItem('highestPrice') === "") {
      filter.highestPrice = default_highestPrice;
      sessionStorage.setItem('highestPrice', filter.highestPrice);
    }
    else {
      filter.highestPrice = parseInt(sessionStorage.getItem('highestPrice'));
    }
  }

  loadDates(filter) {
    const default_startDate = new Date().setFullYear(2016,0,1);
    const default_endDate = new Date().setFullYear(2020,11,31);
    if (sessionStorage.getItem('startDate') === null || sessionStorage.getItem('startDate') === "") {
      filter.startDate = default_startDate;
      sessionStorage.setItem('startDate', +filter.startDate);
    }
    else {
      filter.startDate = parseInt(sessionStorage.getItem('startDate'));
    }

    if (sessionStorage.getItem('endDate') === null || sessionStorage.getItem('endDate') === "") {
      filter.endDate = default_endDate;
      sessionStorage.setItem('endDate', +filter.endDate);
    }
    else {
      filter.endDate = parseInt(sessionStorage.getItem('endDate'));
    }
  }

  intDate_to_stringDate(idate) {
    let date = new Date(idate);
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }

  async onChangeRangeSlider(range) {
    let _lowestPrice = range[0];
    let _highestPrice = range[1];
    await this.setState({ filter: { startDate: this.state.filter.startDate, endDate: this.state.filter.endDate, lowestPrice: _lowestPrice, highestPrice: _highestPrice } });
    sessionStorage.setItem('lowestPrice', _lowestPrice);
    sessionStorage.setItem('highestPrice', _highestPrice);
    this.requestContractsAPI();
  }

  render() {
    let str_startDate = this.intDate_to_stringDate(this.state.filter.startDate);
    let str_endDate = this.intDate_to_stringDate(this.state.filter.endDate);
    if (typeof this.state.filter.lowestPrice !== 'undefined') {
      return (
        <div id="contracts">
          <div id="filters">
          <p id="contractsFound">{this.state.contracts.length} contrat(s) trouvé(s)</p>
            <DateRangePicker startDate={str_startDate} endDate={str_endDate} onApply={this.onApplyDateRangePicker}>
              <button id='datePicker' className='btn btn-primary'>{str_startDate} - {str_endDate}</button>
            </DateRangePicker>
            <RangeSlider onChange={this.onChangeRangeSlider} sliderValues={[this.state.filter.lowestPrice, this.state.filter.highestPrice]} />
          </div>
          <div id="map">
            <MyMap contracts={this.state.contracts} />
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default Contrats;
