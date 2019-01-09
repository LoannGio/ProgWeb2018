import React, { Component } from "react";
import MyMap from "./MyMap";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { margin: 50 };

class Contrats extends Component {
  constructor(props) {
    super(props);
    this.state = { contracts: [], filter: [] };
    this.loadDates();
  }

  loadDates(){
    if(typeof sessionStorage.getItem('startDate') == 'undefined'){
      let _startDate = new Date();
      let stringStartDate = _startDate.getMonth()+1 + '/' + _startDate.getDate() + '/' + _startDate.getFullYear();
      this.setState({filter : {startDate : stringStartDate}});
      sessionStorage.setItem('startDate', this.state.filter.startDate);
    }
    else{
      this.setState({filter : {startDate: sessionStorage.getItem('startDate')}});
    }

    if(typeof sessionStorage.getItem('endDate') == 'undefined'){
      let _endDate = new Date();
      _endDate.setDate(_endDate.getDate() + 1);   
      let stringEndDate = _endDate.getMonth()+1 + '/' + _endDate.getDate() + '/' + _endDate.getFullYear();
      this.setState({filter : {endDate : stringEndDate}});
      sessionStorage.setItem('endDate', this.state.filter.endDate);
    }
    else{
      this.setState({filter : {endDate: sessionStorage.getItem('endDate')}});
    }
  }

  componentDidMount() {
    const filter = {
      startDate: this.state.filter.startDate,
      endDate: this.state.filter.endDate,
      lowestPrice: 10,
      highestPrice: 10000000
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
        <MyMap contracts={this.state.contracts} />
        <div style={wrapperStyle}>
          <p>Afficher les montants compris entre : </p>
          <Range min={0} max={200000} defaultValue={[1000, 100000]} step={500} marks={{ 0: '0 €', 50000: '50 000 €', 100000: '100 000 €', 150000: '150 000 €', 200000: '200 000 €' }} tipFormatter={value => `${value}€`} />
          <DateRangePicker startDate={this.state.filter.startDate} endDate={this.state.filter.endDate}>
            <button id='datePicker' class='btn btn-primary'>Open Date Picker</button>
          </DateRangePicker>
        </div>
      </div>
    );
  }
}

export default Contrats;
