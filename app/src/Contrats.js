import React, { Component } from "react";
import MyMap from "./MyMap";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { margin: 50 };

class Contrats extends Component {

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