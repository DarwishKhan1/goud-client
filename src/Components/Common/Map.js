import React, { Component } from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

class Map extends Component {
  state = {
    selected: {
      lat: 0,
      lng: 0,
    },
    employees: [],
  };

  componentDidMount = () => {
    this.setState({
      selected: {
        lat: this.props.latitude ? this.props.latitude : 0,
        lng: this.props.longitude ? this.props.longitude : 0,
      },
      employees: this.props.employees,
    });
  };

  mapclicked = (coord) => {
    this.setState({
      selected: {
        lat: coord.latLng.lat(),
        lng: coord.latLng.lng(),
      },
    });

    this.props.eventMapClicked(this.state.selected);
  };

  map = () => {
    return (
      <div>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{
            lat:
              this.state.selected.lat > 0
                ? this.state.selected.lat
                : 33.5753867,
            lng:
              this.state.selected.lng > 0
                ? this.state.selected.lng
                : 71.5753867,
          }}
          onClick={this.mapclicked}
        >
          <Marker
            position={{
              lat:
                this.state.selected.lat > 0
                  ? this.state.selected.lat
                  : 33.5753867,
              lng:
                this.state.selected.lng > 0
                  ? this.state.selected.lng
                  : 71.5753867,
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green.png",
              scale: 5,
            }}
            title={"Alarm"}
          />
        </GoogleMap>
      </div>
    );
  };
  render() {
    const WrappedMap = withScriptjs(withGoogleMap(this.map));
    return (
      <div className="mt-1 mb-4 mx-auto">
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAuJYLmzmglhCpBYTn0BjbJhjWYg0fPEEA&libraries=places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `550px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
