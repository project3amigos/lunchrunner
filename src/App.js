import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Submit from "./pages/Submit";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/create" component={Create}></Route>
          <Route exact path="/submit" component={Submit}></Route>
        </Switch>
      </Router>
    );
  }
}



export default App;
