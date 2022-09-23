import React, { useEffect } from "react";
import "./Home.css";
import { AiOutlineArrowRight, AiOutlineInfoCircle } from "react-icons/ai";
import { GiCrossMark } from "react-icons/gi";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdGpsFixed } from "react-icons/md";
import { IoNavigateSharp } from "react-icons/io5";
import { BsRecordCircle } from "react-icons/bs";
import { useContext } from "react";
import { DirectionsContext } from "./context/DirectionsContext";
import { ValidationContext } from "./context/ValidationContext";
import { CabContext } from "./context/CabContext";
const center = { lat: 30.611152614665784, lng: 74.25919984309992 };

const GettingStartedPage = ({ setStartingWindow }) => {
  return (
    <>
      <motion.div
        className="home__main"
        initial={{
          x: -200,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
          },
        }}
        exit={{
          x: -200,
          opacity: 1,
        }}
      >
        <motion.h1>Cab Fare Predictor</motion.h1>
        <motion.button
          className="home__main-btn"
          onClick={() => setStartingWindow(false)}
          whileHover={{
            scale: 1.1,
            color: "#222",
            transition: {
              duration: 0.2,
            },
          }}
        >
          Getting started <AiOutlineArrowRight className="home__button-arrow" />
        </motion.button>
      </motion.div>
    </>
  );
};

const FillingDetailsPage = ({ mapProp, infoSection }) => {
  const {
    originRef,
    destinationRef,
    calculateRoute,
    clearRoute,
    directionsResponse,
    distance,
    duration,
    setIsNotLocatedUserLocation,
    oringinLatLng,
    setOriginLatLng,
  } = useContext(DirectionsContext);
  const {
    setSelectTagState,
    calculatePrice,
    errorInSelection,
    errorInDestination,
    errorInOrigin,
    error,
    setError,
    totalCharges,
  } = useContext(ValidationContext);
  const getToTheDefaultMarker = () => {
    mapProp.panTo(center);
  };
  return (
    <>
      <motion.div layout className="home__filling-details-container home__main">
        <div className="getting-location-and-place">
          <div className="input-lable">
            <div className="input">
              <Autocomplete>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Pick up"
                  className={
                    errorInOrigin
                      ? "current-location border-red"
                      : "current-location"
                  }
                  ref={originRef}
                />
              </Autocomplete>
              <button
                onClick={() => {
                  if (!("getlocation" in navigator)) {
                    // setError({
                    //   error: `Broweser doesn't support navigation`,
                    // });
                    alert(`Broweser doesn't support navigation`);
                  } else {
                    setIsNotLocatedUserLocation(false);
                    navigator.geolocation.getCurrentPosition((position) => {
                      const { latitude, longitude } = position.coords;
                      setOriginLatLng({
                        lat: latitude,
                        lng: longitude,
                      });
                    });
                    setIsNotLocatedUserLocation(true);
                  }
                }}
              >
                <MdGpsFixed />
              </button>
            </div>
            <div className="input">
              <Autocomplete>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Drop"
                  className={errorInDestination && "border-red"}
                  ref={destinationRef}
                />
              </Autocomplete>
            </div>
          </div>
          <div className="submit-and-car-type">
            <select
              name="select"
              id="select"
              className={errorInSelection ? "select border-red" : "select"}
              defaultValue="defalutValue"
              onChange={(e) => {
                setSelectTagState({
                  value: e.target.value,
                });
              }}
            >
              <option disabled value="defalutValue">
                Select car type
              </option>
              <option value="SIDAN">SIDAN (no extra charges)</option>
              <option value="MINI">MINI (+100 rs)</option>
              <option value="SUV">SUV (+150 rs)</option>
              <option value="PRIME">PRIME (+200 rs)</option>
              <option value="MUV">MUV (+300 rs)</option>
              <option value="XUV">XUV (+250 rs)</option>
            </select>
            <button
              onClick={() => {
                calculatePrice();
              }}
            >
              Generate bill
            </button>
            <BsRecordCircle className="stop-btn" onClick={clearRoute} />
          </div>
          {error.error && (
            <>
              <div className="error">
                <p>{error.error}</p>
              </div>
            </>
          )}
          {directionsResponse && (
            <>
              <div className="estimated-cost-section">
                <div className="total-km-and-time">
                  <div className="km">
                    <p>Distance: {Math.round(distance / 1000)} km</p>
                  </div>
                  <div className="hrs">
                    <p>Time: {Math.round(duration / 60)} mins</p>
                  </div>
                </div>
                {totalCharges !== 0 && (
                  <>
                    <div className="estimated-money">
                      <p>Estimated bill: {Math.round(totalCharges)}Rs</p>
                      <AiOutlineInfoCircle
                        className="info-btn"
                        onClick={() => {
                          infoSection(true);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          <div className="navigate-to-origin">
            <button>
              <IoNavigateSharp onClick={() => getToTheDefaultMarker()} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Home = () => {
  const { cabs, setCabs, pickUpLong, pickUpLat } = useContext(CabContext);

  useEffect(() => {
    setCabs([
      {
        lat: pickUpLat - 0.02838,
        lng: pickUpLong - 0.0683,
      },
      {
        lat: pickUpLat - 0.048383,
        lng: pickUpLong - 0.0983883,
      },
      {
        lat: pickUpLat - 0.022222,
        lng: pickUpLong - 0,
      },
      {
        lat: pickUpLat - 0.23333,
        lng: pickUpLong - 0.88888,
      },
      {
        lat: pickUpLat - 0.0011111,
        lng: pickUpLong - 0.33333,
      },
    ]);
  }, [pickUpLat, pickUpLong]);
  const appLibraries = ["places"];
  const { directionsResponse } = useContext(DirectionsContext);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: appLibraries,
  });

  const [infoSection, setInfosection] = useState(false);

  const [startingWindow, setStartingWindow] = useState(true);

  const [map, setMap] = useState(/** @type google.maps.Map */ null);

  const variants = {
    initial: {},
    animate: {},
    exit: {},
  };

  return (
    <>
      <div className="home__container">
        <div className="home__bg"></div>
        <motion.div className="home__content-container">
          {startingWindow ? (
            <>
              <GettingStartedPage setStartingWindow={setStartingWindow} />
            </>
          ) : (
            <>
              <FillingDetailsPage mapProp={map} infoSection={setInfosection} />
            </>
          )}
        </motion.div>
        <div className="home__map-container">
          {!isLoaded ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            <>
              <div className="home__map-main">
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                  }}
                  center={center}
                  zoom={17}
                  options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                  onLoad={(map) => {
                    setMap(map);
                  }}
                >
                  {/* <Marker position={center} /> */}
                  {directionsResponse && (
                    <>
                      <DirectionsRenderer directions={directionsResponse} />
                      {cabs.map((item, index) => {
                        return (
                          <Marker
                            position={item}
                            key={toString(index)}
                            icon={{
                              url: "https://i.imgur.com/t7ZS4pU.png",
                              /* eslint-disable */
                              anchor: new google.maps.Point(17, 46),
                              /* eslint-disable */
                              scaledSize: new google.maps.Size(37, 37),
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </GoogleMap>
              </div>
            </>
          )}
        </div>
      </div>

      {infoSection && (
        <>
          <div className="pop-up">
            <div
              className="cross"
              onClick={() => {
                setInfosection(false);
              }}
            >
              <GiCrossMark className="real-cross" />
            </div>
            <p className="heading">Estimation is based upon:</p>
            <div className="cost">
              <p>Per km charge = 4Rs</p>
              <p>Car type chose by you</p>
              <p>Time depending upon A.M. or P.M.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
