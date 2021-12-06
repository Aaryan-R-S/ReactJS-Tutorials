import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default class App extends Component {
  pageSize = 12;
  country = "in";
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress:5
  }

  setProgress = (progress)=>{
    this.setState({progress:progress});
  }

  render() {
    return (
      <>
      <Router>
        <Navbar/>
        <LoadingBar color='#f11946' progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)} height={3}/>
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} key="home" pgsz={this.pageSize} country={this.country} category="general" apiKey={this.apiKey}/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} key="business" pgsz={this.pageSize} country={this.country} category="business" apiKey={this.apiKey}/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} key="entertainment" pgsz={this.pageSize} country={this.country} category="entertainment" apiKey={this.apiKey}/></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} key="general" pgsz={this.pageSize} country={this.country} category="general" apiKey={this.apiKey}/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} key="health" pgsz={this.pageSize} country={this.country} category="health" apiKey={this.apiKey}/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} key="science" pgsz={this.pageSize} country={this.country} category="science" apiKey={this.apiKey}/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} key="sports" pgsz={this.pageSize} country={this.country} category="sports" apiKey={this.apiKey}/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} key="technology" pgsz={this.pageSize} country={this.country} category="technology" apiKey={this.apiKey}/></Route>
        </Switch>
      </Router>
      </>
    )
  }
}
