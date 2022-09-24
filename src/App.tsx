import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import "./styles/index.scss";
import ContentWrapper from "./ContentWrapper";
import Setting from "./Setting";

function App() {
  return (
    <div className="App">
      <ContentWrapper />
      <Setting />
    </div>
  );
}

export default App;
