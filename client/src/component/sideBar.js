import React, { Component } from "react";
import PropTypes from "prop-types";

const CANCEL_DISTANCE_ON_SCROLL = 20;

const defaultStyles = {
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  },
  sidebar: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "auto"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    transition: "left .3s ease-out, right .3s ease-out"
  },
  overlay: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  }
};

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // the detected width of the sidebar in pixels
      sidebarWidth: props.defaultSidebarWidth,

      // keep track of touching params
      touchIdentifier: null,
      touchStartX: null,
      touchCurrentX: null,

      // if touch is supported by the browser
      dragSupported: false
    };

    this.overlayClicked = this.overlayClicked.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.saveSidebarRef = this.saveSidebarRef.bind(this);
  }

  componentDidMount() {
    const isIos = /iPad|iPhone|iPod/.test(navigator ? navigator.userAgent : "");
    this.setState({
      dragSupported:
        typeof window === "object" && "ontouchstart" in window && !isIos
    });
    this.saveSidebarWidth();
  }

  componentDidUpdate() {
    // filter out the updates when we're touching
    if (!this.isTouching()) {
      this.saveSidebarWidth();
    }
  }

  onTouchStart(ev) {
    // filter out if a user starts swiping with a second finger
    if (!this.isTouching()) {
      const touch = ev.targetTouches[0];
      this.setState({
        touchIdentifier: touch.identifier,
        touchStartX: touch.clientX,
        touchCurrentX: touch.clientX
      });
    }
  }

  onTouchMove(ev) {
    if (this.isTouching()) {
      for (let ind = 0; ind < ev.targetTouches.length; ind++) {
        // we only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
          this.setState({
            touchCurrentX: ev.targetTouches[ind].clientX
          });
          break;
        }
      }
    }
  }

  onTouchEnd() {
    if (this.isTouching()) {
      // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
      const touchWidth = this.touchSidebarWidth();

      if (
        (this.props.open &&
          touchWidth <
          this.state.sidebarWidth - this.props.dragToggleDistance) ||
        (!this.props.open && touchWidth > this.props.dragToggleDistance)
      ) {
        this.props.onSetOpen(!this.props.open);
      }

      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchCurrentX: null
      });
    }
  }

  // This logic helps us prevents the user from sliding the sidebar horizontally
  // while scrolling the sidebar vertically. When a scroll event comes in, we're
  // cancelling the ongoing gesture if it did not move horizontally much.
  onScroll() {
    if (this.isTouching() && this.inCancelDistanceOnScroll()) {
      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchCurrentX: null
      });
    }
  }

  // True if the on going gesture X distance is less than the cancel distance
  inCancelDistanceOnScroll() {
    let cancelDistanceOnScroll;

    if (this.props.pullRight) {
      cancelDistanceOnScroll =
        Math.abs(this.state.touchCurrentX - this.state.touchStartX) <
        CANCEL_DISTANCE_ON_SCROLL;
    } else {
      cancelDistanceOnScroll =
        Math.abs(this.state.touchStartX - this.state.touchCurrentX) <
        CANCEL_DISTANCE_ON_SCROLL;
    }
    return cancelDistanceOnScroll;
  }

  isTouching() {
    return this.state.touchIdentifier !== null;
  }

  overlayClicked() {
    if (this.props.open) {
      this.props.onSetOpen(false);
    }
  }

  saveSidebarWidth() {
    const width = this.sidebar.offsetWidth;

    if (width !== this.state.sidebarWidth) {
      this.setState({ sidebarWidth: width });
    }
  }

  saveSidebarRef(node) {
    this.sidebar = node;
  }

  // calculate the sidebarWidth based on current touch info
  touchSidebarWidth() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.props.pullRight) {
      if (
        this.props.open &&
        window.innerWidth - this.state.touchStartX < this.state.sidebarWidth
      ) {
        if (this.state.touchCurrentX > this.state.touchStartX) {
          return (
            this.state.sidebarWidth +
            this.state.touchStartX -
            this.state.touchCurrentX
          );
        }
        return this.state.sidebarWidth;
      }
      return Math.min(
        window.innerWidth - this.state.touchCurrentX,
        this.state.sidebarWidth
      );
    }

    if (this.props.open && this.state.touchStartX < this.state.sidebarWidth) {
      if (this.state.touchCurrentX > this.state.touchStartX) {
        return this.state.sidebarWidth;
      }
      return (
        this.state.sidebarWidth -
        this.state.touchStartX +
        this.state.touchCurrentX
      );
    }
    return Math.min(this.state.touchCurrentX, this.state.sidebarWidth);
  }

  render() {
    const sidebarStyle = {
      ...defaultStyles.sidebar,
      ...this.props.styles.sidebar
    };
    const contentStyle = {
      ...defaultStyles.content,
      ...this.props.styles.content
    };
    const overlayStyle = {
      ...defaultStyles.overlay,
      ...this.props.styles.overlay
    };
    const useTouch = this.state.dragSupported && this.props.touch;
    const isTouching = this.isTouching();
    const rootProps = {
      className: this.props.rootClassName,
      style: { ...defaultStyles.root, ...this.props.styles.root },
      role: "navigation",
      id: this.props.rootId
    };
    let dragHandle;

    const hasBoxShadow =
      this.props.shadow && (isTouching || this.props.open || this.props.docked);
    // sidebarStyle right/left
    if (this.props.pullRight) {
      sidebarStyle.right = 0;
      sidebarStyle.transform = "translateX(100%)";
      sidebarStyle.WebkitTransform = "translateX(100%)";
      if (hasBoxShadow) {
        sidebarStyle.boxShadow = "-2px 2px 4px rgba(0, 0, 0, 0.15)";
      }
    } else {
      sidebarStyle.left = 0;
      sidebarStyle.transform = "translateX(-100%)";
      sidebarStyle.WebkitTransform = "translateX(-100%)";
      if (hasBoxShadow) {
        sidebarStyle.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.15)";
      }
    }

    if (isTouching) {
      const percentage = this.touchSidebarWidth() / this.state.sidebarWidth;

      // slide open to what we dragged
      if (this.props.pullRight) {
        sidebarStyle.transform = `translateX(${(1 - percentage) * 100}%)`;
        sidebarStyle.WebkitTransform = `translateX(${(1 - percentage) * 100}%)`;
      } else {
        sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`;
        sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) *
          100}%)`;
      }

      // fade overlay to match distance of drag
      overlayStyle.opacity = percentage;
      overlayStyle.visibility = "visible";
    } else if (this.props.docked) {
      // show sidebar
      if (this.state.sidebarWidth !== 0) {
        sidebarStyle.transform = `translateX(0%)`;
        sidebarStyle.WebkitTransform = `translateX(0%)`;
      }

      // make space on the left/right side of the content for the sidebar
      if (this.props.pullRight) {
        contentStyle.right = `${this.state.sidebarWidth}px`;
      } else {
        contentStyle.left = `${this.state.sidebarWidth}px`;
      }
    } else if (this.props.open) {
      // slide open sidebar
      sidebarStyle.transform = `translateX(0%)`;
      sidebarStyle.WebkitTransform = `translateX(0%)`;

      // show overlay
      overlayStyle.opacity = 1;
      overlayStyle.visibility = "visible";
    }

    if (isTouching || !this.props.transitions) {
      sidebarStyle.transition = "none";
      sidebarStyle.WebkitTransition = "none";
      contentStyle.transition = "none";
      overlayStyle.transition = "none";
    }

    if (useTouch) {
      if (this.props.open) {
        rootProps.onTouchStart = this.onTouchStart;
        rootProps.onTouchMove = this.onTouchMove;
        rootProps.onTouchEnd = this.onTouchEnd;
        rootProps.onTouchCancel = this.onTouchEnd;
        rootProps.onScroll = this.onScroll;
      } else {
        const dragHandleStyle = {
          ...defaultStyles.dragHandle,
          ...this.props.styles.dragHandle
        };
        dragHandleStyle.width = this.props.touchHandleWidth;

        // dragHandleStyle right/left
        if (this.props.pullRight) {
          dragHandleStyle.right = 0;
        } else {
          dragHandleStyle.left = 0;
        }

        dragHandle = (
          <div
            style={dragHandleStyle}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchEnd}
          />
        );
      }
    }

    return (
      <div {...rootProps}>
        <div
          className={this.props.sidebarClassName}
          style={sidebarStyle}
          ref={this.saveSidebarRef}
          id={this.props.sidebarId}
        >
          {this.props.sidebar}
        </div>
        {/* eslint-disable */}
        <div
          className={this.props.overlayClassName}
          style={overlayStyle}
          onClick={this.overlayClicked}
          id={this.props.overlayId}
        />
        {/* eslint-enable */}
        <div
          className={this.props.contentClassName}
          style={contentStyle}
          id={this.props.contentId}
        >
          {dragHandle}
          {this.props.children}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  // main content to render
  children: PropTypes.node.isRequired,

  // styles
  styles: PropTypes.shape({
    root: PropTypes.object,
    sidebar: PropTypes.object,
    content: PropTypes.object,
    overlay: PropTypes.object,
    dragHandle: PropTypes.object
  }),

  // root component optional class
  rootClassName: PropTypes.string,

  // sidebar optional class
  sidebarClassName: PropTypes.string,

  // content optional class
  contentClassName: PropTypes.string,

  // overlay optional class
  overlayClassName: PropTypes.string,

  // sidebar content to render
  sidebar: PropTypes.node.isRequired,

  // boolean if sidebar should be docked
  docked: PropTypes.bool,

  // boolean if sidebar should slide open
  open: PropTypes.bool,

  // boolean if transitions should be disabled
  transitions: PropTypes.bool,

  // boolean if touch gestures are enabled
  touch: PropTypes.bool,

  // max distance from the edge we can start touching
  touchHandleWidth: PropTypes.number,

  // Place the sidebar on the right
  pullRight: PropTypes.bool,

  // Enable/Disable sidebar shadow
  shadow: PropTypes.bool,

  // distance we have to drag the sidebar to toggle open state
  dragToggleDistance: PropTypes.number,

  // callback called when the overlay is clicked
  onSetOpen: PropTypes.func,

  // Initial sidebar width when page loads
  defaultSidebarWidth: PropTypes.number,

  // root component optional id
  rootId: PropTypes.string,

  // sidebar optional id
  sidebarId: PropTypes.string,

  // content optional id
  contentId: PropTypes.string,

  // overlay optional id
  overlayId: PropTypes.string
};

