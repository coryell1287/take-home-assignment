import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Main } from "./Main";
import { ErrorBoundary } from "./ErrorBoundary";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <header className="App-header">
        <img
          src="https://digital.ai/themes/custom/digitalai/svg/DAI%20Logo%20Light.svg"
          alt="digital-ai-logo"
        />
        <p style={{ color: "#649A3D" }}>
          Image Container take-home assignment.
        </p>
      </header>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </div>
  );
}

export default App;
