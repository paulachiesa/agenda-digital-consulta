import "./MiniSpinner.css";
import React from "react";

const MiniSpinner = ({spinnerRow = false}) => {
  const miniSpinnerSize = spinnerRow ? 
  {width: '20px', height: '20px'} : {width: '29px', height: '29px'};

  return <div className="loader" style={miniSpinnerSize}></div>;
};

export default MiniSpinner;