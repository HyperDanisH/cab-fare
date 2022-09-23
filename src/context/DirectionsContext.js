import * as React from "react";

export const DirectionsContext = React.createContext();
const DirectonsProvider = ({ children }) => {
  const [directionsResponse, setDirectionResponse] = React.useState(null);
  const [distance, setDistance] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [oringinLatLng, setOriginLatLng] = React.useState({
    lat: "",
    lng: "",
  });
  const [isLoadedUserLocation, setIsNotLocatedUserLocation] =
    React.useState(null);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = React.useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = React.useRef();

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  const value = {
    directionsResponse,
    setDirectionResponse,
    distance,
    setDistance,
    duration,
    setDuration,
    originRef,
    destinationRef,
    setOriginLatLng,
    oringinLatLng,
    // calculateRoute,
    clearRoute,
    isLoadedUserLocation,
    setIsNotLocatedUserLocation,
  };
  return (
    <>
      <DirectionsContext.Provider value={value}>
        {children}
      </DirectionsContext.Provider>
    </>
  );
};

export default DirectonsProvider;
