import Task from "./Task.js";
import React, { useState } from "react";

function Group(props) {
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
        {props.tasks.map((task, i) => (
          <li key={i} className="taskListItem">
            <div className="taskDiv">
              <button
                className="closeButton"
                title={task}
                mkey={i}
                onClick={(event) => {
                  props.mutator(
                    props.data.map((obj, k) => {
                      if (obj.title === props.title && k === props.mkey) {
                        return {
                          title: obj.title,
                          tasks: obj.tasks.filter(
                            (task2, j) =>
                              task2 !== event.target.title || j !== i
                          ),
                        };
                      } else {
                        return obj;
                      }
                    })
                  );
                }}
              >
                ❌
              </button>
              <Task key={i} title={task} className="taskComponent" />
            </div>
          </li>
        ))}

        <li>
          <input
            onKeyPress={(event) => {
              if (event.key === "Enter" && event.target.value != "") {
                props.mutator(
                  props.data.map((obj, k) => {
                    if (obj.title === props.title && k === props.mkey) {
                      return {
                        title: obj.title,
                        tasks: obj.tasks.concat([event.target.value]),
                      };
                    } else {
                      return obj;
                    }
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
