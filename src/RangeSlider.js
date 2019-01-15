import React, { Component } from "react";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class RangeSlider extends Component {

  render() {
    return (
      <div id="priceSlider">
        <p>Montants entre {this.props.sliderValues[0]}€ et {this.props.sliderValues[1]}€</p>
        <Range
          min={0}
          max={200000}
          step={500}
          onChange={this.props.onChange}
          defaultValue={this.props.sliderValues}
          marks={{ 0: '0 €', 50000: '50 000 €', 100000: '100 000 €', 150000: '150 000 €', 200000: '200 000 €' }}
          tipFormatter={value => `${value}€`}
        />
      </div>
    );
  }
}

export default RangeSlider;