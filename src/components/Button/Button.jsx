import React from "react";
import "./Button.css";

const Button = ({
  textoBoton,
  onClickFunction,
  backgroundColor,
  colorText,
  margin
}) => {
  return (
    //hover D43F3a
    <div
      className={"button"}
      onClick={onClickFunction}
      style={{
        ...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
        ...(colorText ? { color: colorText } : {}),
        ...(margin ? {margin: margin } : {})
      }}
    >
      {textoBoton}
    </div>
  );
};

export default Button;
