import React from 'react';
import Home from './pages/Home';
import ProblemList from './pages/ProblemList';
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';


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

