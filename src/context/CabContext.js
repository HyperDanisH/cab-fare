import * as React from "react";

export const CabContext = React.createContext();

const CabProvider = ({ children }) => {
  const [pickUpLat, setPickUpLat] = React.useState();
  const [pickUpLong, setPickUpLong] = React.useState();

  const [cabs, setCabs] = React.useState([]);

  const value = {
    pickUpLat,
    setPickUpLat,
    setPickUpLong,
    pickUpLong,
    cabs,
    setCabs,
  };
  return <CabContext.Provider value={value}>{children}</CabContext.Provider>;
};

export default CabProvider;
