import React from "react";
import Background from "../../../back/public/static/images/Main.jpg";
import NavBar from "./Navbar";
export default function MainContainer() {
  return (
    <div
      className="mainContainer"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <NavBar />
    </div>
  );
}
