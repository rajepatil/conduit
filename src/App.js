import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import { Home } from "./components/Home";
import { Setting } from "./components/Setting";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Newpost } from "./components/Newpost";
import { Article } from "./components/Article";
import { Profile } from "./components/Profile";

class App extends Component {
  constructor() {
    super();
    this.state = { appuser: localStorage.user };
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar appuser={this.state.appuser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/setting" component={Setting} />
          <Route path="/newpost" component={Newpost} />
          <Route path="/articles" component={Article} />
          <Route path="/profiles/:name" component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
