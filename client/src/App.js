import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink as RRNavLink
} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import WorkspacePage from './pages/WorkspacePage';
import IndexPage from './pages/IndexPage';
import './App.css';
import AddProblem from './pages/AddProblem'
import Spacer from './components/Spacer';

function App(props) {
  const navbarHeight = "56px";

  return(
    <Router>
        <>
          <Navbar
            color="dark"
            dark
            expand="md"
            style={{ flexShrink: 0, height: navbarHeight }}
          >
            <NavbarBrand tag={Link} to="/">
              PNU Coding Program 
            </NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/">
                  by D-Hyun-A
                </NavLink>
              </NavItem>
            </Nav>
            <Spacer></Spacer>
            <Nav navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/add">
                  문제 추가하기
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
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


