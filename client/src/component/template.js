import React, { Fragment, Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Footer from './footer';
import './dashbord.css'
//class Home extends Component{
const stripeBtn = () => {
    const publishableKey = "Enter your stripe publishableKey";

    const onToken = token => {
        const body = {
            amount: 999,
            token: token
        };
        //}
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
    return (
        <div>
            <div className="v-cover-part v-body">
                <section id="feature"  >
                    <div class="container" >
                        {/* <div> */}
                        <div>
                            <br />
                            <h1 class="v-text v-intro-2">Pay Online</h1>
                            <p className="v-para">Pay your invoice online by<br />credit or debit card </p>
                            {/* <p class="v-intro-subheader" style={{ paddingLeft: "5%" }}>Extend your cash flow for up to 2 months, and earn air miles or <br /> cashback on all your transactions.</p> */}
                            <div className="custombutton">  <StripeCheckout
                                label="Pay With Card" //Component button text
                                name="Business LLC" //Modal Header
                                description="Upgrade to a premium account today."
                                panelLabel="payment" //Submit button in modal
                                currency="INR"
                                amount={100} //Amount in cents $9.99
                                token={onToken}
                                stripeKey={publishableKey}
                                billingAddress={false}
                            /><button class="button button4"> Logout</button>
                            </div><br /><br /><br />
                            {/* </div> */}
                            {/* section-2 */}

                            <h3 class="v-heading3" style={{ marginTop: "170px" }}>Ease of payments for your customers</h3><br />
                            <section id="feature">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <img src="cardimg.jpg" style={{ width: "700px", height: "400px", marginLeft: "20px" }} />
                                        </div>
                                        <div class="col-sm-6">
                                            <br />
                                            <h1 class="v-heading1 v-intro-2" style={{ paddingLeft: "20%" }}>Collect credit card <br />payments from<br />customers — for free</h1>
                                            <p class="v-intro-subheader" style={{ paddingLeft: "20%" }}>Extend your cash flow for up to 2 months, and earn air miles or cashback on all your transactions.</p>
                                        </div>
                                    </div>
                                    <br /><br />
                                </div>
                            </section><br />
                            {/* section-3 */}

                            <section>
                                <div class="container">
                                    <div class="row">

                                        <div class="col-sm-">
                                            <img src="logo2.png" style={{ width: "54px", height: "54px", marginLeft: "200px" }} />
                                        </div>
                                        <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                            <h5 class="v-heading5">Earn rewards</h5>
                                            <p class="v-p v-p-benefits">Earn air miles, cash back, or program points through your credit cards</p>
                                        </div>
                                        <div class="col-sm-">
                                            <img src="logo3.png" style={{ width: "54px", height: "54px", marginLeft: "20px" }} />
                                        </div>
                                        <div class="col-sm-3" style={{ marginLeft: "2px" }} >
                                            <h5 class="v-heading5">Automate payments</h5>
                                            <p class="v-p v-p-benefits">Schedule recurring payments, track invoices, and reconcile information</p>
                                        </div>

                                    </div>
                                    <br />
                                    <div class="row">

                                        <div class="col-sm-">
                                            <img src="logo4.png" style={{ width: "54px", height: "54px", marginLeft: "200px" }} />
                                        </div>
                                        <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                            <h5 class="v-heading5">Early payment discounts</h5>
                                            <p class="v-p v-p-benefits">Pay earlier and receive more favourable pricing from your suppliers</p>
                                            {/* <p>Early payment discounts<br />Pay earlier and receive more favourable pricing from your suppliers</p> */}
                                        </div>
                                        <div class="col-sm-">
                                            <img src="logo5.png" style={{ width: "54px", height: "54px", marginLeft: "20px" }} />
                                        </div>
                                        <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                            <h5 class="v-heading5">All-in-one platform</h5>
                                            <p class="v-p v-p-benefits">Streamline your payments process in one, secure platform</p>
                                        </div>

                                    </div>
                                </div>
                                <br /><br />
                            </section><br />
                            {/* section-4 */}
                            {/* country map */}
                            <div class="v-section-full v-img-overflow">
                                <div class="v-div-map-left"><img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e339d00cf951ff6a9200eca_map-left.svg" alt="" class="v-img-map"></img></div>
                                <div class="v-div-map-text">
                                    <h2 class="v-heading2" style={{ fontWeight: "550" }}>Pay anyone, from anywhere</h2>
                                    <p class="v-subheader text-grey">From India and United States</p>
                                    <div class="row v-map-list" style={{ marginLeft: "70px" }}>

                                        <div class="col-sm-">
                                            <img src="https://i7.pngflow.com/pngimage/688/975/png-flag-of-india-national-flag-gallery-of-sovereign-state-flags-logo-flag-miscellaneous-flag-company-text-clipart.png" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">India Rupee</p>
                                        </div>
                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0add8d0c270340ffdfd_flag-usa.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">United States</p>
                                        </div>

                                    </div>

                                    <div class="row v-map-list" style={{ marginLeft: "70px" }}>

                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e33b0ebcf951fb80d20801b_flag-hong-kong.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Hong Kong dollar</p>
                                        </div>
                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0ac34c4516aef246d82_flag-uk.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">British pound</p>
                                        </div>

                                    </div>

                                    <div class="row v-map-list" style={{ marginLeft: "70px" }}>

                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e33bbb0cf04567d5eb38521_flag-singapore.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Singapore dollar</p>
                                        </div>
                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0abd8d0c20ea00ffdfb_flag-malaysia.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Malaysian ringgit</p>
                                        </div>

                                    </div>

                                    <div class="row v-map-list" style={{ marginLeft: "70px" }}>

                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0ac416e2e2e48512696_flag-thai.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Thai baht</p>
                                        </div>
                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0aa416e2e552751268b_flag-japan.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Japanese yen</p>
                                        </div>

                                    </div>
                                    <div class="row v-map-list" style={{ marginLeft: "70px" }}>

                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0ad416e2e433c512697_flag-vietnam.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Vietnamese dong</p>
                                        </div>
                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0ab34c451d881246d80_flag-south-korea.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">South Korean</p>
                                        </div>

                                    </div>
                                    <div class="row v-map-list" style={{ marginLeft: "70px" }}>

                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0a9d8d0c24bfe0ffdf9_flag-eu.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Euro</p>
                                        </div>
                                        <div class="col-sm-">
                                            <img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e34f0a9d8d0c2085d0ffdf8_flag-canada.svg" style={{ width: "20px", height: "20px", marginLeft: "20px" }} /></div>
                                        <div class="col-sm-4" style={{ marginLeft: "0px" }} >
                                            <p class="v-p">Canadian dollar</p>
                                        </div>

                                    </div>

                                    {/* v-div-map-text closer */}
                                </div>

                                {/* right imageof map */}
                                <div class="v-div-map-right"><img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e33adfd0fdd749e5ce429fd_map-right.svg" alt="" class="v-img-map" /></div>
                                {/* last closer */}
                            </div>

                        </div>
                        <br /><br />
                    </div>
                </section>
                <div>
                    <Footer />
                </div>
            </div><br />

        </div>
    );
}

export default stripeBtn;

{/* <MuiThemeProvider>

<div className="home">
        <h2>Use your credit card to pay for rent,<br/> salaries, invoices and more</h2><br/>
        <p>Extend your cash flow for up to 2 months, and earn air miles or<br/> cashback on all your transactions.</p>
<StripeCheckout
        label="Pay With Card" //Component button text
        name="Business LLC" //Modal Header
        description="Upgrade to a premium account today."
        panelLabel="payment" //Submit button in modal
        currency="INR"
        amount={100} //Amount in cents $9.99
        token={onToken}
        stripeKey={publishableKey}
        // image="https://www.vidhub.co" //Pop-in header image
        billingAddress={false}
    />
    <div className="homeimg">
    <img src="images.png" style={{ width: "700px", height: "400px", margin: "25px 20px 75px 400px" }} />
    </div>
</div>
</MuiThemeProvider> */}