Sidebar.defaultProps = {
  docked: false,
  open: false,
  transitions: true,
  touch: true,
  touchHandleWidth: 20,
  pullRight: false,
  shadow: true,
  dragToggleDistance: 30,
  onSetOpen: () => { },
  styles: {},
  defaultSidebarWidth: 0
};

export default Sidebar;




// import React, { useState, useEffect, Component } from 'react';
// import Select from 'react-select';
// import Dashbord from './dashbord';
// import axios from 'axios';
// import { Button } from 'reactstrap';
// import DashboardPage from '../component/dashboardPage';
// import { useHistory } from "react-router-dom";
// import './dashbord.css'

// // https://www.carlrippon.com/react-drop-down-data-binding/
// // https://www.youtube.com/watch?v=WqUnwWhCdoI
// // https://hostadvice.com/how-to/how-to-install-apache-mysql-php-on-an-ubuntu-18-04-vps/
// class App extends React.Component {

//     constructor (props) {

//         super(props);
//        this.state = {
//             items:'',
//             ProviderCurrency: '',
//             ProviderCategory: '',
//             AccountHolderName: '',
//             Address: '',
//             BankName: '',
//             AccountNumber: ''
    
//         }
//         this.onChangeProviderCurrency = this.onChangeProviderCurrency.bind(this);
//         this.onChangeProviderCategory = this.onChangeProviderCategory.bind(this);
//         this.onChangeAccountHolder = this.onChangeAccountHolder.bind(this);
//         this.onChangeAddress = this.onChangeAddress.bind(this);
//         this.onChangeBankName = this.onChangeBankName.bind(this);
//         this.onChangeAccountNumber = this.onChangeAccountNumber.bind(this);

