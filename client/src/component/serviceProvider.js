import React, { useState, useEffect, Component } from 'react';
import Select from 'react-select';
import Dashbord from './dashbord';
import axios from 'axios';
import { Button } from 'reactstrap';
import DashboardPage from '../component/dashboardPage';
import { useHistory } from "react-router-dom";
import './dashbord.css'

// https://www.carlrippon.com/react-drop-down-data-binding/
// https://scriptverse.academy/tutorials/reactjs-select.html
// https://www.youtube.com/watch?v=WqUnwWhCdoI
// https://hostadvice.com/how-to/how-to-install-apache-mysql-php-on-an-ubuntu-18-04-vps/
class App extends React.Component {

    constructor (props) {

        super(props);
       this.state = {
            currencyList:[],
            merchantList:[],
            bankList:[],
            ProviderCurrency: '',
            ProviderCategory: '',
            AccountHolderName: '',
            Address: '',
            BankName: '',
            AccountNumber: ''
    
        }
        this.handleChange = this.handleChange.bind(this);
        this.onChangeProviderCategory = this.onChangeProviderCategory.bind(this);
        this.onChangeAccountHolder = this.onChangeAccountHolder.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeBankName = this.onChangeBankName.bind(this);
        this.onChangeAccountNumber = this.onChangeAccountNumber.bind(this);

    }
    handleChange = selectedOption => {
        this.setState({ProviderCurrency:selectedOption.label});
        console.log(`Option selected:`, selectedOption);
      };
    // onChangeProviderCurrency(e) {
    //     this.setState({
    //         ProviderCurrency: e
    //     });
    //   }
      onChangeProviderCategory = selectedOption => {
        this.setState({ProviderCategory:selectedOption.label});
        console.log(`Option selected:`, selectedOption);
      };
      onChangeAccountHolder(e) {
        this.setState({
            AccountHolderName: e.target.value
        });
      }
      onChangeAddress(e) {
        this.setState({
            Address: e.target.value
        });
      }
      onChangeBankName = selectedOption => {
        this.setState({BankName:selectedOption.label});
        console.log(`Option selected:`, selectedOption);
      };
      onChangeAccountNumber(e) {
        this.setState({
            AccountNumber: e.target.value
        });
      }
    componentDidMount() {      
        this.countryCurrencyList();
        this.merchantList();
        this.bankList();
        
      }
      countryCurrencyList() {
        var apiBaseUrl = "http://localhost:4000/";
        axios.get(apiBaseUrl + 'countryCurrencyList').then((data) => {
            console.log('data', data.data.response)
            // data.data.response.map((item) => {
            // console.log('dataitem', item.country_currency)
            this.setState({currencyList:data.data.response});
            // console.log("nikko",this.state.items)
            // return data.data.response;
        // })
    }).catch(function (error) {
            console.log(error);
        });
    
    }
    merchantList() {
        var apiBaseUrl = "http://localhost:4000/";
        axios.get(apiBaseUrl + 'MerchantList').then((data) => {
            console.log('data', data.data.response)
            this.setState({merchantList:data.data.response});
    }).catch(function (error) {
            console.log(error);
        });
    
    }
    bankList() {
        var apiBaseUrl = "http://localhost:4000/";
        axios.get(apiBaseUrl + 'BankList').then((data) => {
            console.log('data', data.data.response)
            this.setState({bankList:data.data.response});
    }).catch(function (error) {
            console.log(error);
        });
    
    }
    
