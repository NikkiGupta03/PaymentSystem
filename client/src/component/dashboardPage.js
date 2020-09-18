import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../component/home';
import Sidebar from './dashbord.js';
import Dashbord from './dashbord';
import PaymentBox from './paymentBox';
import { withRouter } from 'react-router'
// import Signup from '../component/signUp';
import dashbord from "./dashbord.css"

class DashboardPage extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state = {
    //         oneName:'',
    //         twoName:''

    //     }
    // }
    
    // componentDidMount(){  
            // let firstName = this.props.location.state.firstName
            // let lastName = this.props.location.state.lastName
    //         this.setState({ oneName: firstName })
    //         this.setState({ twoName: lastName })         
    //     }
        
    render() {
        // const firstName = this.props.location.state.firstName
        // const lastName = this.props.location.state.lastName
        
        return (
            <div>
                <div>
                <Dashbord/>
                {/* <Dashbord data={this.state}/> */}

                    {/* <div class="dashboard">

                        <br /><h4>Welcome to Card Pay</h4><hr />
                        <div class="sidebar">
                            <img src="profile2.png" alt="Avatar" style={{ width: "40px", marginTop: "60px", marginLeft: "50px" }} /><br /><h6 style={{marginLeft:"25px",marginTop:"15px"}}>{firstName} {lastName}</h6><br />
                            <a><i class="fa fa-home"></i>Dasboard</a>
                            <a href="/serviceProvider"><i class="fa fa-usd"></i>Payments</a>
                            <a href="/userList"><i class="fa fa-user"></i>Users</a>
                            <a href="/cardDetail"><i class="fa fa-credit-card"></i>Cards</a>

                        </div>

                    </div> */}
                </div>
                <div class="main">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item active" aria-current="page"><i class="fa fa-fw fa-home"></i>Dashboard</li>
                        </ol>
                    </nav>
                    <div class="row">
                        <div class="card" style={{ width: "13rem", marginRight: "30px", marginLeft: "30px",borderRadius: "0.5em",boxShadow: "0px 5px 3px 1px rgba(0, 0, 0, 0.14)",backgroundColor: "#FFFFFF"}}>
                            <div class="card-body">
                                <h5 class="card-title">Recipients</h5>
                            </div>
                        </div>

                        <div class="card" style={{ width: "13rem", marginRight: "30px",borderRadius: "0.5em",boxShadow: "0px 5px 3px 1px rgba(0, 0, 0, 0.14)",backgroundColor: "#FFFFFF" }}>
                            <div class="card-body">
                                <h5 class="card-title">Merchants</h5>
                            </div>
                        </div>
                        <div class="card" style={{ width: "13rem", marginRight: "30px",borderRadius: "0.5em",boxShadow: "0px 5px 3px 1px rgba(0, 0, 0, 0.14)",backgroundColor: "#FFFFFF" }}>
                            <div class="card-body">
                                <h5 class="card-title">Transaction</h5>
                            </div>
                        </div>
                        <div class="card" style={{ width: "13rem",borderRadius: "0.5em",boxShadow: "0px 5px 3px 1px rgba(0, 0, 0, 0.14)",backgroundColor: "#FFFFFF" }}>
                            <div class="card-body">
                                <h5 class="card-title">Payments</h5>
                            </div>
                        </div>
                    </div><br />
                    {/* row closer */}
                    <div class="row">
                        <div class="card" style={{ width: "40rem", marginRight: "30px", marginLeft: "30px",borderRadius: "0.5em",boxShadow: "0px 5px 3px 1px rgba(0, 0, 0, 0.14)",backgroundColor: "#FFFFFF" }}>
                            <div class="card-body">
                                <img src="Paymentchart.png" style={{ width: "600px", height: "280px" }} /></div>
                        </div>
                        <div class="card" style={{ width: "22rem", marginLeft: "0px",borderRadius: "0.5em",boxShadow: "0px 5px 3px 1px rgba(0, 0, 0, 0.14)",backgroundColor: "#FFFFFF" }}>
                            <div class="card-body">
                                <img src="cardPayments2.png" style={{ width: "300px", height: "300px" }} /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardPage;