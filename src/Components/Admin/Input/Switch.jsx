import React from "react";
import "./styles.css";

const Switch = (props) => {
  return (
    <>
      {props.bool ? (
        <div className="form-check form-switch center">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckCheckedDisabled"
            checked
            disabled
          />
        </div>
      ) : (
        <div className="form-check form-switch center">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDisabled"
            disabled
          />
        </div>
      )}
    </>
  );
};

export { Switch };