     handleClick(event) {
        var apiBaseUrl = "http://localhost:4000";
        console.log("values", this.state.ProviderCurrency, this.state.ProviderCategory, this.state.AccountHolderName, this.state.Address,this.state.BankName,this.state.AccountNumber);
        var payload = {
            "serviceProviderCurrency":this.state.ProviderCurrency, 
            "serviceProviderCategory":this.state.ProviderCategory, 
            "ProviderAccountHolderName":this.state.AccountHolderName, 
            "ProviderStreetAddress":this.state.Address,
            "BankName":this.state.BankName,
            "AccountNumber":this.state.AccountNumber
            // "firstName": this.state.firstName,
            // "lastName": this.state.lastName,
            // "email_Id": this.state.email_Id,
            // "password": this.state.password
        }
        console.log("parameter",payload)
        axios.post(apiBaseUrl + '/addServiceProvider', payload)
            .then((response) => {
                console.log("re>>>>",response);
                if (response.data.statusCode == 201) {
                    //  console.log("registration successfull");
                    console.log(this.props)
                    this.props.history.push('/paymentBox');
                } else if (response.data.statusCode == 415) {
                    console.log("User already exists");
                    alert("User already exists")
                }else if (response.data.statusCode == 402) {
                    console.log("please Enter all detail");
                    alert("please Enter all detail")
                }
                else if (response.data.statusCode == 400) {
                    console.log("server error");
                    alert("server error");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    
    render() {
        const { currencyList } = this.state;
        const { merchantList } = this.state;
        const { bankList } = this.state;
        const { selectedOption } = this.state;

        let countriesList = currencyList.length > 0
            && currencyList.map((item, i) => {
            return {value: item.country_master_id, label:item.country_currency}
                //(<option key={i} value={item.country_master_id} >{item.country_currency}</option>)
        
        }, this);
        // const data = [

        //     {
        //         value: 1,
        //         label: countriesList
        //     }
        //     // {
        //     //     value: 2,
        //     //     label: items
        //     // },
        //  ];
        let merchantCatogeryList = merchantList.length > 0
            && merchantList.map((item, i) => {
            return {value: item.merchant_id, label:item.merchant_type}
                //(<option key={i} value={item.country_master_id} >{item.country_currency}</option>)
        
        }, this);
        let BankList = bankList.length > 0
            && bankList.map((item, i) => {
            return {value: item.bank_id, label:item.bank_name}
                //(<option key={i} value={item.country_master_id} >{item.country_currency}</option>)
        
        }, this);
    return (
        <div className="App">
            <div>
                <Dashbord />
            </div>
            <div class="main">
                <div class="PaymentsManagement_empty__1CP9j" style={{ height: "860px" }}>
                    <div class="PaymentsManagement">
                        <header class="PaymentFlow_heading__3v5mH"><div><p><span>Add a new service Provider</span></p><p class="PaymentFlow_subHeader__Jixb4"><span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider details</span></p></div></header>
                        <h6>Service Provider currency</h6>
                        <div class="buttonstyle">
                            {/* {console.log('itemNikki=+++++++++++++', items)} */}
                            <Select  
                                placeholder="Select Option"
                                value={selectedOption}
                                onChange={this.handleChange}                                
                                options={countriesList}
                                // set list of the data
                            />
    
                            </div>
                        <h6>Service Provider category</h6>
                        <div class="buttonstyle">
                            <Select
                                placeholder="Select Option"
                                value={selectedOption}
                                onChange={this.onChangeProviderCategory}                                
                                options={merchantCatogeryList}
                            /></div>
                        <h6>Name of bank account holder</h6>
                        <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Personal/Company Name" onChange={this.onChangeAccountHolder} /><br /><br />
                        <span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider address details</span><br /><br />
                        <h6>Service Provider street address</h6>
                        <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Address" onChange={this.onChangeAddress} /><br /><br />
                        <span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider account details</span><br /><br />
                        <h6>Bank code and name</h6>
                        <div class="buttonstyle">
                            <Select
                                placeholder="Select"
                                value={selectedOption}
                                onChange={this.onChangeBankName}                                
                                options={BankList}
                        /></div>
                        <h6>Account number</h6>
                        <input class="bp3-input" style={{ height: "38px" }} id="AccountNumber" type="text" maxlength="20" placeholder="123456789" onChange={this.onChangeAccountNumber}/><br /><br />
                        {/* <Button bsSize="xsmall" color="warning" onClick={routeChange} onClick={(event) => handleClick(event)} block>Continue</Button> */}
                        <Button bsSize="xsmall" color="warning" onClick={(event) =>this.handleClick(event)} block>Continue</Button>

                    </div>
                </div></div>
        </div>

    );


}
}
export default App;

    


// function App() {
   
//     const [items, setItems] = useState();
//     useEffect(() => {
//         if (!items) {
//             var apiBaseUrl = "http://localhost:4000/";
//             axios.get(apiBaseUrl + 'countryCurrencyList').then((data) => {
//                 console.log('data', data.data.response)
//                 data.data.response.map((item) => {
//                 console.log('dataitem', item.country_currency)
//                 setItems(item.country_currency);
//                 // return data.data.response;
//             })}).catch(function (error) {
//                 console.log(error);
//             });
//         }
//     });

//     const handleClick =(event) => {
//         var apiBaseUrl = "http://localhost:4000";
//         var payload = {
//             "serviceProviderCurrency":state.ProviderCurrency, 
//             "serviceProviderCategory":this.state.ProviderCategory, 
//             "ProviderAccountHolderName":this.state.AccountHolderName, 
//             "ProviderStreetAddress":this.state.Address,
//             "BankName":this.state.BankName,
//             "AccountNumber":this.state.AccountNumber
//             // "firstName": this.state.firstName,
//             // "lastName": this.state.lastName,
//             // "email_Id": this.state.email_Id,
//             // "password": this.state.password
//         }
//         axios.post(apiBaseUrl + '/addrecipient', payload)
//             .then((response) => {
//                 console.log("re>>>>",response);
//                 if (response.data.statusCode == 200) {
//                     //  console.log("registration successfull");
//                     console.log(this.props)
//                     this.props.history.push('/paymentBox');
//                 } else if (response.data.statusCode == 415) {
//                     console.log("User already exit");
//                     alert("User already exit")
//                 }
//                 else if (response.data.statusCode == 401) {
//                     console.log("Username does not exists");
//                     alert("something issue on registation.");
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };
    
    
    

   
//         // const history = useHistory();
//     // const routeChange = () => {
//     //     let path = `/paymentBox`;
//     //     history.push(path);
//     // }
    
    
//     // // const { countries } = this.items;
//     // let countriesList = data.map((items,i) => {
//     //     console.log("clear",items)
//     //   return (
//     //     <option key={i} value={items.}>{items.label}</option>

//     //   )
//     // }, this);
//     // render() {
//         // const { data } = this.state
//         const data = [

//             {
//                 value: 1,
//                 label: items
//             }
//             // {
//             //     value: 2,
//             //     label: items
//             // },
//             // {
//             //     value: 3,
//             //     label: "true red"
//             // },
//             // {
//             //     value: 4,
//             //     label: "aqua sky"
//             // },
//             // {
//             //     value: 5,
//             //     label: "tigerlily"
//             // },
//             // {
//             //     value: 6,
//             //     label: "blue turquoise"
//             // }
//          ];
//     return (
//         <div className="App">
//             <div>
//                 <Dashbord />
//             </div>
//             <div class="main">
//                 <div class="PaymentsManagement_empty__1CP9j" style={{ height: "860px" }}>
//                     <div class="PaymentsManagement">
//                         <header class="PaymentFlow_heading__3v5mH"><div><p><span>Add a new service Provider</span></p><p class="PaymentFlow_subHeader__Jixb4"><span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider details</span></p></div></header>
//                         <h6>Service Provider currency</h6>
//                         <div class="buttonstyle">
//                             {/* {console.log('itemNikki=+++++++++++++', items)} */}
//                             <Select
//                                 placeholder="Select Option"
//                                 onChange={(event, newValue) => this.setState({ ProviderCurrency: newValue })}
//                                 // value={selectedOption} // set selected value
//                                 options={data} // set list of the data
//                                 // onChange={handleChange} // assign onChange function
//                             /></div>
//                         <h6>Service Provider category</h6>
//                         <div class="buttonstyle">
//                             <Select
//                                 placeholder="Select Option"
//                                 onChange={(event, newValue) => this.setState({ ProviderCategory: newValue })}
//                                 // value={selectedOption}
//                                 options={data}
//                                 // onChange={handleChange}
//                             /></div>
//                         <h6>Name of bank account holder</h6>
//                         <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Personal/Company Name" onChange={(event, newValue) => this.setState({ AccountHolderName: newValue })} /><br /><br />
//                         <span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider address details</span><br /><br />
//                         <h6>Service Provider street address</h6>
//                         <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Address" onChange={(event, newValue) => this.setState({ Address: newValue })} /><br /><br />
//                         <span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider account details</span><br /><br />
//                         <h6>Bank code and name</h6>
//                         <div class="buttonstyle">
//                             <Select
//                                 placeholder="Select"
//                                 onChange={(event, newValue) => setState({ BankName: newValue })}
//                             // value={selectedOption} 
//                                 options={data} 
//                             // onChange={handleChange} 
//                             /></div>
//                         <h6>Account number</h6>
//                         <input class="bp3-input" style={{ height: "38px" }} id="AccountNumber" type="text" maxlength="20" placeholder="123456789" onChange={(event, newValue) => this.setState({ AccountNumber: newValue })} /><br /><br />
//                         {/* <Button bsSize="xsmall" color="warning" onClick={routeChange} onClick={(event) => handleClick(event)} block>Continue</Button> */}
//                         <Button bsSize="xsmall" color="warning" onClick={(event) => handleClick(event)} block>Continue</Button>

//                     </div>
//                 </div></div>
//         </div>

//     );
//     //  }
// }
// }










// // import React, { Fragment, Component, useState } from "react";
// // import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// // import AppBar from 'material-ui/AppBar';
// // import RaisedButton from 'material-ui/RaisedButton';
// // import TextField from 'material-ui/TextField';
// // import StripeCheckout from "react-stripe-checkout";
// // import Dashbord from './dashbord';
// // import axios from "axios";
// // import Footer from './footer';
// // import Select from 'react-select';
// // import './dashbord.css'
// // // import React, { useState } from 'react';
// // import { Collapse, Button, CardBody, Card } from 'reactstrap';
// // // import { Button,Modal } from 'react-bootstrap'


// // const Example = (props) => {
// //     const [selectedValue, setSelectedValue] = useState(3);

// //     const handleChange = e => {
// //         setSelectedValue(e.value);
// //       }
// //     const data = getMovies();

// //     async function getMovies() {


// //         axios
// //             .post("http://localhost:4000/countryCurrencyList")
// //             .then((response) => response.json())
// //             .then((json) => this.setState({data:json}))
// //             // .then(response => {
// //             //     console.log(response);
// //             //     alert("Payment Success");
// //             // })
// //             .catch(error => {
// //                 console.log("Payment Error: ", error);
// //                 alert("Payment Error");
// //             });
// //     };

// //     // const [isOpen, setIsOpen] = useState(false);
// //     // const toggle = () => setIsOpen(!isOpen);

// //     // render(){
// //     return (
// //         <div>
// //             <div>
// //                 <Dashbord />
// //             </div>
// //             <div class="main">
// //                 <div class="PaymentsManagement_empty__1CP9j">
// //                     <div class="PaymentsManagement">
// //                         <header class="PaymentFlow_heading__3v5mH"><div><p><span>Add a new service Provider</span></p><p class="PaymentFlow_subHeader__Jixb4"><span style={{ fontWeight: "500" }}>Service Provider details</span></p></div></header><br/>
// //                         <h6>Service Provider currency</h6>
// //                         <div class="buttonstyle">
// //                             <Button bsSize="xsmall" outline color="primary" color="white" block>INR-Indian Rupees</Button>
// //                         </div><br/>
// //                         <h6>Service Provider category</h6>
// //                         <div class="buttonstyle">
// //                             <Button bsSize="xsmall" outline color="primary" color="white" block>Select</Button>
// //                         </div><br/><br/>
// //                         <Select
// //         placeholder="Select Option"
// //         value={data.find(obj => obj.value === selectedValue)} // set selected value
// //         options={data} // set list of the data
// //         onChange={handleChange} // assign onChange function
// //       />
// //                         <Button bsSize="xsmall" color="primary" block>continue</Button>

// //                         {/* <h6>Recipient type</h6>
// //                         <div class="row">
// //                         <div class="col-sm-6">
// //                             <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
// //                             <Collapse isOpen={isOpen}>
// //                                 <Card>
// //                                     <CardBody>
// //                                         Anim pariatur cliche reprehenderit,
// //                                          enim eiusmod high life accusamus terry richardson ad squid. Nihil
// //                                          anim keffiyeh helvetica, craft beer labore wes anderson cred
// //                                          nesciunt sapiente ea proident.
// //                                     </CardBody>
// //                                 </Card>
// //                             </Collapse>
// //                             </div>
// //                             <div class="col-sm-6">
// //                             <Button color="primary" onClick={nikki} style={{ marginBottom: '1rem' }}>Nikki</Button>
// //                             <Collapse isOpen={isOpen}>
// //                                 <Card>
// //                                     <CardBody>
// //                                         craft beer labore wes anderson cred
// //                                          nesciunt sapiente ea proident.
// //                                     </CardBody>
// //                                 </Card>
// //                             </Collapse>
// //                             </div>
// //                         </div>
// //                          */}
// //                     </div>
// //                 </div><br/>
// //             </div>
// //         </div>
// //     )
// // }
// // // }

// // export default Example;


// // import Ract, { Component } from 'react';

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             countries: [],
//             colours: {}
//         };
//     }
    
//     componentDidMount() {
//         // const [items, setItems] = useState();
//         // useEffect(() => {
//             // if (!items) {
//                 var apiBaseUrl = "http://localhost:4000/";
//                 axios.get(apiBaseUrl + 'countryCurrencyList').then((data) => {
//                     console.log('data', data.data.response)
//                     data.data.response.map((item) => {
//                         console.log('dataitem', item.country_currency)
//                         this.setState({
//                             countries: [item]
//                             // {id: 'AFG', name: 'Afghanistan'},
//                             // {id: 'ALA', name: 'Åland Islands'},
//                             // {id: 'ALB', name: 'Albania'}
//                             // ]
//                         });
//                         // setItems(item.country_currency);
//                         // return data.data.response;
//                     })
//                 }).catch(function (error) {
//                     console.log(error);
//                 });
        
//         //    });
//     }


//     render() {
//         const { countries } = this.state;

//         let countriesList = countries.length > 0
//             && countries.map((item, i) => {
//                 return (
//                     <option key={i} value={item.country_master_id}>{item.country_master_id}</option>
//                 )
//             }, this);

//         return (
//             <div>
//                 <select>
//                     {countriesList}
//                 </select>
//             </div>
//         );
//     }
// }

// export default App;
