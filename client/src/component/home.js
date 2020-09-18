import React, { Component } from 'react';
import Footer from './footer';
import './home.css'
import Header from './header.js';

class Home extends Component {
    render() {
        return (
            <div>
                {/* <div>        
                    <Header />
                </div> */}
            <div class="v-body">
{/* section-1 */}
                <div class="v-wrapper-blue">
                    <section id="feature"  >
                        <div class="container" >
                            <div class="row">
                                <div class="col-sm-5">
                                    <br />
                                    <h1 class="v-heading1 v-intro-2">Use your credit card to pay for rent, <br /> salaries, invoices and more</h1>
                                    <p class="v-intro-subheader" style={{ paddingLeft: "5%" }}>Extend your cash flow for up to 2 months, and earn air miles or <br /> cashback on all your transactions.</p>
                                    <a href="http://localhost:3000/signup" class="v-main-btn v-intro-2-btn w-button"><span>Get CardPAY free</span></a>
                                </div>
                                {/* <div class="col-sm-">
                                    <img src="images.png" style={{ width: "720px", height: "490px",marginLeft:"0px" }} />
                                </div> */}
                            </div>
                            <br /><br />
                        </div>
                    </section>
                </div><br /><br />
    {/* section-2 */}

                <h3 class = "v-heading3">Why 5000+ SMEs are choosing CardPAY</h3><br />
                <section id="feature">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <img src="onebill-payment-banner.png" style={{ width: "700px", height: "400px", marginLeft: "20px" }} />
                            </div>
                            <div class="col-sm-6">
                                <br />
                                <h1 class="v-heading1 v-intro-2" style={{ paddingLeft: "15%" }}>Maximize your cashflow for up to 58 days longer</h1>
                                <p class="v-intro-subheader" style={{ paddingLeft: "15%" }}>Access up to 58 days of interest-free financing on your existing credit cards, and ease payment terms by keeping your cash on hand to grow your business</p>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                </section>
                {/* section-3 */}

                {/* <section>
                    <div class="container">
                        <div class="row">

                            <div class="col-sm-">
                                <img src="logo1.png" style={{ width: "54px", height: "54px", marginLeft: "200px" }} />
                            </div>
                            <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                <p>Free account<br />Collecting payments is free – What you collect is what you get</p>
                            </div>
                            <div class="col-sm-">
                                <img src="logo1.png" style={{ width: "54px", height: "54px", marginLeft: "20px" }} />
                            </div>
                            <div class="col-sm-3" style={{ marginLeft: "2px" }} >
                                <p>Free account<br />Collecting payments is free – What you collect is what you get</p>
                            </div>

                        </div>
                        <br />
                        <div class="row">

                            <div class="col-sm-">
                                <img src="logo1.png" style={{ width: "54px", height: "54px", marginLeft: "200px" }} />
                            </div>
                            <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                <p>Free account<br />Collecting payments is free – What you collect is what you get</p>
                            </div>
                            <div class="col-sm-">
                                <img src="logo1.png" style={{ width: "54px", height: "54px", marginLeft: "20px" }} />
                            </div>
                            <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                <p>Free account<br />Collecting payments is free – What you collect is what you get</p>
                            </div>

                        </div>
                    </div>
                    <br /><br />
                </section><br /> */}
                {/* section-4 */}

                <h3 class = "v-heading3">Take your business online with CardPAY</h3>
                <br />
                <div class="slide-3">
                    <section>
                        <div class="container">
                            <div class="row">

                                <div class="col-sm-">
                                    <img src="logo1.png" style={{ width: "54px", height: "54px", marginLeft: "200px" }} />
                                </div>
                                <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                    <h5 class="v-heading5">Free account</h5>
                                    <p class="v-p v-p-benefits">Collecting payments is free – What you collect is what you get</p>
                                </div>
                                <div class="col-sm-">
                                    <img src="logo9.png" style={{ width: "54px", height: "54px", marginLeft: "20px" }} />
                                </div>
                                <div class="col-sm-3" style={{ marginLeft: "2px" }} >
                                <h5 class="v-heading5">Fast collection</h5>
                                <p class="v-p v-p-benefits">Payments are sent directly to your bank account within 3 business days</p>
                                </div>

                            </div>
                            <br />
                            <div class="row">

                                <div class="col-sm-">
                                    <img src="logo10.png" style={{ width: "54px", height: "54px", marginLeft: "200px" }} />
                                </div>
                                <div class="col-sm-4" style={{ marginLeft: "2px" }}>
                                <h5 class="v-heading5">Accessible worldwide</h5>
                                <p class="v-p v-p-benefits">Customers can use their favourite credit cards – All major brands accepted</p>
                                </div>
                                <div class="col-sm-">
                                    <img src="logo11.png" style={{ width: "54px", height: "54px", marginLeft: "20px" }} />
                                </div>
                                <div class="col-sm-4" style={{ marginLeft: "2px" }} >
                                <h5 class="v-heading5">Easy setup</h5>
                                <p class="v-p v-p-benefits">No merchant account, no payment gateway – Just 2 minutes to set up</p>
                                </div>

                            </div>
                        </div>
                        <br /><br />
                    </section></div><br />
                    {/* section-5 */}

                <h1 class="v-heading1 v-intro-2" style={{ textAlign: "center" }}>How CardPAY works</h1><br /><br />
                <section id="feature"  >
                    <div class="container" >
                        <div class="row">
                            <div class="col-sm-3" style={{ marginLeft: "130px" }} >
                                <img src="logo6.png" style={{ width: "100px", height: "100px", marginLeft: "80px", }} /> <br /><br />  
                                <p class="v-p v-p-steps"><h4 class="v-heading5">Create a recipient</h4>Tell us which business you’d like to make a payment to, regardless of if they accept credit card payments or not</p>
                            </div>
                            <div class="col-sm-3" style={{ marginLeft: "40px" }} >
                                <img src="logo7.png" style={{ width: "100px", height: "100px", marginLeft: "80px", }} /> <br /><br />
                            <p class="v-p v-p-steps"><h4 class="v-heading5">Add a credit card</h4>Take full advantage of your credit card benefits. We accept all Visa, Mastercard cards</p>
                            </div>
                            <div class="col-sm-3" style={{ marginLeft: "40px" }} >
                                <img src="logo8.png" style={{ width: "100px", height: "100px", marginLeft: "80px", }} /> <br /><br />
                                <p class="v-p v-p-steps"><h4 class="v-heading5">Confirm payment</h4>We’ll send your one-time or scheduled payment to your recipient’s bank account within 3 business days</p>
                            </div>

                        </div>
                        <br /><br />
                    </div>
                </section>
{/* footer design */}
</div>

<div class="v-section-full v-img-overflow">
                                <div class="v-div-map-left"><img src="https://uploads-ssl.webflow.com/5c486e8f7febe4df457922a9/5e339d00cf951ff6a9200eca_map-left.svg" alt="" class="v-img-map"></img></div>
                                <div class="v-div-map-text">
                                    <h2 class="v-heading2" style={{fontWeight:"550"}}>Pay anyone, from anywhere</h2>
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

                            
                <br /><br /><div>
                    <Footer />
                </div>
            </div>

        )
    }

}
export default Home;

// stripe credentials
// mailto: rimustechnologies@gmail.com
// password: madhubajpai@123







