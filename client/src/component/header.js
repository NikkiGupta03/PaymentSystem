import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Signup from './signUp';
import DashboardPage from './dashboardPage';
//import Dashboard from './component/dashbord'
import '../App.css'
// class App extends Component {
//   render() {

   function Header(){

    return (
       <div>
      <Router>
        <div className="container">
          {/* <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top"> */}
          <nav className="navbar navbar-expand-sm fixed-top">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <img src="logo.png" style={{ width: 100, height: 40 }} />
              <ul className="navbar-nav mr-auto"  >

                <li className="nav-item" class="navItemReg" >
                  <Link to={'/home'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item p">
                  <Link to={'/signup'} className="nav-link">Register</Link>
                </li>
                <li className="nav-item" class="p" >
                  <Link to={'/login'} className="nav-link" >Login</Link>
                </li>
                {/* <li className="nav-item" class="p" >
                  <Link to={'/login'} className="nav-link" >Logout</Link>
                </li> */}
              </ul>
            </div>
          </nav> <br /><br />
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route path='/home' component={Home} />
            {/* <Route path='/dashboardPage' component={DashboardPage} /> */}
            <Route path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route path='/dashboardPage' component={DashboardPage} />
            {/* <Route path='/paymentPanel' component={PaymentBox} /> */}
            {/* <Route path='/userList' component={PaymentList} /> */}
          </Switch>
        </div>
      </Router>

    </div>

    );
  }


export default Header;

