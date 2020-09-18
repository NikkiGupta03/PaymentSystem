import React, { Component } from 'react';
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import Header from './header.js';
import Home from './home';
import Dashbord from './dashbord';
import './login.css'
//import login from "./login.css"
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useLocation
// } from "react-router-dom";

class Login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email_Id: '',
            password: ''
        }
    }
    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000/";
        var self = this;
        var payload = {
            "email_Id": this.state.email_Id,
            "password": this.state.password
        }

        axios.post(apiBaseUrl + 'login', payload)
            .then((response) => {
                console.log('loginNikki', response.data.response.user_firstname);
                if (response.data.statusCode == 200) {
                    console.log("Login successfull");
                    // this.props.history.push({
                    //     pathname: '/dashboardPage',
                    //     // search: '?query=abc',
                    //     state: { firstName: response.data.response.user_firstname, lastName: response.data.response.user_lastname}
                    //   })
                    this.props.history.push('/dashboardPage');
                    // this.props.history.push(`/dashboardPage/${response.data.statusCode}`);
                    console.log("Login successfully!");
                    //SS alert("Login successfull");
                    // < Redirect to='/home' />

                    //  history.push("/login");

                    //return <Redirect to="/home" />
                    // var uploadScreen = [];
                    // uploadScreen.push(<Home appContext={self.props.appContext} />)
                    // self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                }
                else if (response.data.statusCode == 419) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                {/* <div>        
                    <Header />
                </div> */}
            <div class="login-body" style={{backgroundColor:"#ebf7ff",height:"600px"}}>
                <br/><br/>
                <MuiThemeProvider >
                        <div className="loginPage">
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ email_Id: newValue })}
                            className="div" />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                            className="div" />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
const style = {
    marginLeft: 150,
    marginTop: 40,

};

export default Login;