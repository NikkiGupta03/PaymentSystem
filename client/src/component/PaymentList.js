import React, { Component } from 'react';
import axios from 'axios';
import Dashbord from './dashbord';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import './dashbord.css'
import { useState, useEffect } from 'react'
//class Home extends Component{
// function PaymentList() {
class MerchantList extends React.Component {

    // const [data, setData] = useState([]);
    // useEffect(() => {

    //     const GetData = async () => {

    //         const result = await axios('http://localhost:4000/getMerchantDetails');

    //         // setData(result.data);

    //     };
    //     GetData();

    // }, []);

    // const deleteeployee = (id) => {

    //     debugger;

    //     axios.delete('http://localhost:4000/delete' + id)

    //         .then((result) => {

    //             props.history.push('/PaymentList')

    //         });

    // };
    constructor (props) {

        super(props);
       this.state = {
            currencyList:[]   
        }
    }
    componentDidMount() {      
        this.countryCurrencyList();
      }
    countryCurrencyList() {
        var apiBaseUrl = "http://localhost:4000/";
        axios.get(apiBaseUrl + 'getMerchantDetails').then((data) => {
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
    render() {
        const { currencyList } = this.state;

    return (
        <div>
            <div>
                <Dashbord />
            </div>
            <div className="main card" style={{ width: "1020px", marginLeft: "230px" }} >


                <Table class="table table-sm">

                    <thead class="thead-light">

                        <tr>

                            <th>Name</th>
                            {/* <th>Bank Country</th> */}
                            <th>Type</th>
                            <th>Bank Currency</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            {/* <th>Gender</th> */}
                            {/* <th>Action</th> */}

                        </tr>

                    </thead>

                    <tbody>

                        {

                            currencyList.map((item, idx) => {

                                return <tr>

                                    <td>{item.service_provider_name}</td>

                                    <td>{item.service_provider_category}</td>

                                    <td>{item.service_provider_currency}</td>

                                    <td>{item.provider_bank_name}</td>

                                    <td>{item.provider_account_number}</td>

                                    {/* <td>

                                        {item.Amount}

                                    </td> */}

                                    {/* <td>

                                        <div class="btn-group">

                                            <button className="btn btn-warning" onClick={() => { editemployee(item.Id) }}>Edit</button>  

                                            <button className="btn btn-warning" onClick={() => { deleteeployee(item.Id) }}>Delete</button>

                                        </div>

                                    </td> */}

                                </tr>

                            })}

                    </tbody>

                </Table>

            </div>

        </div>

    );
}
}

export default MerchantList;

