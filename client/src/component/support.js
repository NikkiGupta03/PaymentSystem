import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
class Support extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
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
                console.log('login', response.status);

                if (response.status == 200) {
                    console.log("Login successfull");
                    console.log(this.props)
                    this.props.history.push('/home');
                    console.log("Login successfully!");
                    //SS alert("Login successfull");
                    // < Redirect to='/home' />

                    //  history.push("/login");

                    //return <Redirect to="/home" />
                    // var uploadScreen = [];
                    // uploadScreen.push(<Home appContext={self.props.appContext} />)
                    // self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                }
                else if (response.status == 204) {
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
            <div >
                {/* <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" onChange={(event, newValue) => this.setState({ email_Id: newValue })}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password" onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary" onClick={(event) => this.handleClick(event)}>
                        Login

                </button>
                </form> */}
            </div>

        )
    }

}
export default Support;