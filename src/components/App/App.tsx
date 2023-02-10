import React from "react";
import PersonList from "../PersonList";
import "./App.css";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <div className="App-body">
        <PersonList/>
      </div>
    </div>
  );
};

export default App;
