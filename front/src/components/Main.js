import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./MainContainer";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import Reload from "./ReloadWallet";
import Saldo from "./Saldo";
import Payment from "./Payment";
export default function MainContainer() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Main />}></Route>
      <Route path="/login" render={() => <Login />}></Route>
      <Route path="/register" render={() => <Register />}></Route>
      <Route path="/user" render={() => <User />}></Route>
      <Route path="/reload" render={() => <Reload />}></Route>
      <Route path="/saldo" render={() => <Saldo />}></Route>
      <Route path="/payment" render={() => <Payment />}></Route>
    </Switch>
  );
}
