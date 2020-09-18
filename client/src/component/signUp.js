import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// import Header from './header.js';
import Footer from "./footer";
import './login.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useLocation
} from "react-router-dom";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email_Id: '',
            password: ''
        }
    }
    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000";
        console.log("values", this.state.firstName, this.state.lastName, this.state.email_Id, this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email_Id": this.state.email_Id,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + '/register', payload)
            .then((response) => {
                console.log("re>>>>",response.data.statusCode);
                if (response.data.statusCode == 200) {
                    //  console.log("registration successfull");
                    var loginscreen = [];
                    // alert('User Register sucessfully')
                    // Router.browserHistory.push('httphome');
                    console.log(this.props)
                    this.props.history.push('/login');
                    // loginscreen.push(<Login parentContext={this} />);
                    // var loginmessage = "Not Registered yet.Go to registration";
                    // // self.props.parentContext.setState({
                    // //     loginscreen: loginscreen,
                    // //     loginmessage: loginmessage,
                    // //     buttonLabel: "Register",
                    // //     isLogin: true
                    // // });
                } else if (response.data.statusCode == 415) {
                    console.log("User already exit");
                    alert("User already exit")
                }
                else if (response.data.statusCode == 401) {
                    console.log("Username does not exists");
                    alert("something issue on registation.");
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
                <MuiThemeProvider>
                    <div>
                        
                        <div className="signupPage">
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange={(event, newValue) => this.setState({ firstName: newValue })}
                            className="signupfiled"/>
                        <br />
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange={(event, newValue) => this.setState({ lastName: newValue })}
                            className="signupfiled"/>
                        <br />
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email_Id: newValue })}
                            className="signupfiled"/>
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                            className="signupfiled"/>
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                     </div>
                    </div>
                </MuiThemeProvider>
                </div>
            </div>
            
            
        );
    }
}
const style = {
    marginLeft: 150,
    marginTop: 20,
};
export default Register;