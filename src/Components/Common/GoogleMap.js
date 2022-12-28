import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useState } from "react";

export const MapContainer = (props) => {
  const [state, setState] = useState({
    lat: 33.5753867,
    lng: 71.5753867,
  });

  const style = {
    width: "100%",
    height: "100%",
  };

  const mapclicked = (mapProps, map, coord) => {
    setState({
      lat: coord.latLng.lat(),
      lng: coord.latLng.lng(),
    });
    props.eventMapClicked(state);
  };

  return (
    <div style={{ width: "100%", position: "relative", height: "400px" }}>
      <Map
        initialCenter={{
          lat: state.lat,
          lng: state.lng,
        }}
        onClick={mapclicked}
        google={props.google}
        style={style}
        zoom={10}
      >
        <Marker
          position={{
            lat: state.lat,
            lng: state.lng,
          }}
          name={"Position"}
        />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAuJYLmzmglhCpBYTn0BjbJhjWYg0fPEEA",
})(MapContainer);
