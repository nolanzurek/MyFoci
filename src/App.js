import "./App.css";
import Group from "./Group.js";
import { useState, useEffect } from "react";

function App() {
  const [curData, setData] = useState([]);

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      console.log("tab has been closed. Saving...");
      localStorage.setItem("savedState", JSON.stringify(curData));
      //return (event.returnValue = "Exited tab");
    };
    const handleTabOpen = (event) => {
      console.log("tab has been opened");
      setData(JSON.parse(localStorage.getItem("savedState")));
      localStorage.clear();
    };
    window.addEventListener("beforeunload", handleTabClose);
    window.addEventListener("load", handleTabOpen);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      window.removeEventListener("load", handleTabOpen);
    };
  });

  return (
    <>
      <h1 className="mainTitle">My Foci</h1>
      {curData.map((group, i) => (
        <Group
          mkey={i}
          key={i}
          title={group.title}
          tasks={group.tasks}
          data={curData}
          mutator={setData}
          className="groupComponent"
        />
      ))}
      <input
        className="newGroupInput"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setData(curData.concat([{ title: event.target.value, tasks: [] }]));
            event.target.value = "";
          }
        }}
      />
    </>
  );
}

export default App;
