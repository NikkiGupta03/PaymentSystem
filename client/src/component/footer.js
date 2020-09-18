import React from 'react';
import footer from "./footer.css"
function Footer() {
    return (
        <div >
            {/* <p >Copyright © 2019-2020 All rights reserved</p> */}
            <div class="footer-body">
            <footer className="footer section-small">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-xs-6 footer-col" style={{ marginLeft: "70px" }}>
                            <p class="text">
                                <br />RIMUS Technologies Pvt Ltd offers a wide range of development & related services in Mobility, Information/Data Security and Web Technologies domains.
                </p>
                            <hr />
                            <p class="copyright">
                                Copyright &copy; 2019-2020 <strong>All rights reserved</strong>
                            </p>
                            {/* <ul class="social-inline">
                    <li>
                        <a href="https://www.facebook.com/RimusTechnologies/" class="fa fa-fw fa-facebook btn-circle-social"></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/3305842?trk=tyah&trkInfo=clickedVertical%3Acompany%2CentityType%3AentityHistoryName%2CclickedEntityId%3Acompany_company_3305842%2Cidx%3A0" class="fa fa-fw fa-linkedin btn-circle-social"></a></li>
                    <li>
                        <a href="#" class="fa fa-fw fa-google-plus btn-circle-social"></a>
                    </li>
                </ul>		 */}
                        </div>

                        {/* <!-- Footer Third Column --> */}
                        <div class="col-md-3 col-xs-6 footer-col" style={{ marginLeft: "90px" }} >
                            <h3>Contact <span class="text-theme">Us</span></h3>
                            <p class="social">
                                <span class="icon icon_pin_alt"></span>
                                <b> Development Center (INDIA) :</b><br />
                                JSSATE-Science & Technology Entrepreneur Park,
                                C - 20/1, Sector - 62, Noida - 201309<br /><br />

                                <span class="icon icon_pin_alt"></span>
                                <b>Registered Office:</b><br />
                                J.P. Complex, Mayur Vihar, Phase-I, <br />New Delhi (INDIA) - 110091<br />
                                <span class="icon icon_phone"></span> +91-9810178508<br /><br />

                                <span class="icon icon_mail_alt"></span> contactus@rimus-tech.com<br /><br />

                            </p>
                        </div>
                        {/* <!-- /Footer Third Column --> */}

                        {/* <div class="col-md-4 col-xs-6 footer-col" style={{color:"#fff"}}>
                <h3 style={{color:"#fff"}}>RIMUS Technologies Pvt Ltd</h3>
                </div>
                <hr/> */}
                        <div class="col-md-3" style={{ color: "#fff",marginLeft: "90px" }}>
                            <span class="icon icon_pin_alt"></span>
                            <b> USA Office :</b><br />
                            1803 Research Blvd. Suite, 206 Rockville, Maryland 20850<br />
                            <span class="icon icon_phone"></span>+1-301-770-7000<br/><br/><br/>

                        {/* </div>
                        <div class="col-md-3" style={{ color: "#fff" }}> */}
                            <span class="icon icon_pin_alt"></span>
                            <b> Singapore Office :</b><br />
                            14 Robinson road, #8-01A, Far east Finance building, Singapore 048545<br />
                            <span class="icon icon_phone"></span>+65 63 0306 02<br />
                        </div>

                    </div>
                </div>
            </footer>
            </div>

        </div>

    );
}

export default Footer;