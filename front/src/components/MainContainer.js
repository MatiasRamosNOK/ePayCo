import React, { useEffect } from "react";
import Background from "../../../back/public/static/images/Main.jpg";
import NavBar from "./Navbar";
import { cleanRegister } from "../redux/actions/user";
import { useDispatch } from "react-redux";
export default function MainContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanRegister());
  }, []);
  return (
    <div
      className="mainContainer"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <NavBar />
    </div>
  );
}
