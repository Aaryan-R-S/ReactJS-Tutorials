import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          {/* <Alert/> */}
          <div className="container">
            <Switch>
              <Route exact path="/"><Home/></Route>
              <Route exact path="/about"><About/></Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
