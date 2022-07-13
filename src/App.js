import "./App.css";
import Group from "./Group.js";
import { useState } from "react";

function App() {
  const [curGroups, setGroups] = useState([]);

  return (
    <>
      <h1 className="mainTitle">My Foci</h1>
      {curGroups.map((group, i) => (
        <Group mkey={i} key={i} title={group} className="groupComponent" />
      ))}
      <input
        className="newGroupInput"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setGroups(curGroups.concat([event.target.value]));
            event.target.value = "";
          }
        }}
      />
    </>
  );
}

export default App;