//     }
//     onChangeProviderCurrency(e) {
//         this.setState({
//             ProviderCurrency: e
//         });
//       }
//       onChangeProviderCategory(e) {
//         this.setState({
//             ProviderCategory: e
//         });
//       }
//       onChangeAccountHolder(e) {
//         this.setState({
//             AccountHolderName: e.target.value
//         });
//       }
//       onChangeAddress(e) {
//         this.setState({
//             Address: e.target.value
//         });
//       }
//       onChangeBankName(e) {
//         this.setState({
//             BankName: e
//         });
//       }
//       onChangeAccountNumber(e) {
//         this.setState({
//             AccountNumber: e.target.value
//         });
//       }
//     componentDidMount() {      
//         this.handleStatusChange()
        
//       }
//     handleStatusChange() {
//         var apiBaseUrl = "http://localhost:4000/";
//         axios.get(apiBaseUrl + 'countryCurrencyList').then((data) => {
//             console.log('data', data.data.response)
//             data.data.response.map((item) => {
//             console.log('dataitem', item.country_currency)
//             this.setState({items:item.country_currency});
//             // console.log("nikko",this.state.items)
//             // return data.data.response;
//         })}).catch(function (error) {
//             console.log(error);
//         });
    
//     }
    
//      handleClick(event) {
//         var apiBaseUrl = "http://localhost:4000";
//         console.log("values", this.state.ProviderCurrency, this.state.ProviderCategory, this.state.AccountHolderName, this.state.Address,this.state.BankName,this.state.AccountNumber);
//         var payload = {
//             "serviceProviderCurrency":this.state.ProviderCurrency, 
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
//         console.log("parameter",payload)
//         axios.post(apiBaseUrl + '/addServiceProvider', payload)
//             .then((response) => {
//                 console.log("re>>>>",response);
//                 if (response.data.statusCode == 201) {
//                     //  console.log("registration successfull");
//                     console.log(this.props)
//                     this.props.history.push('/paymentBox');
//                 } else if (response.data.statusCode == 415) {
//                     console.log("User already exists");
//                     alert("User already exists")
//                 }else if (response.data.statusCode == 402) {
//                     console.log("please Enter all detail");
//                     alert("please Enter all detail")
//                 }
//                 else if (response.data.statusCode == 400) {
//                     console.log("server error");
//                     alert("server error");
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };

// //     const [items, setItems] = useState();
// //     if (!items) {
// //     myFunction(){
// //     var apiBaseUrl = "http://localhost:4000/";
// //             axios.get(apiBaseUrl + 'countryCurrencyList').then((data) => {
// //                 console.log('data', data.data.response)
// //                 data.data.response.map((item) => {
// //                 console.log('dataitem', item.country_currency)
// //                 this.setState({items:item.country_currenc});
// //                 // return data.data.response;
// //             })}).catch(function (error) {
// //                 console.log(error);
// //             });
// //      };
// // }
// //  const [selectedOption, setSelectedOption] = useState(null);
// // // handle onChange event of the dropdown
// //  handleChange = e => {
// //     setSelectedOption(e);
// // }
// // onChangePersonName(e) {
// //     this.setState({
// //         AccountNumber: e.target.value
// //     });
// //   }
    
//     render() {
//         const data = [

//             {
//                 value: 1,
//                 label: this.state.items
//             }
//             // {
//             //     value: 2,
//             //     label: items
//             // },
//          ];
        
//     return (
//         <div className="App">
//             <div>
//                 <Dashbord />
//                 {/* {console.log("nikki data from my side",this.state.AccountNumber)} */}
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
//                                 value={this.state.ProviderCurrency}
//                                 onChange={this.onChangeProviderCurrency}                                
//                                 options={data} // set list of the data
//                             /></div>
//                         <h6>Service Provider category</h6>
//                         <div class="buttonstyle">
//                             <Select
//                                 placeholder="Select Option"
//                                 // onChange={(event, newValue) => this.setState({ ProviderCategory: newValue })}
//                                 value={this.state.ProviderCategory}
//                                 options={data}
//                                 onChange={this.onChangeProviderCategory}
//                                 // onChange={handleChange}
//                             /></div>
//                         <h6>Name of bank account holder</h6>
//                         <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Personal/Company Name" onChange={this.onChangeAccountHolder} /><br /><br />
//                         <span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider address details</span><br /><br />
//                         <h6>Service Provider street address</h6>
//                         <input class="bp3-input" style={{ height: "38px" }} id="amount" type="text" maxlength="20" placeholder="Address" onChange={this.onChangeAddress} /><br /><br />
//                         <span style={{ fontWeight: "600", fontSize: "16px", color: "#C48F22", marginBottom: "5px" }}>Service Provider account details</span><br /><br />
//                         <h6>Bank code and name</h6>
//                         <div class="buttonstyle">
//                             <Select
//                                 placeholder="Select"
//                                 value={this.state.BankName} 
//                                 options={data} 
//                                 onChange={this.onChangeBankName} 
//                         /></div>
//                         <h6>Account number</h6>
//                         <input class="bp3-input" style={{ height: "38px" }} id="AccountNumber" type="text" maxlength="20" placeholder="123456789" onChange={this.onChangeAccountNumber}/><br /><br />
//                         {/* <Button bsSize="xsmall" color="warning" onClick={routeChange} onClick={(event) => handleClick(event)} block>Continue</Button> */}
//                         <Button bsSize="xsmall" color="warning" onClick={(event) =>this.handleClick(event)} block>Continue</Button>

//                     </div>
//                 </div></div>
//         </div>

//     );


// }
// }
// export default App;

    








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
