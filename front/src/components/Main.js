import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./MainContainer";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
export default function MainContainer() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Main />}></Route>
      <Route path="/login" render={() => <Login />}></Route>
      <Route path="/register" render={() => <Register />}></Route>
      <Route path="/user" render={() => <User />}></Route>
    </Switch>
  );
}
