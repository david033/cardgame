import React from "react";
import "./App.css";
import Newgame from "./components/newgame";
import Cards from "./components/cards";

function App() {
  return (
    <div className="App">
      <Newgame />
      <Cards />
    </div>
  );
}

export default App;
