import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export class AdvanceDonations extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   date1: props.getStore().date1
    // };

    this.state = {
      aDonations: [
        {}
      ]
    }; 

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);

    this.handleDate1Change = this.handleDate1Change.bind(this);
  }

  componentDidMount() {
    this.refs.tr2.style.visibility = "hidden";
    this.refs.tr3.style.visibility = "hidden";
    this.refs.tr4.style.visibility = "hidden";
   //this.fetchAdvanceDonationsIfExists();
  }

  fetchAdvanceDonationsIfExists(){
    if(this.props.getStore().reservationId != '')
    {
      fetch("http://localhost:3000/api/advance/" + this.props.getStore().reservationId)
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
    alert("inside isValidated");
    // const userInput = this._grabUserInput(); // grab user entered vals
    // const validateNewInput = this._validateData(userInput); // run the new input against the validator
    // let isDataValid = false;

    // // if full validation passes then save to store and pass as valid
    // if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
    //     if (
    //       this.props.getStore().eFirstName != userInput.eFirstName 
    //     || this.props.getStore().eLastName != userInput.eLastName
    //     || this.props.getStore().ePhone != userInput.ePhone
    //     || this.props.getStore().eRelationship != userInput.eRelationship
    //     ) { // only update store of something changed
    //       this.props.updateStore({
    //         ...userInput,
    //         savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
    //       });  // Update store here (this is just an example, in reality you will do it via redux or flux)
    //     }
        
        // if (this.state.aDonations != ''){
        //   this.updateAdvanceDonationDetails();
        // }
        // else {
            this.insertAdvanceDonationDetails();
        // }
        isDataValid = true;
    // }
    // else {
    //     // if anything fails then update the UI validation state but NOT the UI Data State
    //     this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    // }

    return isDataValid;
  }

  insertAdvanceDonationDetails(){

    alert(this.props.getStore().reservationId + " rID");
    alert(this.props.getStore().guestId + " gID");
    alert(this.state.aDonations[0].advanceReceivedOn + "  date");
    alert(this.state.aDonations[0].advanceAmount + " amt");
    alert(this.state.aDonations[0].advanceReceiptNo + " receipt");
    const payload = {
      reservation_id: this.props.getStore().reservationId,
      guest_id: this.props.getStore().guestId,
      received_on: this.state.aDonations[0].advanceReceivedOn,
      amount: this.state.aDonations[0].advanceAmount,
      receipt_no: this.state.aDonations[0].advanceReceiptNo,
      is_advance: 1
    };


    fetch("http://localhost:3000/api/advance/", {
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

   handleDate1Change(date) {
     //alert(this.state.date1 + " state");
     alert(this.props.getStore().aDonations + " props");
     const items = this.state.aDonations;
     items[0].advanceReceivedOn = date;
    this.setState({
      aDonations: items
      // date1: date
    });
    this.refs.date1.selected = date;
  }

  handleDate2Change(date) {
    // this.setState({
    //   advanceDonations: date
    // });
    this.refs.date2.selected = date;
  }

  handleDate3Change(date) {
    // this.setState({
    //   advanceDonations: date
    // });
    this.refs.date3.selected = date;
  }

  handleDate4Change(date) {
    // this.setState({
    //   advanceDonations: date
    // });
    this.refs.date4.selected = date;
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

    fetch("http://localhost:3000/api/reservations/" + this.state.reservationId, {
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
      //arrivalTimeVal: (data.arrivalTime != ''),
      arrivalTimeVal: (data.arrivalTime == null || data.arrivalTime == undefined)? false: true,
      reservationTypeVal: (data.reservationTypeId != 0), // required: anything besides N/A
      noOfPplVal: (data.noOfPpl != ''),
      commentsVal: (true),
      advanceReminderOnVal: (true),
      //sanskaraVal: (true)    
      sanskaraVal: (data.reservationTypeId == 3 && data.sanskaraId == 0)? false : true

      
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      arrivalTimeValMsg: val.arrivalTimeVal ? '' : 'Arrival Time is required',
      reservationTypeValMsg: val.reservationTypeVal ? '' : 'Reservation Type is required',
      noOfPplValMsg: val.noOfPplVal ? '' : 'Total no. of people is required',
      commentsValMsg: '',
      advanceReminderOnValMsg: '',
      //sanskaraValMsg: '',
      sanskaraValMsg: val.sanskaraVal ? '' : 'Sanskara Type is required'
    }
    return errMsgs;
  }

  _grabUserInput() {
    
    return {
      advanceReceivedOn: this.refs.date1.selected,
      amount: this.refs.amount1.value,
      receipt_no: this.refs.receipt1.value
    };
  }

  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    /* First Name */
    if (typeof this.state.eFirstNameVal == 'undefined' || this.state.eFirstNameVal) {
      notValidClasses.eFirstNameCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.eFirstNameCls = 'has-error col-md-8';
       notValidClasses.eFirstNameValGrpCls = 'val-err-tooltip';
    }

    /* Last Name */    
    if (typeof this.state.eLastNameVal == 'undefined' || this.state.eLastNameVal) {
      notValidClasses.eLastNameCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.eLastNameCls = 'has-error col-md-8';
       notValidClasses.eLastNameValGrpCls = 'val-err-tooltip';
    }

    /* Phone */    
    if (typeof this.state.ePhoneVal == 'undefined' || this.state.ePhoneVal) {
      notValidClasses.ePhoneCls = 'no-error col-md-8';
    }
    else {
        notValidClasses.ePhoneCls = 'has-error col-md-8';
        notValidClasses.ePhoneValGrpCls = 'val-err-tooltip';
    }

    return (
      <div className="step step3">
        <div className="row">
          <form id="Form" className="form-horizontal">          
                <h3>Advance Donations</h3>        
            <table>
              <tr ref="tr1">
                <td>
                   {/* Date 1*/}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Date:*
                          </label>
                          <div className={notValidClasses.date1Cls}>
                          <DatePicker ref="date1"
                              dateFormat="YYYY-MM-DD"
                              selected={this.state.aDonations[0].advanceReceivedOn}                             
                              onChange={this.handleDate1Change} 
                              onBlur={this.validationCheck}
                              className="form-control"/>
                            <div className={notValidClasses.date1ValGrpCls}>{this.state.date1ValMsg}</div>
                            </div>
                      </div>
                </td>
                <td>
                   {/* Amount 1*/}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Amount:*
                      </label>
                      <div className={notValidClasses.amount1Cls}>
                        <input
                          ref="amount1"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />                      
                        <div className={notValidClasses.amount1ValGrpCls}>{this.state.amount1ValMsg}</div>
                        </div>
                      </div>
                  </td>
                <td>
                    {/* Receipt No 1*/}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Receipt No:*
                      </label>
                      <div className={notValidClasses.receipt1Cls}>
                        <input
                          ref="receipt1"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />
                        <div className={notValidClasses.receipt1ValGrpCls}>{this.state.receipt1ValMsg}</div>
                      </div>
                    </div>
                  </td>
              </tr>
              <tr ref="tr2">
                <td>
                   {/* Date 2 */}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Date:*
                          </label>
                          <div className={notValidClasses.date2Cls}>
                          <DatePicker ref="date2"
                              dateFormat="YYYY-MM-DD"
                              selected={this.state.date2}
                              onChange={this.handleDate2Change} 
                              onBlur={this.validationCheck}
                              className="form-control"/>
                            <div className={notValidClasses.date2ValGrpCls}>{this.state.date2ValMsg}</div>
                            </div>
                      </div>
                </td>
                <td>
                   {/* Amount 2 */}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Amount:*
                      </label>
                      <div className={notValidClasses.amount2Cls}>
                        <input
                          ref="amount2"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />                      
                        <div className={notValidClasses.amount2ValGrpCls}>{this.state.amount2ValMsg}</div>
                        </div>
                      </div>
                  </td>
                <td>
                    {/* Receipt No 2 */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Receipt No:*
                      </label>
                      <div className={notValidClasses.receipt2Cls}>
                        <input
                          ref="receipt2"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />
                        <div className={notValidClasses.receipt2ValGrpCls}>{this.state.receipt2ValMsg}</div>
                      </div>
                    </div>
                  </td>
              </tr>
              <tr ref="tr3">
                <td>
                   {/* Date 3 */}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Date:*
                          </label>
                          <div className={notValidClasses.date1Cls}>
                          <DatePicker ref="date3"
                              dateFormat="YYYY-MM-DD"
                              selected={this.state.date3}
                              onChange={this.handleDate3Change} 
                              onBlur={this.validationCheck}
                              className="form-control"/>
                            <div className={notValidClasses.date3ValGrpCls}>{this.state.date3ValMsg}</div>
                            </div>
                      </div>
                </td>
                <td>
                   {/* Amount 3 */}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Amount:*
                      </label>
                      <div className={notValidClasses.amount3Cls}>
                        <input
                          ref="amount3"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />                      
                        <div className={notValidClasses.amount3ValGrpCls}>{this.state.amount3ValMsg}</div>
                        </div>
                      </div>
                  </td>
                <td>
                    {/* Receipt No 3 */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Receipt No:*
                      </label>
                      <div className={notValidClasses.receipt3Cls}>
                        <input
                          ref="receipt3"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />
                        <div className={notValidClasses.receipt3ValGrpCls}>{this.state.receipt3ValMsg}</div>
                      </div>
                    </div>
                  </td>
              </tr>
              <tr ref="tr4">
                <td>
                   {/* Date 4 */}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Date:*
                          </label>
                          <div className={notValidClasses.date4Cls}>
                          <DatePicker ref="date4"
                              dateFormat="YYYY-MM-DD"
                              selected={this.state.date4}
                              onChange={this.handleDate4Change} 
                              onBlur={this.validationCheck}
                              className="form-control"/>
                            <div className={notValidClasses.date4ValGrpCls}>{this.state.date4ValMsg}</div>
                            </div>
                      </div>
                </td>
                <td>
                   {/* Amount 4 */}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Amount:*
                      </label>
                      <div className={notValidClasses.amount4Cls}>
                        <input
                          ref="amount4"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />                      
                        <div className={notValidClasses.amount4ValGrpCls}>{this.state.amount4ValMsg}</div>
                        </div>
                      </div>
                  </td>
                <td>
                    {/* Receipt No 4 */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Receipt No:*
                      </label>
                      <div className={notValidClasses.receipt4Cls}>
                        <input
                          ref="receipt4"
                          autoComplete="off"
                          className="form-control"
                          required
                          onBlur={this.validationCheck} />
                        <div className={notValidClasses.receipt4ValGrpCls}>{this.state.receipt4ValMsg}</div>
                      </div>
                    </div>
                  </td>
              </tr>
              </table>
          </form>
        </div>
      </div>
    )
  }
}

export default AdvanceDonations;
