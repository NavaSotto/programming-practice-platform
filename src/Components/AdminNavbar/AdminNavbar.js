import "./style.css";
import React from "react";
import { useState, useEffect } from "react";

export default function AdminNavbar(props) {
  const [sideBar, setSideBar] = useState(true);
  const { setNavbarClick } = props;

  function handleSidebar() {
    console.log(sideBar);
    setSideBar(!sideBar);
  }

  return (
    <div className="navContainer">
      <nav>
        <ul
          className="mainNav"
          style={sideBar ? { transform: "translateX(0)" } : null}
        >
          <li>
            <button
              className="mainNavLink"
              onClick={(e) => {
                setNavbarClick("exercises");
              }}
            >
              Exercises{" "}
            </button>{" "}
          </li>{" "}
          <li>
            <button
              className="mainNavLink"
              onClick={() => setNavbarClick("statistics")}
            >
              Statistics{" "}
            </button>{" "}
          </li>{" "}
          <li>
            <button
              className="mainNavLink"
              onClick={() => setNavbarClick("users")}
            >
              Users{" "}
            </button>{" "}
          </li>{" "}
          <li></li>{" "}
        </ul>{" "}
      </nav>{" "}
      <button
        onClick={handleSidebar}
        className={`navToggle ${sideBar ? "openNav" : null}`}
      >
        <span />
        <span />
        <span />
      </button>{" "}
      <div
        onClick={handleSidebar}
        className={`overlay ${sideBar ? "openNav" : ""}`}
      />{" "}
    </div>
  );
}
