import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = { center: [] };
    this.state.center = {
      lat: 46.7167,
      lng: 2.5167,
      zoom: 6
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.contracts !== props.contracts) {
      this.props = props;
      this.forceUpdate();
    }
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    return (
      <Map center={position} zoom={this.state.center.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.contracts.map((el, index) => (
          <Marker key={index} position={[el.lat, el.lng]}>
            <Popup>
              <NavLink to={'/entreprise/' + el.siret}>{el.name}</NavLink>
              <p>Montant : {el.amount}€</p>
              <p>Date : {new Date(el.date).toDateString()}</p>
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default MyMap;
