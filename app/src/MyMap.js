import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class MyMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 46.7167,
      lng: 2.5167,
      zoom: 6
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[48.833154, 2.294293]}>
          <Popup>
            <a href={'/entreprise/ORANGE'}>ORANGE</a>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default MyMap;
