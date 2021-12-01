import React from 'react';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Formpage from './components/Formpage';
import About from './components/About';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState("light");
  const [alrtState, setAlrtState] = useState(null);

  const showAlrtState = (m, t)=>{
      setAlrtState({
        msg: m,
        type: t
      })
      setTimeout(() => {
        setAlrtState(null);
      }, 1500);
  }

  const toggleMode = ()=>{
    if(mode==='light'){
      setMode("dark");
      document.body.style.backgroundColor = "#303030"
      showAlrtState("Dark mode has been enabled", "Success")
      document.title = "TextUtils - Dark Mode";
      setTimeout(() => {
        document.title = "TextUtils - Home";
      }, 2000);
    }else{
      setMode("light");
      document.body.style.backgroundColor = "white"
      showAlrtState("Light mode has been enabled", "Success")
      document.title = "TextUtils - Light Mode";
      setTimeout(() => {
        document.title = "TextUtils - Home";
      }, 2000);
    }
  }
  {window.addEventListener("load", ()=>{
    setMode("dark");
    document.body.style.backgroundColor = "#303030"
  });}

  return (
    <>
      <Router>
        <Navbar title="TextUtils" abtText="Go" mode={mode} toggleMode={toggleMode} />
        <Alert alrt={alrtState}/>
        <Switch>
            <Route exact path='/about'>
              <About myMode={mode}/>
            </Route>
            <Route exact path='/'>
                <Formpage heading="Enter text to analyse!" mode={mode} showAlrt={showAlrtState}/>
            </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
