import React, { Component } from 'react';

import countries from '../../constants/countries';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';


export class GuestContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      firstName: props.getStore().firstName,
      lastName: props.getStore().lastName,
      email: props.getStore().email,
      phone: props.getStore().phone,
      address: props.getStore().address,
      city: props.getStore().city,
      pin: props.getStore().pin,
      region: props.getStore().region,      
      country: props.getStore().country      
    }; 

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  handleReservationSearch(){

    var search = this.refs.reservationSearch.value;

    fetch(API_URL + "guests/?search=" + search, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((response) => {
        return checkError(response);
    })
    .then((result) => {
      this.setState({
        isLoaded:true,
        items: result,
      }, function() {
        this.loadGuestDetails();
      }
    );        
    })
    .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        logError(this.constructor.name + " " + error);
      });
  }

  insertGuestData(){

    const payload = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email_id: this.state.email,
      phone_no: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      zip_code: this.state.pin,
      state: this.state.region,
      country_id: this.state.country
    };


    fetch(API_URL + "guests/", {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)

    })
    .then((response) => {
      return checkError(response);
    })
    .then(
        (result) => {
          this.setState({
            isLoaded: true,
            guestId: result[0].guest_id
          });
          this.props.updateStore({
            guestId: result[0].guest_id
          });
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      logError(error);
    });
  }

  updateGuestData(){

    const payload = {
      guest_id: this.state.guestId,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email_id: this.state.email,
      phone_no: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      zip_code: this.state.pin,
      state: this.state.region,
      country_id: this.state.country
    };


    fetch(API_URL + "guests/" + this.state.guestId, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)

    })
    .then((response) => {
      return checkError(response);
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      logError(error);
    });
  }

  populateCountries() {
    let items = [];   

    for (let i = 1; i <= 197; i++) {             
         items.push(<option key={i} value={i}>{countries[i]}</option>);   
    }
    return items;
  } 

  componentDidMount() {
    document.getElementById("spNoDataorError").style.visibility="hidden";
  }


  isValidated() {
  
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (
          this.props.getStore().firstName != userInput.firstName || 
          this.props.getStore().lastName != userInput.lastName || 
          this.props.getStore().email != userInput.email || 
          this.props.getStore().phone != userInput.phone || 
          this.props.getStore().address != userInput.address || 
          this.props.getStore().city != userInput.city || 
          this.props.getStore().pin != userInput.pin || 
          this.props.getStore().region != userInput.region || 
          this.props.getStore().country != userInput.country
        ) { // only update store of something changed

          this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)

          if (this.props.getStore().guestId != ''){
            this.updateGuestData();
          }
          else {
              this.insertGuestData();
          }
        }
        isDataValid = true;
    }
    else {
        // if anything fails then update the UI validation state but NOT the UI Data State
        this.setState(Object.assign(userInput, validateNewInput));
    }

    return isDataValid;
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    document.getElementById("spNoDataorError").style.visibility="hidden";

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput));
  }

  _grabUserInput() {
    return {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      pin: this.refs.pin.value,
      region: this.refs.region.value,
      country: this.refs.country.value,

    };
  }

  _validateData(data) {
    return  {
      firstNameVal: (data.firstName != ''),
      lastNameVal: (data.lastName != ''),
      emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.email), // required: regex w3c uses in html5
      phoneVal: (data.phone != ''),
      addressVal: (data.address != ''),
      cityVal: (data.city != ''),
      pinVal: (data.pin != ''),
      regionVal: (data.region != ''),
      countryVal: (data.country != 0) // required: anything besides N/A
    }
  }


  handleEmailSearch(){

        const email = this.refs.email.value;

        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator

        if (validateNewInput.emailVal){
            fetch(API_URL + "guests/?email=" + email)
              .then((response) => {
                return checkError(response);
              })
              .then((result) => {
                  this.setState({
                    isLoaded: true,
                    items: result,
                  }, function() {
                    this.loadGuestDetails();
                  }
                );        
                })
                .catch((error) => {
                  this.setState({
                    isLoaded: false,
                    error
                  });
                  logError(this.constructor.name + " " + error);
                });
        }
        else {
        // This needs to fire only the Email Validation alert, not all!

   // this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    
    //this.setState(Object.assign(userInput.email, validateNewInput.emailVal, this._validationErrors(validateNewInput.emailVal)));
      //this._validationErrors(validateNewInput.emailVal);

      //this.validationCheck(this.refs.email);
     }
  }

  handlePhoneSearch(){

    const phone = this.refs.phone.value;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    if (validateNewInput.phoneVal){
        fetch(API_URL + "guests/?ph=" + phone)
            .then((response) => {
                return checkError(response);
              })
            .then((result) => {
                this.setState({
                  isLoaded:true,
                  items: result,
                }, function() {
                  this.loadGuestDetails();
                }
              );        
              })
              .catch((error) => {
                this.setState({
                  isLoaded: false,
                  error
                });
                logError(this.constructor.name + " " + error);
              });
     }
     else {
    // This needs to fire only the Email Validation alert, not all!

   // this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    
    //this.setState(Object.assign(userInput.email, validateNewInput.emailVal, this._validationErrors(validateNewInput.emailVal)));
      //this._validationErrors(validateNewInput.emailVal);

      //this.validationCheck(this.refs.email);
     }

  }

  loadGuestDetails(){
    // alert(this.props.getHomeStore().userName); does not work, have to find out how to use this....maybe pass from Reservations to each of the children, just the get though.
    if (this.state.items.length != 0)
    {

      this.props.jumpToStep(2);
      
      this.props.updateStore({
        guestId: this.state.items[0].guest_id,
        firstName: this.state.items[0].first_name,
        lastName: this.state.items[0].last_name,
        email: this.state.items[0].email_id,
        phone: this.state.items[0].phone_no,
        address: this.state.items[0].address,
        city: this.state.items[0].city,
        pin: this.state.items[0].zip_code,
        region: this.state.items[0].state,
        country: this.state.items[0].country_id
      });

      this.setState({
        guestId: this.state.items[0].guest_id,
        firstName: this.state.items[0].first_name,
        lastName: this.state.items[0].last_name,
        email: this.state.items[0].email_id,
        phone: this.state.items[0].phone_no,
        address: this.state.items[0].address,
        city: this.state.items[0].city,
        pin: this.state.items[0].zip_code,
        region: this.state.items[0].state,
        country: this.state.items[0].country_id
      });
    

      this.refs.firstName.value = this.state.items[0].first_name,
      this.refs.lastName.value = this.state.items[0].last_name,
      this.refs.email.value = this.state.items[0].email_id,
      this.refs.phone.value = this.state.items[0].phone_no,
      this.refs.address.value = this.state.items[0].address, 
      this.refs.city.value = this.state.items[0].city,
      this.refs.pin.value = this.state.items[0].zip_code,
      this.refs.region.value = this.state.items[0].state,
      this.refs.country.value = this.state.items[0].country_id
    }
    else{
      document.getElementById("spNoDataorError").style.visibility="visible";

      var reservationSearch = String(this.refs.reservationSearch.value);

      this.refs.firstName.value = '',
      this.refs.lastName.value = '',
      this.refs.email.value = (reservationSearch != '' && reservationSearch.indexOf('@') != -1)? this.refs.reservationSearch.value : '',
      this.refs.phone.value = (reservationSearch != '' && this.refs.email.value == '')? this.refs.reservationSearch.value : '',
      this.refs.address.value = '', 
      this.refs.city.value = '',
      this.refs.pin.value = '',
      this.refs.region.value = '',
      this.refs.country.value = 0
    }
  }


  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    /* First Name */
    if (typeof this.state.firstNameVal == 'undefined' || this.state.firstNameVal) {
      notValidClasses.firstNameCls = 'form-control';
    }
    else {
       notValidClasses.firstNameCls = 'form-control has-error';
    }

    /* Last Name */    
    if (typeof this.state.lastNameVal == 'undefined' || this.state.lastNameVal) {
      notValidClasses.lastNameCls = 'form-control';
    }
    else {
       notValidClasses.lastNameCls = 'form-control has-error';
    }

    /* Email ID */
    if (typeof this.state.emailVal == 'undefined' || this.state.emailVal) {
        notValidClasses.emailCls = 'form-control';
    }
    else {
       notValidClasses.emailCls = 'form-control has-error';
    }

    /* Phone */    
    if (typeof this.state.phoneVal == 'undefined' || this.state.phoneVal) {
      notValidClasses.phoneCls = 'form-control';
    }
    else {
        notValidClasses.phoneCls = 'form-control has-error';
    }

    /* Address */    
    if (typeof this.state.addressVal == 'undefined' || this.state.addressVal) {
      notValidClasses.addressCls = 'form-control';
    }
    else {
        notValidClasses.addressCls = 'form-control has-error';
    }

    /* City */    
    if (typeof this.state.cityVal == 'undefined' || this.state.cityVal) {
      notValidClasses.cityCls = 'form-control';
    }
    else {
        notValidClasses.cityCls = 'form-control has-error';
    }

    /* PIN */    
    if (typeof this.state.pinVal == 'undefined' || this.state.pinVal) {
      notValidClasses.pinCls = 'form-control';
    }
    else {
        notValidClasses.pinCls = 'form-control has-error';
    }

    /* Region */    
    if (typeof this.state.regionVal == 'undefined' || this.state.regionVal) {
      notValidClasses.regionCls = 'form-control';
    }
    else {
        notValidClasses.regionCls = 'form-control has-error';
    }

    /* Country */    
    if (typeof this.state.countryVal == 'undefined' || this.state.countryVal) {
      notValidClasses.countryCls= 'form-control';
    }
    else {
        notValidClasses.countryCls = 'form-control has-error';
    }

    return (
      <div className="step step3">
        <div className="row">
          <form id="Form" className="form-horizontal">          
                <h4>Guest Contact Details</h4>  
                <div id="divReservationSearch" className="divFloatRight">
                    <input
                        ref="reservationSearch"
                        autoComplete="off"
                        placeholder="Search by email id or phone"
                        className="form-control email-search" />
                        <div className="button-holder">
                            <img src="./img/magnifying_glass.png" onClick={() => this.handleReservationSearch()}/>
                        </div>
              </div>
                <span id="spNoDataorError">No details found!</span>  
                 

                       <div className = "div-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                   {/* First Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            First Name: *
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="firstName"
                              autoComplete="off"
                              className={notValidClasses.firstNameCls}
                              required
                              defaultValue={this.state.firstName}
                              onBlur={this.validationCheck} />
                            </div>
                      </div>
                </div>
                <div className ="div-table-col alt">
                   {/* Last Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Last Name: *
                      </label>
                      <div className="col-md-8">
                        <input
                          ref="lastName"
                          autoComplete="off"
                          className={notValidClasses.lastNameCls}
                          required
                          defaultValue={this.state.lastName}
                          onBlur={this.validationCheck} />     
                          </div>                 
                        </div>
                      
                  </div>
              </div>


             <div className = "div-table-row">
              <div className ="div-table-col">        
                  {/* Email ID */}
                  <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                      Email ID: 
                    </label>
                    <div className="col-md-8">
                      <input
                        ref="email"
                        autoComplete="off"
                        type="email"
                        className={notValidClasses.emailCls}
                        required
                        defaultValue={this.state.email} />
                        <div className="button-holder">
                            <img src="./img/magnifying_glass.png" onClick={() => this.handleEmailSearch()}/>
                        </div>
                    </div>
                  </div>

                </div>
                <div className ="div-table-col">
                    {/* Phone */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Phone: *
                      </label>
                      <div className="col-md-8">
                        <input
                          type="number"
                          ref="phone"
                          autoComplete="off"
                          className={notValidClasses.phoneCls}
                          required
                          defaultValue={this.state.phone} />
                          <div className="button-holder">
                            <img src="./img/magnifying_glass.png" onClick={() => this.handlePhoneSearch()}/>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
               <div className = "div-table-row">
                  <div className ="div-table-col">
                      {/* Street Address */}
                      <div className="form-group col-md-12 content form-block-holder long-col">
                          <label className="control-label col-md-4">
                            Address: *
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="address"
                              autoComplete="off"
                              className={notValidClasses.addressCls}
                              required
                              defaultValue={this.state.address}
                              onBlur={this.validationCheck} />
                          </div>
                        </div>
                    </div>
              </div>
                   <div className = "div-table-row">
                    <div className ="div-table-col">
                        {/* City */}
                        <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            City: *
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="city"
                              autoComplete="off"
                              className={notValidClasses.cityCls}
                              required
                              defaultValue={this.state.city}
                              onBlur={this.validationCheck} />
                          </div>
                        </div>
                    </div>
                    <div className ="div-table-col">
                          {/* ZIP / Postal Code / PIN */}
                          <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                            ZIP / Postal Code / PIN: *
                            </label>
                            <div className="col-md-8">
                              <input
                                type="number"
                                ref="pin"
                                autoComplete="off"
                                className={notValidClasses.pinCls}
                                required
                                defaultValue={this.state.pin}
                                onBlur={this.validationCheck} />
                            </div>
                          </div>

                        </div>
                  </div>
                   <div className = "div-table-row">
                    <div className ="div-table-col">
                        {/* State / Province / Region */}
                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                            State / Province / Region: *
                            </label>
                            <div className="col-md-8">
                              <input
                                ref="region"
                                autoComplete="off"
                                className={notValidClasses.regionCls}
                                required
                                defaultValue={this.state.region}
                                onBlur={this.validationCheck} />
                            </div>
                          </div>

                      </div>
                      <div className ="div-table-col">
                          {/* Country */}
                          <div className="form-group col-md-12 content form-block-holder">
                              <label className="control-label col-md-4">
                              Country: *
                              </label>
                              <div className="col-md-8">
                                <select id="slCountries"
                                  ref="country"
                                  autoComplete="off"
                                  className={notValidClasses.countryCls}
                                  required
                                  defaultValue={this.state.country}
                                  onBlur={this.validationCheck}>
                                  <option value="0">Please select</option>
                                  {this.populateCountries()}                   
                                </select>
                              </div>
                            </div>
                        </div>
                    </div>
 </div>
          </form>
        </div>
      </div>
    )
  }
}

export default GuestContacts;