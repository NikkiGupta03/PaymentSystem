import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './component/home';
import Login from './component/login';
import Signup from './component/signUp';
import Logout from './component/logout'
import Dashbord from './component/dashbord'
import Footer from './component/footer';
import Support from './component/support';
import SideBar from './component/sideBar'
import DashboardPage from './component/dashboardPage';
import PaymentBox from './component/paymentBox';
import ServiceProvider from './component/serviceProvider';
import PaymentList from './component/PaymentList';
import PaymentCard from './component/paymentCard';
import './App.css'
// import TableRow from './component/TableRow';
class App extends Component {
  render() {

    return (<div>
      <Router>
        <div className="container">
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
              </ul>
            </div>
          </nav> <br /><br />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/dashboardPage' component={DashboardPage} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            {/* <Route path='/dashboardPage/:state' component={DashboardPage} /> */}
            <Route path='/serviceProvider' component={ServiceProvider} />
            <Route path='/paymentBox' component={PaymentBox} />
            <Route path='/cardDetail' component={PaymentCard} />
            <Route path='/serviceProvider' component={PaymentBox} />
            <Route path='/userList' component={PaymentList} />
            {/* <Route exact path='/logout' component={Logout} /> */}
          </Switch>
        </div>
      </Router>

    </div>

    );
  }
}

export default App;

