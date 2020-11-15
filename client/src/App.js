import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import WorkspacePage from './pages/WorkspacePage';
import IndexPage from './pages/IndexPage';
import './App.css';
import AddProblem from './pages/AddProblem'
import Spacer from './components/Spacer';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar : {
    backgroundColor : '#333333'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  Link: {
    color : 'white',
    textDecoration : 'none'
  }
}));


function App(props) {
  const navbarHeight = "56px";
  const classes = useStyles();

  return(
    <Router>
      <>
          <div className={classes.root}>
            <AppBar position="static" className={classes.AppBar}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <Link to='/' className={classes.Link}>
                    PNU Coding Program 
                  </Link>
                </Typography>
                <Typography variant="subtitle1" align='left' className={classes.title}>
                  by D-Hyun-A
                </Typography>
                <Spacer width='62vw'></Spacer>
                <Typography variant="h6" className={classes.title}>
                  <Link to='/add' className={classes.Link}>
                  문제 추가하기
                  </Link>
                </Typography>
              </Toolbar>
            </AppBar>
          </div>

          <div
            style={{ height: `calc(100% - ${navbarHeight})`, overflow: "none" }}
          >
            <Switch>
              <Route exact path="/" render={(props) => <IndexPage {...props} />} />
              <Route exact path="/add" render={(props) => <AddProblem {...props} />} />
              <Route exact path="/workspace/:id" render={(props) => <WorkspacePage {...props} />} />
              <Redirect to="/" />
            </Switch>
          </div>
        </>
      </Router>
  )
}
export default App;


