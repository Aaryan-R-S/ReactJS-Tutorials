import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default class App extends Component {
  pageSize = 12;
  country = "in";
  apiKey = "3fd5a45362454b99b2e64d9e9896c0e5";

  render() {
    return (
      <>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/"><News key="home" pgsz={this.pageSize} country={this.country} category="general" apiKey={this.apiKey}/></Route>
          <Route exact path="/business"><News key="business" pgsz={this.pageSize} country={this.country} category="business" apiKey={this.apiKey}/></Route>
          <Route exact path="/entertainment"><News key="entertainment" pgsz={this.pageSize} country={this.country} category="entertainment" apiKey={this.apiKey}/></Route>
          <Route exact path="/general"><News key="general" pgsz={this.pageSize} country={this.country} category="general" apiKey={this.apiKey}/></Route>
          <Route exact path="/health"><News key="health" pgsz={this.pageSize} country={this.country} category="health" apiKey={this.apiKey}/></Route>
          <Route exact path="/science"><News key="science" pgsz={this.pageSize} country={this.country} category="science" apiKey={this.apiKey}/></Route>
          <Route exact path="/sports"><News key="sports" pgsz={this.pageSize} country={this.country} category="sports" apiKey={this.apiKey}/></Route>
          <Route exact path="/technology"><News key="technology" pgsz={this.pageSize} country={this.country} category="technology" apiKey={this.apiKey}/></Route>
        </Switch>
      </Router>
      </>
    )
  }
}
