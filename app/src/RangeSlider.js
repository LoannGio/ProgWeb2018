import React, { Component } from "react";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const wrapperStyle = { margin: 50 };

class RangeSlider extends Component {
  state = { sliderValues: this.props.sliderValues };

  handleChange = sliderValues => {
    this.setState({ sliderValues });
  };

  render() {
    const { sliderValues } = this.state;
    return (
      <div style={wrapperStyle}>
        {sliderValues[0]} - {sliderValues[1]}
        <p>Afficher les montants compris entre : </p>
        <Range
          min={0}
          max={200000}
          step={500}
          onChange={this.handleChange}
          defaultValue={sliderValues}
          marks={{ 0: '0 €', 50000: '50 000 €', 100000: '100 000 €', 150000: '150 000 €', 200000: '200 000 €' }}
          tipFormatter={value => <span className="tooltip">{value}€</span>}
        />
      </div>
    );
  }
}

export default RangeSlider;