import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAuJYLmzmglhCpBYTn0BjbJhjWYg0fPEEA");

Geocode.setLanguage("en");

Geocode.setRegion("es");

Geocode.setLocationType("ROOFTOP");

Geocode.enableDebug();

export const getAddress = async (lat, lng) => {
  const res = await Geocode.fromLatLng(lat, lng);
  console.log(res);
  // const address = res.results[0].formatted_address;
  // return address;
  return res;
};
