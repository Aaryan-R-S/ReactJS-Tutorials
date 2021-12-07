import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  const pageSize = 12;
  const country = "in";
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(5);

  return (
    <>
    <Router>
      <Navbar/>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} height={3}/>
      <Switch>
        <Route exact path="/"><News setProgress={setProgress} key="home" pgsz={pageSize} country={country} category="general" apiKey={apiKey}/></Route>
        <Route exact path="/business"><News setProgress={setProgress} key="business" pgsz={pageSize} country={country} category="business" apiKey={apiKey}/></Route>
        <Route exact path="/entertainment"><News setProgress={setProgress} key="entertainment" pgsz={pageSize} country={country} category="entertainment" apiKey={apiKey}/></Route>
        <Route exact path="/general"><News setProgress={setProgress} key="general" pgsz={pageSize} country={country} category="general" apiKey={apiKey}/></Route>
        <Route exact path="/health"><News setProgress={setProgress} key="health" pgsz={pageSize} country={country} category="health" apiKey={apiKey}/></Route>
        <Route exact path="/science"><News setProgress={setProgress} key="science" pgsz={pageSize} country={country} category="science" apiKey={apiKey}/></Route>
        <Route exact path="/sports"><News setProgress={setProgress} key="sports" pgsz={pageSize} country={country} category="sports" apiKey={apiKey}/></Route>
        <Route exact path="/technology"><News setProgress={setProgress} key="technology" pgsz={pageSize} country={country} category="technology" apiKey={apiKey}/></Route>
      </Switch>
    </Router>
    </>
  )
}
