import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import { AdvanceDonationsInput } from '../subcomponents/AdvanceDonationsInput';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

export class AdvanceDonations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donationID: '',
      receivedOn: moment(),
      amount: '',
      receipt:'',
      items: {}
    }; 

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);


  }

  componentDidMount() {
    // this.refs.tr2.style.visibility = "hidden";
    // this.refs.tr3.style.visibility = "hidden";
    // this.refs.tr4.style.visibility = "hidden";
   // this.fetchAdvanceDonationsIfExists();
  }

  fetchAdvanceDonationsIfExists(){
    if(this.props.getStore().reservationId != '')
    {
      fetch(API_URL + "advance/" + this.props.getStore().reservationId)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              items: result,
            }, function() {
              this.loadAdvanceDonationDetails();
            }
          );        
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          }
        )
    }
  }

  loadAdvanceDonationDetails(){
    if (this.state.items.length != 0)
    {
      this.props.updateStore({
        advanceDonations: this.state.items
      });

      this.setState({
        advanceDonations: this.state.items
      });

      this.refs.eFirstName.value = this.state.items[0].first_name,
      this.refs.eLastName.value = this.state.items[0].last_name,
      this.refs.ePhone.value = this.state.items[0].phone_no,
      this.refs.eRelationship.value = this.state.items[0].relationship
    }
  }


  isValidated() {
     const userInput = this._grabUserInput(); // grab user entered vals
     const validateNewInput = this._validateData(userInput); // run the new input against the validator
     let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
                
        // if (this.state.aDonations != ''){
        //   this.updateAdvanceDonationDetails();
        // }
        // else {
            this.insertAdvanceDonationDetails();
        // }
        isDataValid = true;
     }
     else {
    //     // if anything fails then update the UI validation state but NOT the UI Data State
    //     this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
     }

    return isDataValid;
  }

  insertAdvanceDonationDetails(){

    // var selectedTR = document.getElementsByClassName("active")[0];
    // var selectedDate = selectedTR.getElementsByTagName("input")[0];
    // var selectedAmt = selectedTR.getElementsByTagName("input")[1];
    // var selectedReceiptNo = selectedTR.getElementsByTagName("input")[2];

    // alert(selectedDate.value);
    // alert(selectedAmt.value);
    // alert(selectedReceiptNo.value);

    // alert(this.state.receivedOn + " state");
    // alert(this.state.amount + " state");
    // alert(this.state.receipt + " state");

    // alert()

    // alert(this.props.getStore().reservationId + " rID");
    // alert(this.props.getStore().guestId + " gID");
    // alert(this.state.advanceReceivedOn + "  date");
    // alert(this.state.advanceAmount + " amt");
    // alert(this.state.advanceReceiptNo + " receipt");

    const payload = {
      reservation_id: this.props.getStore().reservationId,
      guest_id: this.props.getStore().guestId,
      received_on: this.state.receivedOn,
      amount: this.state.amount,
      receipt_no: this.state.receipt,
      is_advance: 1
    };


    fetch(API_URL + "advance/", {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)

    })
    .then(function(response) {
          return response.json()
    })
    .then(
        (result) => {   
          // this.setState({
          //   guestEmergencyContactId: result[0].guest_emergency_contact_id
          // });
          // this.props.updateStore({
          //   guestEmergencyContactId: result[0].guest_emergency_contact_id
          // });     
        }
    );
   }



  updateReservationDetails(){

    var dt_arrival =  this.state.arrivalDate + " " + moment(this.state.arrivalTime).format("HH:mm").toString();

    const payload = {
      date_of_arrival: dt_arrival,
      date_of_departure: this.state.departureDate,
      no_of_people: this.state.noOfPpl,
      reservation_comments: this.state.comments,
      reservation_type_id: this.state.reservationTypeId,
      sanskara_id: this.state.sanskaraId,
      advance_reminder_on: (this.state.advanceReminderOn == '')? '' : this.getFormattedDate(this.state.advanceReminderOn).toString()
    };

    fetch(API_URL + "reservations/" + this.state.reservationId, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(function(response) {
          return response.json()
    })
    .then(
        (result) => {        
        }
    );
  }


  getFormattedDate(dt) {
    var date = new Date(dt);
    var month = date.getMonth() + 1;
    var day = date. getDate();
    var year = date.getFullYear();
    return year + "-" + month + "-" + day ;
}


  validationCheck() {

    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

   _validateData(data) {
    return  {
      receivedOnVal: (data.receivedOn != ''),
      amountVal: (data.amount != ''),
      receiptVal: (data.receipt != '')

      
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      receivedOnValMsg: val.receivedOnVal ? '' : 'Received On Date is required',
      amountValMsg: val.amountVal ? '' : 'Amount is required',
      receiptValMsg: val.receiptVal ? '' : 'Receipt No. is required'
    }
    return errMsgs;
  }

  _grabUserInput() {

    var selectedTR = document.getElementsByClassName("active")[0];
    var selectedDate = selectedTR.getElementsByTagName("input")[0].value;
    var selectedAmt = selectedTR.getElementsByTagName("input")[1].value;
    var selectedReceipt = selectedTR.getElementsByTagName("input")[2].value;
    
    return {
      receivedOn: selectedDate,
      amount: selectedAmt,
      receipt: selectedReceipt
    };
  }

  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    // /* First Name */
    // if (typeof this.state.eFirstNameVal == 'undefined' || this.state.eFirstNameVal) {
    //   notValidClasses.eFirstNameCls = 'no-error col-md-8';
    // }
    // else {
    //    notValidClasses.eFirstNameCls = 'has-error col-md-8';
    //    notValidClasses.eFirstNameValGrpCls = 'val-err-tooltip';
    // }

    // /* Last Name */    
    // if (typeof this.state.eLastNameVal == 'undefined' || this.state.eLastNameVal) {
    //   notValidClasses.eLastNameCls = 'no-error col-md-8';
    // }
    // else {
    //    notValidClasses.eLastNameCls = 'has-error col-md-8';
    //    notValidClasses.eLastNameValGrpCls = 'val-err-tooltip';
    // }

    // /* Phone */    
    // if (typeof this.state.ePhoneVal == 'undefined' || this.state.ePhoneVal) {
    //   notValidClasses.ePhoneCls = 'no-error col-md-8';
    // }
    // else {
    //     notValidClasses.ePhoneCls = 'has-error col-md-8';
    //     notValidClasses.ePhoneValGrpCls = 'val-err-tooltip';
    // }

    if (this.state.items.length > 0){
      return (
        <div></div>
      )
    }
    else {
          return (
            <div className="step step3">
              <div className="row">
                <form id="Form" className="form-horizontal">          
                      <h4>Advance Donations</h4>        
                  <table>
                    <tbody>
                          <AdvanceDonationsInput></AdvanceDonationsInput>
                    </tbody>
                    </table>
                </form>
              </div>
            </div>
          )
      }
  }
}

export default AdvanceDonations;
