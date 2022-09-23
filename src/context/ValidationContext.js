import * as React from "react";
import { CabContext } from "./CabContext";
import { DirectionsContext } from "./DirectionsContext";

export const ValidationContext = React.createContext();

const ValidationProvider = ({ children }) => {
  const {
    originRef,
    destinationRef,
    // directionsResponse,
    // distance,
    // duration,
    setDuration,
    setDistance,
    setDirectionResponse,
  } = React.useContext(DirectionsContext);

  const { setPickUpLat, setPickUpLong } = React.useContext(CabContext);
  const [error, setError] = React.useState({
    error: null,
  });
  const [errorInSelection, setErrorInSelection] = React.useState(false);
  const [errorInOrigin, setErrorInOrigin] = React.useState(false);
  const [errorInDestination, setErrorInDestination] = React.useState(false);
  const carCharges = {
    SIDAN: 0,
    MINI: 100,
    SUV: 150,
    PRIME: 200,
    MUV: 300,
    XUV: 250,
  };
  const chargePerKm = 4;
  const [totalCharges, setTotalCharges] = React.useState(0);
  const [selectTagState, setSelectTagState] = React.useState({
    value: null,
  });

  const calculatePrice = async () => {
    if (selectTagState.value === null) {
      setError({
        error: "Please select a car model",
      });
      setErrorInSelection(true);
      return;
    } else if (originRef.current.value === "") {
      setError({
        error: "Please select a pick up location",
      });
      setErrorInOrigin(true);
      //   return;
    } else if (destinationRef.current.value === "") {
      setError({
        error: "Please select a destination",
      });
      setErrorInDestination(true);
      return;
    }
    setError({
      error: null,
    });
    setErrorInDestination(false);
    setErrorInOrigin(false);
    setErrorInSelection(false);

    const carChargePerRide = carCharges[selectTagState.value];
    // calculateRoute();

    if ((originRef.current.value === "", destinationRef.current.value === "")) {
      return;
    }
    const center = { lat: 30.611152614665784, lng: 74.25919984309992 };
    /* eslint-disable */
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value !== "" ? originRef.current.value : center,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    setPickUpLat(results && results.routes[0].legs[0].start_location.lat());
    setPickUpLong(results && results.routes[0].legs[0].start_location.lng());
    setDistance(results.routes[0].legs[0].distance.value);
    setDuration(results.routes[0].legs[0].duration.value);
    setTotalCharges(
      (results.routes[0].legs[0].distance.value / 1000) * chargePerKm +
        carChargePerRide
    );
  };

  const value = {
    selectTagState,
    setSelectTagState,
    calculatePrice,
    error,
    errorInSelection,
    errorInOrigin,
    errorInDestination,
    totalCharges,
  };

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationProvider;
