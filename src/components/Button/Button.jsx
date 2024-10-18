import React from "react";
import "./Button.css";

const Button = ({
  textoBoton,
  onClickFunction,
  backgroundColor,
  colorText,
  margin, 
  height
}) => {
  return (
    //hover D43F3a
    <div
      className={"button"}
      onClick={onClickFunction}
      style={{
        ...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
        ...(colorText ? { color: colorText } : {}),
        ...(margin ? {margin: margin } : {}),
        ...(height ? {height: height } : {})
      }}
    >
      {textoBoton}
    </div>
  );
};

export default Button;
