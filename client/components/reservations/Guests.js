import React, { Component } from 'react';

import countries from '../../constants/countries';
import {references} from '../../constants/roomAttributes';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';

export class Guests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      referenceId: props.getStore().referenceId,
      firstName: props.getStore().firstName,
      lastName: props.getStore().lastName,
      email: props.getStore().email,
      phone: props.getStore().phone,
      address: props.getStore().address,
      city: props.getStore().city,
      pin: props.getStore().pin,
      region: props.getStore().region,      
      country: props.getStore().country,
      guestEmergencyContactId: props.getStore().guestEmergencyContactId, 
      eFirstName: props.getStore().eFirstName,
      eLastName: props.getStore().eLastName,
      ePhone: props.getStore().ePhone,     
      eRelationship: props.getStore().eRelationship,
      searchText: null,
      searchGuestId: null,   
      emailQuery: '',
      phoneQuery: '',
      emailResults: [],
      phoneResults: []
    }; 

    this._validateOnDemand = true; 

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.validateRepEmail = this.validateRepEmail.bind(this);
    this.populateEmailSuggestions = this.populateEmailSuggestions.bind(this);

    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.validateRepPhone = this.validateRepPhone.bind(this);
    this.populatePhoneSuggestions = this.populatePhoneSuggestions.bind(this);

    this.handleSelectedReservation = this.handleSelectedReservation.bind(this);
  }

  
  handleEmailChange() {

    this.validationCheck();

    this.setState({
      emailQuery: this.refs.email.value
    }, function() {
      if (this.state.emailQuery && this.state.emailQuery.length > 1) {
        if (this.state.emailQuery.length % 2 === 0) {
          this.getEmailInfo();
        }
      } 
      if (this.refs.email.value.toString().trim() == ""){
          document.getElementById("divEmailSuggestions").style.visibility = "hidden";
      }
    });       
  }
  
  handlePhoneChange() {

    this.validationCheck();

    this.setState({
      phoneQuery: this.refs.phone.value
    }, function() {
      if (this.state.phoneQuery && this.state.phoneQuery.length > 1) {
        if (this.state.phoneQuery.length % 2 === 0) {
          this.getPhoneInfo();
        }
      } 
      if (this.refs.phone.value.toString().trim() == ""){
        document.getElementById("divPhoneSuggestions").style.visibility = "hidden";
      }
    });       
  }

  getEmailInfo = () => {
    fetch(API_URL, "guests/?email=" + this.state.emailQuery)
    .then((response) => {
        return checkError(response);
    })
    .then((result) => {
        this.setState({
          emailResults: result,
        }, function() {
          if (this.state.emailResults.length != 0){
            document.getElementById("divEmailSuggestions").style.visibility = "visible";
          } else { 
            document.getElementById("divEmailSuggestions").style.visibility = "hidden";
          }
        }
      ); 
    })
    .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(this.constructor.name + " " + error);
      });
  }

  getPhoneInfo = () => {
    fetch(API_URL, "guests/?phone=" + this.state.phoneQuery)
    .then((response) => {
        return checkError(response);
    })
    .then((result) => {
        this.setState({
          phoneResults: result,
        }, function() {
          if (this.state.phoneResults.length != 0){
            document.getElementById("divPhoneSuggestions").style.visibility = "visible";
          } else {
            document.getElementById("divPhoneSuggestions").style.visibility = "hidden";
          }
        }
      ); 

    })
    .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(this.constructor.name + " " + error);
      });
  }

  validateRepEmail(){
    if (document.getElementById("divEmailSuggestions").style.visibility == "visible"){
      for (let i = 0; i < this.state.emailResults.length; i++) {             
        if (this.state.emailResults[i].email_id == this.refs.email.value){
          notify.show('Oops! Guest Email ID already exists. Please select from the available options!', 'error');
          return false;
        }
      }
    } else {
      return true;
    }
  }

  validateRepPhone(){
    if (document.getElementById("divPhoneSuggestions").style.visibility == "visible"){
      for (let i = 0; i < this.state.phoneResults.length; i++) {             
         if (this.state.phoneResults[i].phone_no == this.refs.phone.value){
          notify.show('Oops! Guest Phone already exists. Please select from the available options!', 'error');
          return false;
         }     
      }
    } else {
      return true;
    }
  }

  populateEmailSuggestions(){
    if (this.state.emailResults.length != 0){
      document.getElementById("divEmailSuggestions").style.visibility == "visible";
    }
        let items = []; 

        for (let i = 0; i < this.state.emailResults.length; i++) {             
            items.push(<li key={i} value={i} onClick={() => this.fillGuestId(this.state.emailResults[i].guest_id)}>{this.state.emailResults[i].email_id}</li>);    
        }
        return items;
  }

  populatePhoneSuggestions(){
    if (this.state.phoneResults.length != 0){
      document.getElementById("divPhoneSuggestions").style.visibility == "visible";
    }

      let items = []; 

      for (let i = 0; i < this.state.phoneResults.length; i++) {             
          items.push(<li key={i} value={i} onClick={() => this.fillGuestId(this.state.phoneResults[i].guest_id)}>{this.state.phoneResults[i].phone_no}</li>);    
      }
      return items;
}

  fillGuestId(guest_id){
    this.props.updateStore({
      searchGuestId: guest_id
    });

    this.searchReservation(null, guest_id);

    document.getElementById("divEmailSuggestions").style.visibility = "hidden";
    document.getElementById("divPhoneSuggestions").style.visibility = "hidden";
  }


  populateCountries() {
    let items = [];   

    for (let i = 1; i <= 249; i++) {             
         items.push(<option key={i} value={i}>{countries[i]}</option>);   
    }
    return items;
  }

  populateReferences() {
    let items = [];   

    for (let i = 1; i <= 4; i++) {             
         items.push(<option key={i} value={i}>{references[i]}</option>);   
    }
    return items;
  } 

  loadGuestDetails(){
    if (this.state.items.length != 0)
    {
      this.props.updateStore({
        referenceId: (this.state.items[0].reference_id == null)? 0 : this.state.items[0].reference_id,
        guestId: this.state.items[0].guest_id,
        firstName: this.state.items[0].first_name,
        lastName: this.state.items[0].last_name,
        email: (this.state.items[0].email_id == null? '': this.state.items[0].email_id),
        phone: (this.state.items[0].phone_no == null)? '' : this.state.items[0].phone_no,
        address: (this.state.items[0].address == null)? '' : this.state.items[0].address,
        city: (this.state.items[0].city == null)? '' : this.state.items[0].city,
        pin: (this.state.items[0].zip_code == null)? '' : this.state.items[0].zip_code,
        region: (this.state.items[0].state == null)? '' : this.state.items[0].state,
        country: this.state.items[0].country_id,
        guestEmergencyContactId: this.state.items[0].guest_emergency_contact_id,
        eFirstName: (this.state.items[0].e_first_name == null)? '' : this.state.items[0].e_first_name,
        eLastName: (this.state.items[0].e_last_name == null)? '' : this.state.items[0].e_last_name,
        ePhone: (this.state.items[0].e_phone_no == null)? '' : this.state.items[0].e_phone_no,
        eRelationship: (this.state.items[0].e_relationship == null)? '' : this.state.items[0].e_relationship 
      });

      if (this.state.items.length > 1){
        this.chooseReservations(this.state.items);
      } else {
        if (this.state.items[0].reservation_id != null){
          this.props.updateStore({
            reservationId: this.state.items[0].reservation_id,
            arrivalDate: this.state.items[0].date_of_arrival,
            departureDate: this.state.items[0].date_of_departure
          });
        }
    }

      this.setState({
        referenceId: (this.state.items[0].reference_id == null)? 0 : this.state.items[0].reference_id,
        guestId: this.state.items[0].guest_id,
        firstName: this.state.items[0].first_name,
        lastName: this.state.items[0].last_name,
        email: (this.state.items[0].email_id != null? this.state.items[0].email_id: ''),
        phone: (this.state.items[0].phone_no == null)? '' : this.state.items[0].phone_no,
        address: (this.state.items[0].address == null)? '' : this.state.items[0].address,
        city: (this.state.items[0].city == null)? '' : this.state.items[0].city,
        pin: (this.state.items[0].zip_code == null)? '' : this.state.items[0].zip_code,
        region: (this.state.items[0].state == null)? '' : this.state.items[0].state,
        country: this.state.items[0].country_id,
        guestEmergencyContactId: this.state.items[0].guest_emergency_contact_id,
        eFirstName: (this.state.items[0].e_first_name == null)? '' : this.state.items[0].e_first_name,
        eLastName: (this.state.items[0].e_last_name == null)? '' : this.state.items[0].e_last_name,
        ePhone: (this.state.items[0].e_phone_no == null)? '' : this.state.items[0].e_phone_no,
        eRelationship: (this.state.items[0].e_relationship == null)? '' : this.state.items[0].e_relationship,
      });
    
      this.refs.referenceId.value = (this.state.items[0].reference_id == null)? 0 : this.state.items[0].reference_id;
      this.refs.firstName.value = this.state.items[0].first_name,
      this.refs.lastName.value = this.state.items[0].last_name,
      this.refs.email.value = (this.state.items[0].email_id != null? this.state.items[0].email_id: ''),
      this.refs.phone.value = this.state.items[0].phone_no,
      this.refs.address.value = this.state.items[0].address, 
      this.refs.city.value = this.state.items[0].city,
      this.refs.pin.value = this.state.items[0].zip_code,
      this.refs.region.value = this.state.items[0].state,
      this.refs.country.value = this.state.items[0].country_id,
      this.refs.eFirstName.value = this.state.items[0].e_first_name,
      this.refs.eLastName.value = this.state.items[0].e_last_name,
      this.refs.ePhone.value = this.state.items[0].e_phone_no,
      this.refs.eRelationship.value = this.state.items[0].e_relationship

      var name = this.refs.firstName.value + " " + this.refs.lastName.value;
      this.props.loadName(name);
    }
    else{
      notify.show('No Guest details found!', 'error');
      this.props.jumpToStep(0);
    }

    this.props.updateStore({
      searchText: null,
      searchGuestId: null
    });
  }

  chooseReservations(items){

    confirmAlert({
      customUI: ({ onClose }) => {

        return (
          <div>
            <h4>Available Reservations</h4>  
            <img src="./img/close.png" className="imgClose" onClick={onClose}/>
                
              <div className = "div-table advance-table checkout-table">
              <div className = "div-table-row">
                        <div className ="div-table-col div-table-col-header" style={{width:'30%'}}>
                        Arrival Date
                        </div>
                        <div className ="div-table-col div-table-col-header">
                        Departure Date
                        </div>
                        <div className ="div-table-col div-table-col-header">
                        No. of People
                        </div>
                        <div className ="div-table-col div-table-col-header" style={{width:'10%'}}>
                        Actions
                        </div>
                </div>
              {items.map(item => (
                  <div className = "div-table-row">
                        <div className ="div-table-col col-bordered" style={{width:'30%'}}>
                          {item.date_of_arrival}
                        </div>
                        <div className ="div-table-col col-bordered">
                          {item.date_of_departure}
                        </div>
                        <div className ="div-table-col col-bordered">
                          {item.no_of_people}
                        </div>
                        <div className ="div-table-col col-bordered" style={{width:'10%'}}>
                          <a onClick={() => {this.handleSelectedReservation(item.reservation_id, item.date_of_arrival, item.date_of_departure);  onClose();}} >Open</a>
                        </div>
                  </div>
                  ))} 
                </div>
          </div>
        )
      }
    })
  }

  handleSelectedReservation(rId, arrDate, depDate){

    this.props.updateStore({
      reservationId: rId,
      arrivalDate: arrDate,
      departureDate: depDate
    });   

    this.props.jumpToStep(2);
  }

  searchReservation(searchText, searchGuestId){

    var redirectToReservation = false;
    if (this.props.getStore().searchReservationId != null){
      redirectToReservation = true;
    }

    this.props.updateStore({
      searchText: null,
      searchGuestId: null,
      searchReservationId: null
    });

    ((searchText != null)?fetch(API_URL, "guests/?search=" + searchText):fetch(API_URL, "guests/" + searchGuestId))    
    .then((response) => {
        return checkError(response);
    })
    .then((result) => {
      this.setState({
        isLoaded:true,
        items: result,
      }, function() {
        this.loadGuestDetails();
        // if (this.props.getStore().reservationId != null){
        //   this.props.jumpToStep(2);
        // }
        if (redirectToReservation == true){
          this.props.jumpToStep(0);
        }
      }
    );        
    })
    .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(this.constructor.name + " " + error);
      });
  }

  // loadReservation(searchReservationId){
  //   if(searchReservationId != null)
  //   {
  //     fetch(API_URL, "guests/?rId=" + searchReservationId)
  //         .then((response) => {
  //           return checkError(response);
  //         })
  //         .then((result) => {
  //             this.setState({
  //               isLoaded: true,
  //               items: result,
  //             }, function() {
  //               this.loadGuestDetails();
  //               this.props.jumpToStep(2);
  //             }
  //           );        
  //           })
  //           .catch((error) => {
  //             this.setState({
  //               isLoaded: false,
  //               error
  //             });
  //             notify.show('Oops! Something went wrong! Please try again!', 'error');
  //             logError(this.constructor.name + " " + error);
  //           });
  //     }
  // }

  isValidated() {
  
    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 
    let isDataValid = false;

    if (this.validateRepEmail() == false){
      return false;
    } else if (this.validateRepPhone() == false){
      return false;
    }

    let isNewGuest = false;

    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (
          this.props.getStore().referenceId != userInput.referenceId ||
          this.props.getStore().firstName != userInput.firstName || 
          this.props.getStore().lastName != userInput.lastName || 
          this.props.getStore().email != userInput.email || 
          this.props.getStore().phone != userInput.phone || 
          this.props.getStore().address != userInput.address || 
          this.props.getStore().city != userInput.city || 
          this.props.getStore().pin != userInput.pin || 
          this.props.getStore().region != userInput.region || 
          this.props.getStore().country != userInput.country
        ) {               
              if (this.props.getStore().guestId != null){
                this.updateGuestData();
              }
              else {
                  isNewGuest = true;
                  this.insertGuestData();
              }
              
              var name = this.refs.firstName.value + " " + this.refs.lastName.value;
              this.props.loadName(name);
        }

        if (isNewGuest == false){
        if (
          this.props.getStore().eFirstName != userInput.eFirstName ||
          this.props.getStore().eLastName != userInput.eLastName ||
          this.props.getStore().ePhone != userInput.ePhone ||
          this.props.getStore().eRelationship != userInput.eRelationship
        ){
              if (this.state.guestEmergencyContactId != null){
                this.updateEmergencyContactData();
              } 
              else {
                this.insertEmergencyContactData();
              }
        }
      }

        this.props.updateStore({
          ...userInput,
          savedToCloud: false 
        }); 

        isDataValid = true;
    }
    else {
        this.setState(Object.assign(userInput, validateNewInput));
    }

    return isDataValid;
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 

    this.setState(Object.assign(userInput, validateNewInput));
  }

  _grabUserInput() {
    return {
      referenceId: this.refs.referenceId.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      pin: this.refs.pin.value,
      region: this.refs.region.value,
      country: this.refs.country.value,
      eFirstName: this.refs.eFirstName.value,
      eLastName: this.refs.eLastName.value,
      ePhone: this.refs.ePhone.value,
      eRelationship: this.refs.eRelationship.value
    };
  }

  _validateData(data) {

    return  {
      firstNameVal: (data.firstName != ''),
      lastNameVal: (data.lastName != ''),   
      emailVal: 
          ((data.email.toString().trim() != '')? 
           (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email))
          : true),
      phoneVal: (data.email.toString().trim() != '')? true: (data.phone != ''),   // If email is provided, phone number can be skipped  
      addressVal: (data.referenceId != 0)? true: (data.address.toString().trim() != ''),
      cityVal: (data.referenceId != 0)? true: (data.city.toString().trim() != ''),
      pinVal: (data.referenceId != 0)? true: (data.pin.toString().trim() != ''),
      regionVal: (data.referenceId != 0)? true: (data.region.toString().trim() != ''),
      countryVal: (data.country != 0),
      eFirstNameVal: (data.referenceId != 0)? true: (data.eFirstName.toString().trim() != ''),
      eLastNameVal: (data.referenceId != 0)? true: (data.eLastName.toString().trim() != ''),
      ePhoneVal: (data.referenceId != 0)? true: (data.ePhone.toString().trim() != ''),
      eRelationshipVal: (data.referenceId != 0)? true: (data.eRelationship.toString().trim() != ''),
    }
  }

  insertGuestData(){

    const payload = {
      reference_id: this.state.referenceId,
      first_name: this.state.firstName.toString().trim(),
      last_name: this.state.lastName.toString().trim(),
      email_id: (this.state.email != ''? this.state.email: ''),
      phone_no: this.state.phone.toString().trim(),
      address: this.state.address.toString().trim(),
      city: this.state.city.toString().trim(),
      zip_code: this.state.pin.toString().trim(),
      state: this.state.region.toString().trim(),
      country_id: this.state.country,
      e_first_name: this.state.eFirstName.toString().trim(),
      e_last_name: this.state.eLastName.toString().trim(),
      e_phone_no: this.state.ePhone.toString().trim(),
      e_relationship: this.state.eRelationship.toString().trim(),
      user_id: sessionStorage.getItem('userId')
    };

    store(API_URL, "guests/", JSON.stringify(payload))
    .then((response) => {
      return checkError(response);
    })
    .then(
        (result) => {
          this.props.updateStore({
            guestId: result[0].guest_id
          });
          this.setState({
            isLoaded: true,
            guestId: result[0].guest_id
          });
          notify.show('Guest details added successfully!', 'success');
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
    });
  }

  updateGuestData(){
    const payload = {
      reference_id: this.state.referenceId,
      guest_id: this.props.getStore().guestId,
      first_name: this.state.firstName.toString().trim(),
      last_name: this.state.lastName.toString().trim(),
      email_id: ((this.state.email != null)? this.state.email: ''),
      phone_no: this.state.phone.toString().trim(),
      address: this.state.address.toString().trim(),
      city: this.state.city.toString().trim(),
      zip_code: this.state.pin.toString().trim(),
      state: this.state.region.toString().trim(),
      country_id: this.state.country,
      guest_emergency_contact_id: this.state.guestEmergencyContactId,
      e_first_name: this.state.eFirstName.toString().trim(),
      e_last_name: this.state.eLastName.toString().trim(),
      e_phone_no: this.state.ePhone.toString().trim(),
      e_relationship: this.state.eRelationship.toString().trim(),
      has_email_changed: (this.props.getStore().email != this.refs.email.value? 1 : 0),
      user_id: sessionStorage.getItem('userId')
    };

    store(API_URL, "guests/" + this.props.getStore().guestId, JSON.stringify(payload))
    .then((response) => {
      return checkError(response);
    })
    .then((result) => {  
      notify.show('Guest details updated successfully!', 'success');     
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
    });
  }

  insertEmergencyContactData(){

    const payload = {
      guest_id: this.state.guestId,
      e_first_name: this.state.eFirstName.toString().trim(),
      e_last_name: this.state.eLastName.toString().trim(),
      e_phone_no: this.state.ePhone.toString().trim(),
      e_relationship: this.state.eRelationship.toString().trim(),
      user_id: sessionStorage.getItem('userId')
    };

    store(API_URL, "econtacts/", JSON.stringify(payload))
    .then((response) => {
      return checkError(response);
    })
    .then((result) => {  
      notify.show('Guest emergency contact details inserted successfully!', 'success');  
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
    });
   }

  updateEmergencyContactData(){

    const payload = {
      guest_emergency_contact_id: this.state.guestEmergencyContactId,
      e_first_name: this.state.eFirstName.toString().trim(),
      e_last_name: this.state.eLastName.toString().trim(),
      e_phone_no: this.state.ePhone.toString().trim(),
      e_relationship: this.state.eRelationship.toString().trim(),
      user_id: sessionStorage.getItem('userId')
    };

    store(API_URL, "econtacts/" + this.state.guestEmergencyContactId, JSON.stringify(payload))
    .then((response) => {
      return checkError(response);
    })
    .then((result) => {  
      notify.show('Guest emergency contact details updated successfully!', 'success');  
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
    });
   }

  render() {
      //if searched from Dashboard
      if(this.props.getStore().searchText != null){
        this.searchReservation(this.props.getStore().searchText, null);
      } else if (this.props.getStore().searchReservationId != null){ // coming from Requests so both searchReservation and searchGuestId != null
        this.searchReservation(null, this.props.getStore().searchGuestId);
      } else if(this.props.getStore().searchGuestId != null) { // coming from Check In/ Outs so only searchGuestId != null
        this.searchReservation(null, this.props.getStore().searchGuestId);
      }
     
      var wizardOl = document.getElementsByClassName("progtrckr");
      if (typeof wizardOl[0] != 'undefined'){
        wizardOl[0].style.pointerEvents = "auto";
        document.getElementById("next-button").style.marginTop = "0em";
      }

      //new guest, new reservation
      if((this.props.getStore().guestId == null) && (this.props.getStore().reservationId == null)){
        if (typeof wizardOl[0] != 'undefined'){
          wizardOl[0].style.pointerEvents = "auto";
          document.getElementById("next-button").style.visibility = "visible";
        }
      } // existing guest, new reservation
      else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId == null)){
          wizardOl[0].style.pointerEvents = "auto";
          document.getElementById("next-button").style.visibility = "visible";
      } // existing guest, existing reservation
      else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId != null)){
      document.getElementById("next-button").style.visibility = "visible";
      }

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

      /* Emergency Contact First Name */
      if (typeof this.state.eFirstNameVal == 'undefined' || this.state.eFirstNameVal) {
        notValidClasses.eFirstNameCls = 'form-control';
      }
      else {
        notValidClasses.eFirstNameCls = 'form-control has-error';
      }

      /* Emergency Contact Last Name */    
      if (typeof this.state.eLastNameVal == 'undefined' || this.state.eLastNameVal) {
        notValidClasses.eLastNameCls = 'form-control';
      }
      else {
        notValidClasses.eLastNameCls = 'form-control has-error';
      }

      /* Emergency Contact Phone */    
      if (typeof this.state.ePhoneVal == 'undefined' || this.state.ePhoneVal) {
        notValidClasses.ePhoneCls = 'form-control';
      }
      else {
          notValidClasses.ePhoneCls = 'form-control has-error';
      }

      /* Emergency Contact Relationship */    
      if (typeof this.state.eRelationshipVal == 'undefined' || this.state.eRelationshipVal) {
        notValidClasses.eRelationshipCls = 'form-control';
      }
      else {
          notValidClasses.eRelationshipCls = 'form-control has-error';
      }

    return (
      <div className="step step3">
        <div className="row">
          <form id="Form" className="form-horizontal">          
                <h4>Guest Contact Details</h4>  
                       <div className = "div-table">

                        <div className = "div-table-row">
                          <div className ="div-table-col">

                  {/* Reference */}
                      <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                            Referred By:
                            </label>
                            <div className="col-md-8">
                                      <select id="slReference"
                                        ref="referenceId"
                                        autoComplete="off"
                                        className="form-control"
                                        required
                                        onBlur={this.validationCheck}
                                        defaultValue={this.state.referenceId}>
                                        <option value="0">Please select</option>
                                        {this.populateReferences()}                   
                                      </select>                      
                              </div>
                            </div>
                          </div>
                        </div>
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                   {/* First Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            First Name:
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="firstName"
                              autoComplete="off"
                              className={notValidClasses.firstNameCls}
                              required
                              defaultValue={this.state.firstName}
                              onChange={this.validationCheck} />
                            </div>
                      </div>
                </div>
                <div className ="div-table-col alt">
                   {/* Last Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Last Name:
                      </label>
                      <div className="col-md-8">
                        <input
                          ref="lastName"
                          autoComplete="off"
                          className={notValidClasses.lastNameCls}
                          required
                          defaultValue={this.state.lastName}
                          onChange={this.validationCheck} />     
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
                        autoComplete="new_email"
                        type="email"
                        className={notValidClasses.emailCls}
                        defaultValue={this.state.email} 
                        onChange={this.handleEmailChange} />
                       <div id="divEmailSuggestions" className="autocomplete" style={{ visibility: this.state.emailResults.length != 0 ? 'visible':'hidden'}}>
                       <ul>
                          {(this.refs.email != undefined && this.refs.email.value != "")? this.populateEmailSuggestions(): null}
                       </ul>
                       </div>
                    </div>
                  </div>

                </div>
                <div className ="div-table-col">
                    {/* Phone */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Phone:
                      </label>
                      <div className="col-md-8">
                        <input
                          type="number"
                          ref="phone"
                          autoComplete="new_phone"
                          className={notValidClasses.phoneCls}
                          required
                          defaultValue={this.state.phone} 
                          onChange={this.handlePhoneChange}/>
                          <div id="divPhoneSuggestions" className="autocomplete" style={{ visibility: this.state.phoneResults.length != 0 ? 'visible':'hidden'}}>
                              <ul>
                                {(this.refs.phone != undefined && this.refs.phone.value != "")? this.populatePhoneSuggestions(): null}  
                              </ul>
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
                            Address:
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="address"
                              autoComplete="off"
                              className={notValidClasses.addressCls}
                              required
                              defaultValue={this.state.address}
                              onChange={this.validationCheck} />
                          </div>
                        </div>
                    </div>
              </div>
                   <div className = "div-table-row">
                    <div className ="div-table-col">
                        {/* City */}
                        <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            City:
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="city"
                              autoComplete="off"
                              className={notValidClasses.cityCls}
                              required
                              defaultValue={this.state.city}
                              onChange={this.validationCheck} />
                          </div>
                        </div>
                    </div>
                    <div className ="div-table-col">
                          {/* ZIP / Postal Code / PIN */}
                          <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                            ZIP / Postal Code / PIN:
                            </label>
                            <div className="col-md-8">
                              <input
                                ref="pin"
                                autoComplete="off"
                                className={notValidClasses.pinCls}
                                required
                                defaultValue={this.state.pin}
                                onChange={this.validationCheck} />
                            </div>
                          </div>

                        </div>
                  </div>
                   <div className = "div-table-row">
                    <div className ="div-table-col">
                        {/* State / Province / Region */}
                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                            State / Province / Region:
                            </label>
                            <div className="col-md-8">
                              <input
                                ref="region"
                                autoComplete="off"
                                className={notValidClasses.regionCls}
                                required
                                defaultValue={this.state.region}
                                onChange={this.validationCheck} />
                            </div>
                          </div>

                      </div>
                      <div className ="div-table-col">
                          {/* Country */}
                          <div className="form-group col-md-12 content form-block-holder">
                              <label className="control-label col-md-4">
                              Country:
                              </label>
                              <div className="col-md-8">
                                <select id="slCountries"
                                  ref="country"
                                  autoComplete="off"
                                  className={notValidClasses.countryCls}
                                  required
                                  defaultValue={this.state.country}
                                  onChange={this.validationCheck}>
                                  <option value="0">Please select</option>
                                  {this.populateCountries()}                   
                                </select>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                              <h4 id="h4EContacts">Emergency Contact Details</h4>      
                            </div>
                      </div>  
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                   {/* First Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            First Name:
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="eFirstName"
                              autoComplete="off"
                              className={notValidClasses.eFirstNameCls}
                              required
                              defaultValue={this.state.eFirstName}
                              onChange={this.validationCheck} />
                            </div>
                      </div>
              </div>
                <div className ="div-table-col">
                   {/* Last Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Last Name:
                      </label>
                      <div className="col-md-8">
                        <input
                          ref="eLastName"
                          autoComplete="off"
                          className={notValidClasses.eLastNameCls}
                          required
                          defaultValue={this.state.eLastName}
                          onChange={this.validationCheck} />                      
                        </div>
                      </div>
                </div>
            </div>
             <div className = "div-table-row">
                <div className ="div-table-col">
                    {/* Phone */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Phone:
                      </label>
                      <div className="col-md-8">
                        <input
                          type="number"
                          ref="ePhone"
                          autoComplete="off"
                          className={notValidClasses.ePhoneCls}
                          required
                          defaultValue={this.state.ePhone}
                          onChange={this.validationCheck} />
                      </div>
                    </div>
                </div>
                  <div className ="div-table-col">
                      {/* Relationship */}
                      <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Relationship:
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="eRelationship"
                              autoComplete="off"
                              className={notValidClasses.eRelationshipCls}
                              required
                              defaultValue={this.state.eRelationship}
                              onChange={this.validationCheck} />
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

export default Guests;
