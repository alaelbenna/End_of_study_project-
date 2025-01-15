import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 36.8065, // Replace with your latitude
    lng: 10.1815, // Replace with your longitude
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Stadium Location</h2>
      <LoadScript googleMapsApiKey="AIzaSyBGsp74Dnuujf420FY9KHuOltJ3RmWk--M">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
