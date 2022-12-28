import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: "",

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375,
      },
    };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });

    geocodeByAddress(address)
      .then(async(results) => {
        let city = "";
        for (const obj in results[0].address_components) {
          if (results[0].address_components[obj].types.includes("locality")) {
            city = results[0].address_components[obj].long_name;
          }
        }
        const location = await getLatLng(results[0]);
        return { city, ...location };
      })
      .then((latLng) => {
        this.props.selectedLocation({ address, ...latLng });
        this.setState({ mapCenter: latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    const containerStyle = {
      position: "absolute",
      width: "97%",
      height: "85%",
    };
    return (
      <div id="googleMaps">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input form-control",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <div style={{ height: "400px", margin: "20px 0px" }}>
          <Map
            style={containerStyle}
            google={this.props.google}
            initialCenter={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
            center={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
          >
            <Marker
              position={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng,
              }}
            />
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAuJYLmzmglhCpBYTn0BjbJhjWYg0fPEEA",
})(MapContainer);
