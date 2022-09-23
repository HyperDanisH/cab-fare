import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import DirectonsProvider from "./context/DirectionsContext";
import CabProvider from "./context/CabContext";
import ValidationProvider from "./context/ValidationContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DirectonsProvider>
        <CabProvider>
          <ValidationProvider>
            <App />
          </ValidationProvider>
        </CabProvider>
      </DirectonsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
