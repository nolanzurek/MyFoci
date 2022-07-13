import Task from "./Task.js";
import React, { useState } from "react";

function Group(props) {
  const [curTasks, setTasks] = useState([]);
  const [curHidden, setHidden] = useState(true);
  return (
    <div className="group">
      <div className="GroupTitleDiv">
        <h2
          className="groupTitle"
          id={"tasksTitle" + props.mkey}
          onClick={() => {
            let toHide = document.getElementById("tasksUl" + props.mkey);
            toHide.style.display = curHidden ? "none" : "block";
            let toRound = document.getElementById("tasksTitle" + props.mkey);
            toRound.style.borderRadius = curHidden ? "7px" : "7px 7px 0px 0px";
            setHidden(!curHidden);
          }}
        >
          {props.title}
        </h2>
        <p className="upDownIndicator">{curHidden ? "" : "🡇"}</p>
      </div>
      <ul className="tasklist" id={"tasksUl" + props.mkey}>
        {curTasks.map((task, i) => (
          <li key={i} className="taskListItem">
            <div className="taskDiv">
              <button
                className="closeButton"
                onClick={() => {
                  setTasks(
                    curTasks
                      .filter((item) => item.key != i)
                      .map((item, i) => ({
                        task: item.task,
                        key: i,
                      }))
                  );
                }}
              >
                ❌
              </button>
              <Task key={i} title={task.task} className="taskComponent" />
            </div>
          </li>
        ))}

        <li>
          <input
            onKeyPress={(event) => {
              if (event.key === "Enter" && event.target.value != "") {
                setTasks(
                  curTasks.concat({
                    task: [event.target.value],
                    key: curTasks.length,
                  })
                );
                event.target.value = "";
              }
            }}
          />
        </li>
      </ul>
    </div>
  );
}

export default Group;
