import React, {useState,useEffect} from 'react';
import Home from './pages/Home';
import TestCaseModal from './pages/TestCaseModal';
import ProblemCode from './pages/ProblemCode';
import ProblemList from './pages/ProblemList';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import Problem from './pages/Problem';
import Axios from 'axios';

function App(props) {
  return(
    <Router>
      <Switch>
      <Route exact path="/" render={(props) => <ProblemList {...props} />} />
      <Route exact path="/:id" render={(props) => <Home {...props} />} />
      </Switch>
    </Router>
  )
}
export default App;

