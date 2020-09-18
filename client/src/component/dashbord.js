import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../component/home';
import DashboardPage from '../component/dashboardPage';
import dashbord from "./dashbord.css"
class Dashbord extends Component {


    render() {
        // console.log("this is homepage",this.props.data.oneName);
        // let firstName = this.props.data.oneName;
        // let lastName = this.props.data.twoName;
        return (
            <div >
                <div class="dashboard">

                    {/* <nav className="navbar navbar-expand-sm fixed-top">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto"  >

                        <li className="nav-item" class="navItemReg" >
                            <Link to={'/ml'} className="nav-link">nikki</Link>
                        </li>
                        <li className="nav-item p">
                            <Link to={'/signup'} className="nav-link">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav> <br /><br /> */}
                    <br /><h4>Welcome to Card Pay</h4><hr />
                    <div class="sidebar">
                    {/* <h6 style={{marginLeft:"25px",marginTop:"15px"}}>{firstName} {lastName}</h6> */}
                        <img src="profile2.png" alt="Avatar" style={{width:"40px",marginTop:"60px",marginLeft:"50px"}}/><br/><br/>
                            <a href="/dashboardPage"><i class="fa fa-home"></i>Dasboard</a>
                            {/* <p style={{color:"white",marginLeft:"20px"}}>Cash Pay</p> */}
                            <a href="/serviceProvider"><i class="fa fa-usd"></i>Payments</a>
                            <a href="/userList"><i class="fa fa-user"></i>Users</a>
                            <a href="/cardDetail"><i class="fa fa-credit-card"></i>Cards</a>
                            {/* <a href="/paymentBox"><i class="fa fa-cog"></i>Settings</a> */}

                    </div>

                    </div>
                </div>

                );
            }
        }
        
export default Dashbord;

// https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4