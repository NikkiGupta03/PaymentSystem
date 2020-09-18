import React, { useState, Component } from 'react';
import Select from 'react-select';
import Dashbord from './dashbord';
import DashboardPage from '../component/dashboardPage';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
// import Select from 'react-select';
import { Button } from 'reactstrap'
import './dashbord.css'
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
// import Stripe from 'stripe';

class Card extends Component {
    // export default function PaymentInputs() {
    //   const {
    //             wrapperProps,
    //             getCardImageProps,
    //             getCardNumberProps,
    //             getExpiryDateProps,
    //             getCVCProps
    //              } = usePaymentInputs();

    publishableKey = "enter your stripe publishableKey ";

    onToken = token => {
        console.log("nikki token", token)
        const body = {
            stripeEmail: token.email,
            stripeToken: token.id
        };
        // console.log("nikki body",body)
        axios
            .post("http://localhost:4000/payment", body)
            .then(response => {
                console.log(response);
                alert("Payment Success");
            })
            .catch(error => {
                console.log("Payment Error: ", error);
                alert("Payment Error");
            });
    };

    render() {

        return (

            <div>
                <div>
                    <Dashbord />
                </div>
                <div class="main">
                    <div className="custombutton">  <StripeCheckout
                        label="Pay With Card" //Component button text
                        name="Business LLC" //Modal Header
                        description="Upgrade to a premium account today."
                        panelLabel="payment" //Submit button in modal
                        currency="INR"
                        amount={100} //Amount in cents $9.99
                        token={this.onToken}
                        stripeKey={this.publishableKey}
                        billingAddress={false}
                    />
                    </div><br /><br /><br />
                    {/* <div class="PaymentsManagement_empty__1CP9j_card">
                        <div class="PaymentsManagement">
                            <header class="PaymentFlow_heading__3v5mH"><div><p><span>Select your credit card</span></p><p class="PaymentFlow_subHeader__Jixb4"><span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>We use Stripe to secure your credit card information. We don't store this data.</span></p></div></header>
                            <div class="row">
                                <card class="card" style={{ width: "40px", height: "25px", marginRight: "9px" }}><span class="Badges_container__3pKTy Badges_sm__2As0H CreditCardBadges_container__1NlC3"><img src="visa.0cd2b874.jpg" style={{ width: "25px", height: "10px", marginLeft: "5px" }} alt="visa" class="CreditCardBadges_cardBrandLogo__32Fle" /></span></card>
                                <card class="card" style={{ width: "40px", height: "25px" }}><span class="Badges_container__3pKTy Badges_sm__2As0H CreditCardBadges_container__1NlC3"><img src="mastercard.45b15082.jpg" style={{ width: "25px", height: "10px", marginLeft: "5px" }} alt="visa" class="CreditCardBadges_cardBrandLogo__32Fle" /></span></card>
                            </div><br />
                            <h6>Cardholder name</h6>
                            <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Nikki Gupta" /><br /><br />
                            <div class="buttonstyle">
                                <h6>Country</h6>
                                <Select
                                    placeholder="Select Country"
                                // value={selectedOption} // set selected value
                                // options={data} // set list of the data
                                // onChange={handleChange} // assign onChange function
                                /></div>
                                <h6>Credit card number</h6>
                            <PaymentInputsWrapper {...wrapperProps}>
                                <svg {...getCardImageProps({ images })} />
                                <input {...getCardNumberProps()} />
                                <input {...getExpiryDateProps()} />
                                <input {...getCVCProps()} />
                            </PaymentInputsWrapper><br/><br/>
                            <h6>Address</h6>
                            <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Address" /><br /><br />
                            <Button bsSize="xsmall" color="warning" block>Continue</Button>

                        </div>
                    </div>
                     */}
                </div>
            </div>
        );
    }
}

export default Card;
