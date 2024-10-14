import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import Logo from "../../images/logoPJ.png";

const Header = () => {
  return (
    <>
      <div id="cabecera">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <img
              src={Logo}
              alt="Logo"
              className="logo"
              style={{
                // width: "158px",
                height: "55px",
              }}
            />
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <div className="nav-item d-flex align-items-center"></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div
        // id="menuNegro"
        className="hidden-xs grad fixedElement"
        style={{
          backgroundColor: "#009189",
          width: "100%",
          height: "40px",
        }}
      ></div>
    </>
  );
};

export default Header;
